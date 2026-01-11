import { db } from '../../db';
import { restaurants } from '../../db/schema';
import RestaurantFeed from '../components/RestaurantFeed';

export default async function ClientHome() {
  const allRestaurants = await db.select().from(restaurants);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24">
      
      {/* HERO: Massive Typography */}
      <div className="text-center mb-20 space-y-6">
        <h1 className="text-5xl md:text-7xl font-semibold text-black tracking-tight leading-tight">
          Dining, <span className="text-gray-400">elevated.</span>
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Your favorite restaurants, delivered with the precision and care you deserve.
        </p>
      </div>

      {/* The Feed */}
      <RestaurantFeed restaurants={allRestaurants} />
      
    </div>
  );
}