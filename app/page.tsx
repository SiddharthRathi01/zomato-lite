import React from 'react';
import { RESTAURANTS } from '@/lib/data';
import { getRestaurantDetails } from '@/lib/db';
import { RestaurantGrid } from '@/components/RestaurantGrid';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const dynamicRestaurants = await Promise.all(
    RESTAURANTS.map(async (r) => {
      try {
        const details = await getRestaurantDetails(r.id);
        if (details) {
          return {
            ...r,
            rating: details.averageRating ?? r.rating,
            reviewCount: details.totalReviews,
          };
        }
      } catch (err) {
        console.error(`Failed to fetch db metrics for restaurant ${r.id}:`, err);
      }
      return r;
    })
  );

  return (
    <section id="home-view">
      {/* Main Header / Editorial Intro */}
      <div className="mb-10 sm:mb-12">
        <h1
          id="discover-heading"
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight"
        >
          Discover places to eat
        </h1>
        <p
          id="discover-subtitle"
          className="text-base sm:text-lg text-stone-600 mt-2 font-normal max-w-xl"
        >
          Good food. Great places. Honest reviews.
        </p>
      </div>

      {/* Restaurant Grid: 3 columns desktop, 2 tablet, 1 mobile */}
      <RestaurantGrid initialRestaurants={dynamicRestaurants} />
    </section>
  );
}

