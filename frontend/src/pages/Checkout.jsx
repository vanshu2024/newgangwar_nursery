import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BsArrowLeft, BsCurrencyRupee, BsCart3 } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import API from '../api/axios';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      const { data } = await API.post('/orders', {
        items: cart.map((item) => ({
          plantId: item.plantId,
          nameHindi: item.nameHindi,
          nameEnglish: item.nameEnglish,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        ...form,
        totalAmount: cartTotal,
      });

      clearCart();
      navigate('/order-confirmation', { state: { order: data } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-center">
        <div className="text-center glass-card p-12 max-w-md mx-4">
          <BsCart3 className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Add some plants before checkout!</p>
          <Link to="/plants" className="btn-primary inline-flex items-center gap-2">
            Browse Plants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/cart" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 text-sm mb-2 transition-colors">
              <BsArrowLeft /> Back to Cart
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Fill in your details to place the order</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
              <h2 className="text-lg font-semibold">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                  <input type="text" name="customerName" value={form.customerName} onChange={handleChange} required className="input-field" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="input-field" placeholder="Phone number" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Address *</label>
                <textarea name="address" value={form.address} onChange={handleChange} required rows={3} className="input-field resize-none" placeholder="Full address with area, city, pincode" />
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                We will contact you on WhatsApp/Phone to confirm your order and arrange delivery.
              </p>

              <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 disabled:opacity-50">
                {loading ? 'Placing Order...' : `Place Order - ₹${cartTotal.toLocaleString('en-IN')}`}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="glass-card p-6 space-y-4">
              <h2 className="font-semibold">Order Summary ({cartCount} items)</h2>
              <div className="space-y-3 divide-y divide-gray-100 dark:divide-gray-800">
                {cart.map((item) => (
                  <div key={item.plantId} className="flex items-center gap-3 pt-3 first:pt-0">
                    <img src={item.image} alt={item.nameEnglish} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.nameHindi}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                    </div>
                    <p className="text-sm font-semibold">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg text-primary-600">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
