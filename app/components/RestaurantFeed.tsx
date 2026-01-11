'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RestaurantFeed({ restaurants }: { restaurants: any[] }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Fast Food', 'Healthy', 'Asian', 'Italian', 'Comfort Food'];

  const filtered = restaurants.filter((res) => {
    const matchesSearch = res.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* 1. Minimal Search & Filters */}
      <div className="flex flex-col md:flex-row gap-6 mb-16 items-center justify-between">
        
        {/* Search Input: Gray background, no border */}
        <div className="relative w-full md:w-96 group">
          <input 
            type="text" 
            placeholder="Search restaurants..." 
            className="w-full bg-gray-100/50 p-4 pl-12 rounded-2xl text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition">🔍</span>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-black text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {filtered.map((res) => (
          <Link key={res.id} href={`/restaurant/${res.id}`} className="group block">
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative">
              
              {/* Image Area */}
              <div className="h-64 bg-gray-100 relative overflow-hidden">
                {res.imageUrl ? (
                  <img src={res.imageUrl} alt={res.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300 font-bold text-3xl">
                    {res.name[0]}
                  </div>
                )}
                
                {/* Floating Category Badge (Glass) */}
                {res.category && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-black shadow-sm">
                    {res.category}
                  </div>
                )}
              </div>
              
              {/* Content Area */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-semibold text-black tracking-tight group-hover:text-gray-700 transition">{res.name}</h3>
                  <div className="bg-gray-50 px-2 py-1 rounded-lg text-xs font-bold text-gray-500">4.8 ★</div>
                </div>
                <p className="text-gray-400 text-sm font-medium">{res.address}</p>
                
                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <span>25 min</span>
                  <span>Free Delivery</span>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}