import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Edit3 } from 'lucide-react';
import { Restaurant } from '@/lib/types';
import { RestaurantImage } from './RestaurantImage';

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

export const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ restaurant }) => {
  return (
    <div id="restaurant-info" className="mb-8">
      {/* Back button */}
      <Link
        id="back-to-restaurants-btn"
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-[#E23744] transition-colors mb-5 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E23744] rounded-md px-1 py-0.5"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to restaurants</span>
      </Link>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
        {/* Restaurant image (kept compact and uncropped) */}
        <div className="relative w-full border-b border-stone-200/80">
          <RestaurantImage
            src={restaurant.image}
            alt={restaurant.name}
            autoHeight
          />
        </div>

        {/* Restaurant Information Section */}
        <div className="p-5 sm:p-7">
          {/* Restaurant Name - strongest text element */}
          <h1
            id="restaurant-detail-name"
            className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-tight"
          >
            {restaurant.name}
          </h1>

          {/* Cuisine / Dining Type */}
          <p className="text-sm font-medium text-stone-600 mt-1.5">
            {restaurant.cuisine} <span className="text-stone-300 mx-1.5">·</span> {restaurant.diningType}
          </p>

          {/* Location / Address */}
          <p className="text-xs sm:text-sm text-stone-500 mt-1.5 flex items-start gap-1.5">
            <MapPin size={15} className="text-[#E23744] shrink-0 mt-0.5" />
            <span className="leading-relaxed">{restaurant.address}</span>
          </p>

          {/* Rating Section & Write a Review CTA */}
          <div
            id="restaurant-rating-section"
            className="mt-5 pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
          >
            {/* Rating row: ⭐ 4.8/5 · 42 reviews */}
            <div className="flex items-center gap-2">
              <span className="text-lg leading-none" role="img" aria-label="Rating">⭐</span>
              <span className="font-bold text-stone-900 text-base sm:text-lg">
                {restaurant.rating.toFixed(1)}/5
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs sm:text-sm text-stone-500 font-medium">
                {restaurant.reviewCount} reviews
              </span>
            </div>

            {/* Write a Review Button */}
            <Link
              id="restaurant-header-write-review-btn"
              href={`/review/${restaurant.id}`}
              className="inline-flex items-center justify-center gap-1.5 bg-[#E23744] hover:bg-[#CB202D] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-xs hover:shadow-sm transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E23744]"
            >
              <Edit3 size={15} />
              <span>Write a Review</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
