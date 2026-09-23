'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Restaurant } from '@/lib/types';
import { RestaurantCard } from './RestaurantCard';

interface RestaurantGridProps {
  restaurants?: Restaurant[];
  initialRestaurants?: Restaurant[];
}

export const RestaurantGrid: React.FC<RestaurantGridProps> = ({
  restaurants: propRestaurants,
  initialRestaurants,
}) => {
  const initial = initialRestaurants || propRestaurants || [];
  const [restaurants, setRestaurants] = useState<Restaurant[]>(initial);

  useEffect(() => {
    if (initialRestaurants || propRestaurants) {
      setRestaurants(initialRestaurants || propRestaurants || []);
    }
  }, [initialRestaurants, propRestaurants]);

  const refreshMetrics = useCallback(async () => {
    try {
      const updated = await Promise.all(
        initial.map(async (restaurant) => {
          try {
            const res = await fetch(`/api/restaurants/${restaurant.id}`, {
              cache: 'no-store',
            });
            if (res.ok) {
              const data = await res.json();
              return {
                ...restaurant,
                rating: data.averageRating ?? restaurant.rating,
                reviewCount: data.totalReviews ?? restaurant.reviewCount,
              };
            }
          } catch {
            // Keep existing on failure
          }
          return restaurant;
        })
      );
      setRestaurants(updated);
    } catch {
      // Ignore
    }
  }, [initial]);

  useEffect(() => {
    refreshMetrics();

    const handleEvent = () => {
      refreshMetrics();
    };

    window.addEventListener('review-submitted', handleEvent);
    window.addEventListener('focus', handleEvent);
    window.addEventListener('popstate', handleEvent);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        refreshMetrics();
      }
    });

    return () => {
      window.removeEventListener('review-submitted', handleEvent);
      window.removeEventListener('focus', handleEvent);
      window.removeEventListener('popstate', handleEvent);
    };
  }, [refreshMetrics]);

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

