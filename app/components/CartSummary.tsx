'use client';

import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CartSummary() {
  const { items, cartTotal } = useCart();

  if (items.length === 0) return null;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed bottom-8 left-0 w-full flex justify-center z-[100] px-4 pointer-events-none">
      <div className="bg-black/90 backdrop-blur-xl text-white py-3 px-4 rounded-[2rem] shadow-2xl flex items-center gap-6 pointer-events-auto transform hover:scale-105 transition-all duration-300 max-w-sm w-full border border-white/10">
        
        {/* Icon Circle */}
        <div className="bg-white/20 h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm">
          {totalItems}
        </div>

        <div className="flex-1 flex flex-col">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total</span>
          <span className="font-semibold text-lg leading-none">₹{cartTotal.toFixed(2)}</span>
        </div>

        <Link href="/checkout">
          <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition">
            View
          </button>
        </Link>

      </div>
    </div>
  );
}