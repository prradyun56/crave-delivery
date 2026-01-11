import { db } from '../../../db'; // Go back to Root -> db
import { restaurants } from '../../../db/schema';
import { createRestaurant } from '../../actions'; // Go back to app -> actions
import Link from 'next/link';

export default async function Dashboard() {
  const allRestaurants = await db.select().from(restaurants);

  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header with Navigation Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">
            Menu Manager
          </h1>
          
          <div className="flex items-center gap-3">
            <Link href="/" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition">
              ↗ Go to App
            </Link>
            
            <Link href="/dashboard/orders" className="bg-black text-white px-5 py-2 rounded-lg font-bold hover:bg-gray-800 transition">
              Go to Kitchen (KDS) →
            </Link>
          </div>
        </div>

        {/* List of Existing Restaurants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {allRestaurants.map((res) => (
            <Link key={res.id} href={`/dashboard/${res.id}`}>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer flex items-center gap-4">
                <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                   🏠
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{res.name}</h3>
                  <p className="text-sm text-gray-500">{res.category || 'No Category'}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Form to Create a New Restaurant */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Restaurant</h2>
          
          <form action={createRestaurant} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                name="name" 
                placeholder="e.g. Burger King" 
                required 
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-teal-brand outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input 
                name="address" 
                placeholder="e.g. 123 Food Street" 
                required 
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-teal-brand outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input 
                name="imageUrl" 
                placeholder="https://..." 
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-teal-brand outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                name="category" 
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-teal-brand outline-none transition bg-white"
              >
                <option value="Fast Food">Fast Food</option>
                <option value="Healthy">Healthy</option>
                <option value="Asian">Asian</option>
                <option value="Italian">Italian</option>
                <option value="Comfort Food">Comfort Food</option>
              </select>
            </div>

            <button className="w-full bg-teal-brand text-white font-bold py-4 rounded-xl mt-4 hover:bg-teal-dark transition">
              Create Restaurant
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}