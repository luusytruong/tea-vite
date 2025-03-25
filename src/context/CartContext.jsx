import React, { createContext, useState, useContext, useMemo } from "react";
import { products } from "~/data/products"; // Import danh sách sản phẩm mẫu

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    products.map((product) => ({ ...product, quantity: 1 }))
  );

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity, 10) } : item
      )
    );
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