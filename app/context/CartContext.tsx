'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  restaurantId: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: any, restaurantId: number) => void;
  cartTotal: number;
  cartCount: number;
  notification: string | null; // <--- NEW: Stores the pop-up message
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null); // <--- NEW

  const addToCart = (product: any, restaurantId: number) => {
    // 1. Logic to add item
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, restaurantId }];
    });

    // 2. NEW: Trigger the notification
    setNotification(`Added ${product.name} to order!`);
    
    // 3. NEW: Hide it after 2 seconds
    setTimeout(() => setNotification(null), 2000);
  };

  const cartTotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, cartTotal, cartCount, notification }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}