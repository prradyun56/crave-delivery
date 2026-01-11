'use client';

import { useEffect, useState } from 'react';

export default function StatusOrb({ status }: { status: string }) {
  // Simple logic to change color/text based on status
  const getStatusInfo = () => {
    switch (status) {
      case 'preparing':
        return { color: 'bg-orange-400', text: 'Kitchen is cooking...', pulse: 'animate-pulse' };
      case 'ready':
        return { color: 'bg-teal-brand', text: 'Rider is picking up...', pulse: 'animate-bounce' };
      case 'delivered':
        return { color: 'bg-green-500', text: 'Enjoy your meal!', pulse: '' };
      default:
        return { color: 'bg-gray-400', text: 'Unknown Status', pulse: '' };
    }
  };

  const info = getStatusInfo();

  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* The Glowing Orb */}
      <div className="relative">
        <div className={`w-64 h-64 rounded-full blur-3xl opacity-20 absolute top-0 left-0 ${info.color} ${info.pulse}`}></div>
        <div className={`relative w-48 h-48 rounded-full shadow-2xl flex items-center justify-center border-4 border-white ${info.color} ${info.pulse}`}>
          <span className="text-6xl">👨‍🍳</span>
        </div>
      </div>

      {/* The Status Text */}
      <h2 className="mt-12 text-3xl font-black text-gray-800 tracking-tight text-center">
        {info.text}
      </h2>
      <p className="text-gray-500 mt-2">Your personal food companion is tracking this order.</p>
    </div>
  );
}