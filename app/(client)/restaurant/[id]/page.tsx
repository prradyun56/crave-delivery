import { db } from '../../../../db';
import { restaurants, menuItems } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
// This import is the key! It brings in the button.
import AddToCartBtn from '../../../components/AddToCartBtn';

export default async function ClientRestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const restaurantId = parseInt(id);

  const restaurant = await db.query.restaurants.findFirst({
    where: eq(restaurants.id, restaurantId),
  });
  
  const items = await db.select().from(menuItems).where(eq(menuItems.restaurantId, restaurantId));

  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* 1. Restaurant Header */}
      <div className="relative h-64 md:h-80 w-full bg-gray-200">
        {restaurant.imageUrl ? (
          <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-teal-brand text-white text-4xl font-bold opacity-50">
            {restaurant.name}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white max-w-7xl mx-auto w-full">
          <Link href="/" className="text-white/80 hover:text-white mb-4 block text-sm font-bold">← Back to Home</Link>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-2">{restaurant.name}</h1>
          <p className="text-lg opacity-90">{restaurant.address} • 20-30 min</p>
        </div>
      </div>

      {/* 2. Menu Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition flex justify-between group">
              <div className="flex-1 pr-4">
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-teal-brand transition">{item.name}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                <div className="mt-3 font-medium text-gray-700">₹{item.price}</div>
              </div>
              
              {/* THIS IS THE BUTTON COMPONENT: */}
              <AddToCartBtn item={item} restaurantId={restaurantId} />
              
            </div>
          ))}

          {items.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed">
              The menu is empty! Go to your Dashboard to add items.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}