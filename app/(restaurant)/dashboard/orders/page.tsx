export const dynamic = 'force-dynamic';

import { db } from '../../../../db';
import { orders, orderItems, menuItems } from '../../../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { updateOrderStatus } from '../../../actions';
import Link from 'next/link';
import StatusPoller from '../../../components/StatusPoller'; 

export default async function KitchenDashboard() {
  const allOrders = await db.select().from(orders).orderBy(desc(orders.id));

  const ordersWithItems = await Promise.all(allOrders.map(async (order) => {
    const items = await db.select({
      name: menuItems.name,
      quantity: orderItems.quantity
    })
    .from(orderItems)
    .innerJoin(menuItems, eq(orderItems.menuItemId, menuItems.id))
    .where(eq(orderItems.orderId, order.id));
    
    return { ...order, items };
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      <StatusPoller />

      <div className="max-w-5xl mx-auto">
        
        {/* NEW HEADER with Navigation Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-black text-gray-800">Kitchen Display System (KDS)</h1>
          
          <div className="flex items-center gap-4">
            <Link href="/" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition">
              ↗ Go to App
            </Link>
            
            <Link href="/dashboard" className="px-4 py-2 bg-teal-brand text-white rounded-lg text-sm font-bold hover:bg-teal-dark transition">
              Manage Menu
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ordersWithItems.map((order) => (
            <div key={order.id} className={`bg-white rounded-xl shadow-sm border-l-8 p-6 ${
              order.status === 'delivered' ? 'border-green-500 opacity-60' : 
              order.status === 'ready' ? 'border-teal-brand' : 'border-orange-400'
            }`}>
              
              <div className="flex justify-between items-start mb-4">
                <span className="font-bold text-2xl text-gray-800">#{order.id}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                   order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                   order.status === 'ready' ? 'bg-teal-50 text-teal-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-2 mb-6 min-h-[100px]">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-2 text-gray-700 font-medium">
                    <span className="text-gray-900 font-bold">{item.quantity}x</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {/* STATUS BUTTONS */}
                {order.status === 'preparing' && (
                  <form action={async () => {
                    'use server';
                    await updateOrderStatus(order.id, 'ready');
                  }}>
                    <button className="w-full bg-teal-brand text-white font-bold py-2 rounded-lg hover:bg-teal-dark transition">
                      Mark Ready for Pickup
                    </button>
                  </form>
                )}

                {order.status === 'ready' && (
                  <form action={async () => {
                    'use server';
                    await updateOrderStatus(order.id, 'delivered');
                  }}>
                    <button className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition">
                      Complete Delivery
                    </button>
                  </form>
                )}

                <div className="text-xs text-gray-400 text-center mt-2">
                  {new Date(order.createdAt).toLocaleTimeString()} • ₹{order.totalAmount}
                </div>
              </div>

            </div>
          ))}
        </div>

        {ordersWithItems.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No orders yet. Time to get cooking!
          </div>
        )}

      </div>
    </div>
  );
}

// FORCE UPDATE VERCEL PLEASE