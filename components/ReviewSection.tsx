import React from 'react';
import { ApiReview } from '@/lib/api-types';
import { LatestReview } from './LatestReview';
import { ReviewCard } from './ReviewCard';
import { WriteReviewButton } from './WriteReviewButton';

interface ReviewSectionProps {
  reviews: ApiReview[];
  totalReviewCount: number;
  restaurantId: number;
  formatDate: (dateStr: string) => string;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviews,
  totalReviewCount,
  restaurantId,
  formatDate,
}) => {
  const latestReview = reviews[0] || null;
  const earlierReviews = reviews.slice(1);

  return (
    <section id="reviews-section" className="mt-8 pb-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Customer Reviews
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Showing latest highlights ({totalReviewCount} total diner {totalReviewCount === 1 ? 'experience' : 'experiences'})
          </p>
        </div>
      </div>

      {/* Latest Review */}
      {latestReview && (
        <div className="mb-5">
          <LatestReview
            rating={latestReview.rating}
            comment={latestReview.comment}
            date={formatDate(latestReview.createdAt)}
          />
        </div>
      )}

      {/* Earlier Reviews */}
      {earlierReviews.length > 0 && (
        <div className="space-y-3.5 mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Earlier Reviews
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {earlierReviews.map((review, index) => (
              <ReviewCard
                key={`${review.createdAt}-${index}`}
                id={index}
                rating={review.rating}
                comment={review.comment}
                date={formatDate(review.createdAt)}
              />
            ))}
          </div>
        </div>
      )}

      {/* If no reviews yet */}
      {reviews.length === 0 && (
        <div className="text-center py-8 bg-white rounded-2xl border border-stone-200/80 p-6 mb-6">
          <p className="text-sm text-stone-500">No reviews yet. Be the first to share your experience!</p>
        </div>
      )}

      {/* Prominent bottom Write Review Button */}
      <div className="pt-2 flex justify-center">
        <WriteReviewButton href={`/review/${restaurantId}`} className="w-full sm:w-auto" />
      </div>
    </section>
  );
};
