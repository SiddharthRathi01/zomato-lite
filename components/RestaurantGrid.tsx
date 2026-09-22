import React from 'react';
import { Restaurant } from '@/lib/types';
import { RestaurantCard } from './RestaurantCard';

interface RestaurantGridProps {
  restaurants: Restaurant[];
}

export const RestaurantGrid: React.FC<RestaurantGridProps> = ({ restaurants }) => {
  return (
    <div
      id="restaurant-grid"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
        />
      ))}
    </div>
  );
};
