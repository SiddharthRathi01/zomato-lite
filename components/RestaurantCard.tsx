import React from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin } from 'lucide-react';
import { Restaurant } from '@/lib/types';
import { RatingBadge } from './RatingBadge';
import { RestaurantImage } from './RestaurantImage';
import { RatingDisplay } from './RatingDisplay';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link
      id={`restaurant-card-${restaurant.id}`}
      href={`/restaurant/${restaurant.id}`}
      className="group bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md hover:border-stone-300 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col focus-visible:ring-2 focus-visible:ring-[#E23744] outline-none"
      aria-label={`View details for ${restaurant.name}`}
    >
      {/* Image container with rating badge overlay */}
      <div className="relative">
        <RestaurantImage
          src={restaurant.image}
          alt={`${restaurant.name} specialty`}
          aspectClassName="aspect-[16/10]"
        />
        {/* Rating Badge over image */}
        <div className="absolute bottom-3 right-3">
          <RatingBadge rating={restaurant.rating} size="md" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3
              id={`restaurant-name-${restaurant.id}`}
              className="font-serif text-xl font-bold text-stone-900 tracking-tight group-hover:text-[#E23744] transition-colors"
            >
              {restaurant.name}
            </h3>
            <ChevronRight
              size={18}
              className="text-stone-400 group-hover:text-[#E23744] group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
              aria-hidden="true"
            />
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mt-1">
            {restaurant.cuisine} <span className="text-stone-300 mx-1">·</span> {restaurant.diningType}
          </p>

          <p className="text-xs text-stone-500 mt-2 flex items-center gap-1 line-clamp-1">
            <MapPin size={13} className="text-stone-400 shrink-0" />
            <span>{restaurant.address}</span>
          </p>
        </div>

        {/* Divider and Footer */}
        <div className="mt-4 pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <RatingDisplay
              rating={restaurant.rating}
              totalReviews={restaurant.reviewCount}
              showOutOfFive={false}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
