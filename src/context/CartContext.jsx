import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const itemsInLocalStorage = localStorage.getItem("cartItems");
      return itemsInLocalStorage ? JSON.parse(itemsInLocalStorage) : [];
    } catch (error) {
      console.error("Error loading cart items from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, quantityToAdd) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existingItemIndex > 0) {
        return prevItems.map((i, index) =>
          index === existingItemIndex
            ? { ...i, quantity: i.quantity + quantityToAdd }
            : i
        );
      } else {
        const newItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: quantityToAdd,
          image: item.image,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
