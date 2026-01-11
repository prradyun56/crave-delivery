import { db } from '../../../../db';
import { restaurants, menuItems } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import { createMenuItem, updateRestaurant, deleteRestaurant } from '../../../actions';
import Link from 'next/link';

export default async function RestaurantDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const restaurantId = parseInt(id);

  // 1. Fetch Restaurant & Menu
  const restaurant = await db.query.restaurants.findFirst({
    where: eq(restaurants.id, restaurantId),
  });

  const menu = await db.select().from(menuItems).where(eq(menuItems.restaurantId, restaurantId));

  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. HERO SECTION (Glass Effect) */}
      <div className="relative h-64 w-full bg-gray-900 overflow-hidden">
        {restaurant.imageUrl ? (
          <img src={restaurant.imageUrl} className="w-full h-full object-cover opacity-60" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-teal-800 to-black" />
        )}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
           <Link href="/dashboard" className="text-white/60 hover:text-white mb-4 text-sm font-bold tracking-wide uppercase">
             ← Back to Dashboard
           </Link>
           <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{restaurant.name}</h1>
           <span className="text-white/80 font-medium mt-2 text-lg">{restaurant.category}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN: Menu Management (Main Focus) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Add Item Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Add Menu Item</h3>
            <form action={createMenuItem} className="flex flex-col gap-4">
              <input type="hidden" name="restaurantId" value={restaurant.id} />
              
              <div className="grid grid-cols-2 gap-4">
                <input name="name" placeholder="Item Name (e.g. Big Mac)" required className="bg-gray-50 border-0 rounded-xl p-4 font-medium focus:ring-2 focus:ring-black outline-none transition" />
                <input name="price" placeholder="Price (e.g. 12.99)" required className="bg-gray-50 border-0 rounded-xl p-4 font-medium focus:ring-2 focus:ring-black outline-none transition" />
              </div>
              <textarea name="description" placeholder="Description (e.g. Double patty with cheese)" className="bg-gray-50 border-0 rounded-xl p-4 font-medium focus:ring-2 focus:ring-black outline-none transition h-24" />
              
              <button className="bg-black text-white font-bold py-4 rounded-xl hover:scale-[1.01] transition">
                + Add to Menu
              </button>
            </form>
          </div>

          {/* Menu List */}
          <div className="space-y-4">
             {menu.map((item) => (
               <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center group hover:shadow-md transition">
                 <div>
                   <h4 className="font-bold text-lg text-gray-900">{item.name}</h4>
                   <p className="text-gray-500 text-sm">{item.description}</p>
                 </div>
                 <div className="font-black text-xl text-teal-brand">₹{item.price}</div>
               </div>
             ))}
             {menu.length === 0 && (
               <div className="text-center py-10 text-gray-400">No items on the menu yet.</div>
             )}
          </div>

        </div>


        {/* RIGHT COLUMN: Settings & Danger Zone */}
        <div className="space-y-6">
          
          {/* EDIT FORM */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Edit Details</h3>
            
            <form action={updateRestaurant} className="space-y-3">
              <input type="hidden" name="id" value={restaurant.id} />
              
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Name</label>
                <input name="name" defaultValue={restaurant.name} className="w-full bg-gray-50 rounded-lg p-2 text-sm font-medium border border-gray-100 focus:border-black outline-none" />
              </div>
              
              <div>
                 <label className="text-xs font-bold text-gray-400 uppercase">Image URL</label>
                 <input name="imageUrl" defaultValue={restaurant.imageUrl || ''} className="w-full bg-gray-50 rounded-lg p-2 text-sm font-medium border border-gray-100 focus:border-black outline-none" />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
                <select name="category" defaultValue={restaurant.category || ''} className="w-full bg-gray-50 rounded-lg p-2 text-sm font-medium border border-gray-100 focus:border-black outline-none">
                  <option value="Fast Food">Fast Food</option>
                  <option value="Healthy">Healthy</option>
                  <option value="Asian">Asian</option>
                  <option value="Italian">Italian</option>
                  <option value="Comfort Food">Comfort Food</option>
                </select>
              </div>

              <button className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg text-sm hover:bg-black transition mt-2">
                Save Changes
              </button>
            </form>
          </div>

          {/* DANGER ZONE */}
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
            <h3 className="font-bold text-red-900 mb-2">Danger Zone</h3>
            <p className="text-xs text-red-700 mb-4">Deleting this restaurant will remove it and all its menu items permanently.</p>
            
            <form action={deleteRestaurant}>
              <input type="hidden" name="id" value={restaurant.id} />
              <button className="w-full bg-white border border-red-200 text-red-600 font-bold py-3 rounded-lg text-sm hover:bg-red-600 hover:text-white transition">
                Delete Restaurant
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}