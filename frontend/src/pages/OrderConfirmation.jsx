import { Link, useLocation, Navigate } from 'react-router-dom';
import { BsCheckCircle, BsArrowLeft, BsCart3, BsWhatsapp, BsTelephone } from 'react-icons/bs';

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-center">
      <div className="max-w-lg mx-4 w-full">
        <div className="glass-card p-8 md:p-12 text-center">
          <div className="inline-flex p-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 mb-6">
            <BsCheckCircle className="text-5xl" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-2">Thank you for your order.</p>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            We will contact you soon at <strong>{order.phone}</strong> to confirm.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 mb-6 text-left">
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.nameEnglish} className="w-10 h-10 object-cover rounded-lg" />
                    <div>
                      <p className="text-sm font-medium">{item.nameHindi}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 flex justify-between">
              <span className="font-semibold">Total Paid</span>
              <span className="font-bold text-lg text-primary-600">₹{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Have questions? Contact us directly:
            </p>
            <div className="flex justify-center gap-3">
              <a href="https://wa.me/919452437164" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition text-sm font-medium">
                <BsWhatsapp /> WhatsApp
              </a>
              <a href="tel:9452437164" className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition text-sm font-medium">
                <BsTelephone /> Call Us
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/" className="flex-1 btn-primary flex items-center justify-center gap-2">
              <BsArrowLeft /> Back to Home
            </Link>
            <Link to="/plants" className="flex-1 btn-outline flex items-center justify-center gap-2">
              <BsCart3 /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
