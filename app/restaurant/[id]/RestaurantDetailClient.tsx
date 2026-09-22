'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Edit3, AlertCircle, Loader2 } from 'lucide-react';
import { RestaurantImage } from '@/components/RestaurantImage';
import { ReviewSection } from '@/components/ReviewSection';
import { ApiRestaurantResponse } from '@/lib/api-types';

interface RestaurantDetailClientProps {
  restaurantId: number;
  initialImage: string;
}

// Format relative date or ISO date cleanly
function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } catch {
    return dateStr;
  }
}

export const RestaurantDetailClient: React.FC<RestaurantDetailClientProps> = ({
  restaurantId,
  initialImage,
}) => {
  const [data, setData] = useState<ApiRestaurantResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchRestaurant() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/restaurants/${restaurantId}`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Restaurant not found');
          }
          throw new Error(`Failed to load restaurant (HTTP ${res.status})`);
        }
        const json: ApiRestaurantResponse = await res.json();
        if (isMounted) {
          setData(json);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchRestaurant();

    return () => {
      isMounted = false;
    };
  }, [restaurantId]);

  if (loading) {
    return (
      <div id="restaurant-detail-loading" className="max-w-[540px] mx-auto py-16 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl border border-stone-200 shadow-xs text-stone-600 gap-3">
          <Loader2 className="animate-spin text-[#E23744]" size={20} />
          <span className="text-sm font-medium">Loading restaurant details...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div id="restaurant-detail-error" className="max-w-[540px] mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-2xl border border-stone-200/90 p-8 shadow-sm flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-red-50 text-[#E23744] flex items-center justify-center mb-3">
            <AlertCircle size={24} />
          </div>
          <h2 className="font-serif text-xl font-bold text-stone-900 mb-1">
            Unable to load restaurant
          </h2>
          <p className="text-stone-500 text-sm mb-6">{error || 'Restaurant details could not be retrieved.'}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#1C1C1C] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to restaurants</span>
          </Link>
        </div>
      </div>
    );
  }

  const { name, cuisine, area, averageRating, totalReviews, reviews } = data;

  return (
    <section id="restaurant-detail-view" className="max-w-[540px] mx-auto">
      {/* Restaurant Info Card */}
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
          {/* Restaurant image (reduced size, preserved cropping) */}
          <div className="relative w-full border-b border-stone-200/80 bg-stone-50/60 p-4 sm:p-5 flex justify-center items-center">
            <div className="w-full max-w-[380px] rounded-xl overflow-hidden shadow-sm border border-stone-200/70">
              <RestaurantImage
                src={initialImage}
                alt={name}
                autoHeight
              />
            </div>
          </div>

          {/* Restaurant Information Section */}
          <div className="p-5 sm:p-7">
            {/* Restaurant Name */}
            <h1
              id="restaurant-detail-name"
              className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-tight"
            >
              {name}
            </h1>

            {/* Cuisine */}
            <p className="text-sm font-medium text-stone-600 mt-1.5">
              {cuisine}
            </p>

            {/* Location / Area */}
            <p className="text-xs sm:text-sm text-stone-500 mt-1.5 flex items-start gap-1.5">
              <MapPin size={15} className="text-[#E23744] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{area}</span>
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
                  {averageRating !== null ? `${averageRating.toFixed(1)}/5` : 'No rating'}
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-xs sm:text-sm text-stone-500 font-medium">
                  {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                </span>
              </div>

              {/* Write a Review Button */}
              <Link
                id="restaurant-header-write-review-btn"
                href={`/review/${restaurantId}`}
                className="inline-flex items-center justify-center gap-1.5 bg-[#E23744] hover:bg-[#CB202D] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-xs hover:shadow-sm transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E23744]"
              >
                <Edit3 size={15} />
                <span>Write a Review</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section using clean component */}
      <ReviewSection
        reviews={reviews}
        totalReviewCount={totalReviews}
        restaurantId={restaurantId}
        formatDate={formatDate}
      />
    </section>
  );
};
