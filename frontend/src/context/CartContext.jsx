import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (plant, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.plantId === plant._id);
      if (existing) {
        toast.info(`${plant.nameHindi} quantity updated`);
        return prev.map((item) =>
          item.plantId === plant._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      toast.success(`${plant.nameHindi} added to cart`);
      return [
        ...prev,
        {
          plantId: plant._id,
          nameHindi: plant.nameHindi,
          nameEnglish: plant.nameEnglish,
          price: plant.price,
          image: plant.image,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (plantId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(plantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.plantId === plantId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (plantId) => {
    setCart((prev) => prev.filter((item) => item.plantId !== plantId));
    toast.info('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
