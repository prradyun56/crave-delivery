'use client';

import { useCart } from '../context/CartContext';

export default function Toast() {
  const { notification } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
      <span className="text-teal-400 text-xl">✓</span>
      <span className="font-bold text-sm md:text-base">{notification}</span>
    </div>
  );
}