import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Intenta cargar el estado inicial desde localStorage o usa un arreglo vacío si no hay nada guardado
  const [cartItems, setCartItems] = useState(() => {
    try {
      const itemsInLocalStorage = localStorage.getItem('cartItems');
      return itemsInLocalStorage ? JSON.parse(itemsInLocalStorage) : [];
    } catch (error) {
      console.error("Error loading cart items from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    // Guardar cartItems en localStorage cada vez que cambie
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, quantityToAdd) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existingItemIndex > -1) {
        // Si el producto ya existe, actualizamos su cantidad
        return prevItems.map((i, index) => 
          index === existingItemIndex ? { ...i, quantity: i.quantity + quantityToAdd } : i
        );
      } else {
        // Añadir al carrito solo con id, nombre y cantidad
        const newItem = {
          id: item.id,
          name: item.product_name, 
          price: item.price,
          quantity: quantityToAdd
        };
        return [...prevItems, newItem];
      }
    });
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};