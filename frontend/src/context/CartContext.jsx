import React, { createContext, useContext, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState({
    houseNo: '',
    area: '',
    landmark: '',
    pinCode: '',
    city: 'Gurgaon',
    state: 'Haryana',
  });

  const safeToast = (message, type = 'success') => {
    try {
      if (type === 'success') toast.success(message);
      else toast.error(message);
    } catch (e) {
      console.log(message);
    }
  };

  const addToCart = useCallback((item, variant, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (i) => i.id === item.id && i.variant.size === variant.size
      );

      if (existingItem) {
        safeToast(`Updated ${item.name} quantity!`);
        return prev.map((i) =>
          i.id === item.id && i.variant.size === variant.size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }

      safeToast(`Added ${item.name} to cart!`);
      return [...prev, { ...item, variant, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((itemId, variantSize) => {
    setCartItems((prev) => prev.filter(
      (i) => !(i.id === itemId && i.variant.size === variantSize)
    ));
    safeToast('Item removed from cart');
  }, []);

  const updateQuantity = useCallback((itemId, variantSize, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId, variantSize);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === itemId && i.variant.size === variantSize
          ? { ...i, quantity }
          : i
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.variant.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const gstAmount = cartTotal * 0.05;
  const deliveryFee = cartTotal > 299 ? 0 : 40;
  const platformFee = 5;
  const grandTotal = cartTotal + gstAmount + deliveryFee + platformFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        gstAmount,
        deliveryFee,
        platformFee,
        grandTotal,
        deliveryAddress,
        setDeliveryAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
