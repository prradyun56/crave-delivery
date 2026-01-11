'use client';

import { useCart } from '../../context/CartContext';
import { placeOrder } from '../../actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, cartTotal, cartCount } = useCart();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOrder = async () => {
    if (!address) return alert('Please enter an address');
    setLoading(true);
    
    // Call the server action
    const result = await placeOrder(items, cartTotal, address);
    
    if (result.success) {
      // Redirect to the "Companion" status page
      router.push(`/order-status/${result.orderId}`);
    } else {
      alert('Something went wrong!');
      setLoading(false);
    }
  };

  if (cartCount === 0) return <div className="text-center py-20">Your cart is empty.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-teal-brand p-8 text-white text-center">
          <h1 className="text-3xl font-black tracking-tighter">Checkout</h1>
          <p className="opacity-90 mt-2">Almost time to eat.</p>
        </div>

        <div className="p-8 md:p-12 space-y-8">
          
          {/* 1. Items List */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Items</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-4">
                    <span className="bg-gray-100 text-teal-brand font-bold h-8 w-8 flex items-center justify-center rounded-full text-sm">
                      {item.quantity}x
                    </span>
                    <span className="font-medium text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Address Input */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Address</h2>
            <textarea
              placeholder="e.g. Flat 4, 123 Food Street..."
              className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-teal-brand outline-none transition bg-gray-50 h-32 resize-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* 3. Total & Button */}
          <div className="border-t border-gray-100 pt-8">
            <div className="flex justify-between items-center mb-8">
              <span className="text-gray-500 text-lg">Total to Pay</span>
              <span className="text-4xl font-black text-teal-brand">₹{cartTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full bg-black text-white py-5 rounded-xl font-bold text-xl hover:bg-gray-800 transition transform hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Confirm Order'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}