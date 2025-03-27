import React, { createContext, useState, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { setIsLoading } = useAuth();

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    setLoading(true);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity, 10) } : item
      )
    );
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const calculateTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  }, [cartItems]);

  const value = {
    cartItems,
    handleRemove,
    handleUpdateQuantity,
    handleClearCart,
    calculateTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
}; 