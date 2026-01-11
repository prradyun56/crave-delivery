// components/AddToCartBtn.tsx
'use client';

import { useCart } from '../context/CartContext'; // <--- UPDATED PATH

export default function AddToCartBtn({ item, restaurantId }: { item: any, restaurantId: number }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(item, restaurantId)}
      className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center text-teal-brand hover:bg-teal-50 text-xl font-bold pb-1 transition active:scale-90"
    >
      +
    </button>
  );
}