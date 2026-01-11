import { db } from '../../../../db';
import { orders, orderItems, menuItems } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

import StatusOrb from '../../../components/StatusOrb'; 
import StatusPoller from '../../../components/StatusPoller'; 
import MapWrapper from '../../../components/MapWrapper'; // <--- Import the wrapper!

export default async function OrderStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orderId = parseInt(id);

  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
  });

  if (!order) return <div className="p-10 text-center">Order not found</div>;

  const items = await db.select({
      name: menuItems.name,
      quantity: orderItems.quantity,
      price: menuItems.price
    })
    .from(orderItems)
    .innerJoin(menuItems, eq(orderItems.menuItemId, menuItems.id))
    .where(eq(orderItems.orderId, orderId));

  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col">
      <StatusPoller />

      {/* 1. BACKGROUND MAP (Uses the Wrapper now) */}
      <div className="absolute inset-0 z-0">
        <MapWrapper />
      </div>

      {/* 2. TOP NAV (Floating) */}
      <div className="relative z-10 p-6">
        <Link href="/" className="inline-flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-gray-800 hover:bg-white transition">
          ←
        </Link>
      </div>

      {/* 3. BOTTOM FLOATING CARD */}
      <div className="mt-auto relative z-10 w-full max-w-lg mx-auto md:mb-10 md:px-4">
        <div className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-t-3xl md:rounded-3xl overflow-hidden">
          
          {/* Status Bar */}
          <div className="p-6 pb-2 text-center">
            <div className="scale-75 -my-10">
              <StatusOrb status={order.status} />
            </div>
          </div>

          {/* Order Info Details */}
          <div className="bg-white/50 p-6 pt-0">
             <div className="flex justify-between items-center mb-4 mt-4">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Estimated Arrival</span>
                  <span className="text-2xl font-black text-gray-800">15-20 min</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order Total</span>
                  <span className="text-xl font-bold text-teal-brand">₹{order.totalAmount}</span>
                </div>
             </div>

             <div className="space-y-3 border-t border-gray-200/50 pt-4">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm text-gray-600 font-medium">
                    <span className="flex items-center gap-2">
                      <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-xs font-bold">{item.quantity}x</span> 
                      {item.name}
                    </span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
             </div>

             <div className="mt-6">
               <button className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:scale-[1.02] transition active:scale-95">
                 Call Rider
               </button>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
}