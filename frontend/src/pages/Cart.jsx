import { Link } from 'react-router-dom';
import { BsCart3, BsTrash, BsPlus, BsDash, BsArrowLeft, BsCurrencyRupee } from 'react-icons/bs';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-center">
        <div className="text-center glass-card p-12 max-w-md mx-4">
          <BsCart3 className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Browse our plants and add your favorites!</p>
          <Link to="/plants" className="btn-primary inline-flex items-center gap-2">
            Browse Plants <BsArrowLeft className="rotate-180" />
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
            <Link to="/plants" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 text-sm mb-2 transition-colors">
              <BsArrowLeft /> Continue Shopping
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{cartCount} item{cartCount !== 1 && 's'} in your cart</p>
          </div>
          <BsCart3 className="text-4xl text-primary-600" />
        </div>

        <div className="space-y-4 mb-8">
          {cart.map((item) => (
            <div key={item.plantId} className="glass-card p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img src={item.image} alt={item.nameEnglish} className="w-20 h-20 object-cover rounded-xl" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{item.nameHindi}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{item.nameEnglish}</p>
                <p className="text-primary-600 font-semibold flex items-center gap-1 mt-1">
                  <BsCurrencyRupee className="text-xs" />{item.price}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <button onClick={() => updateQuantity(item.plantId, item.quantity - 1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-600 dark:text-gray-400">
                    <BsDash />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.plantId, item.quantity + 1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-600 dark:text-gray-400">
                    <BsPlus />
                  </button>
                </div>
                <p className="font-bold text-lg min-w-[5rem] text-right">
                  <BsCurrencyRupee className="inline text-xs" />{item.price * item.quantity}
                </p>
                <button onClick={() => removeFromCart(item.plantId)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition" title="Remove">
                  <BsTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="text-2xl font-bold text-primary-600 flex items-center gap-1">
              <BsCurrencyRupee />{cartTotal.toLocaleString('en-IN')}
            </span>
          </div>
          <Link to="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4">
            Proceed to Checkout <BsArrowLeft className="rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
