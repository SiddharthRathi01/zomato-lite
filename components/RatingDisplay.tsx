import React from 'react';
import { Star } from 'lucide-react';

interface RatingDisplayProps {
  rating: number;
  totalReviews?: number;
  showOutOfFive?: boolean;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  totalReviews,
  showOutOfFive = true,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center text-[#E23744]" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = starIndex <= fullStars;
          const isHalf = starIndex === fullStars + 1 && hasHalf;

          return (
            <span key={starIndex} className="relative inline-block">
              {isFilled ? (
                <Star size={16} className="fill-[#E23744] text-[#E23744]" />
              ) : isHalf ? (
                <span className="relative inline-block">
                  <Star size={16} className="text-stone-300 fill-stone-300" />
                  <span className="absolute inset-0 overflow-hidden w-1/2">
                    <Star size={16} className="fill-[#E23744] text-[#E23744]" />
                  </span>
                </span>
              ) : (
                <Star size={16} className="text-stone-300 fill-stone-200" />
              )}
            </span>
          );
        })}
      </div>

      <span className="text-sm font-semibold text-stone-800">
        {showOutOfFive ? `${rating.toFixed(1)} / 5` : rating.toFixed(1)}
      </span>

      {totalReviews !== undefined && (
        <>
          <span className="text-stone-300">•</span>
          <span className="text-sm text-stone-500 font-medium">
            {totalReviews} reviews
          </span>
        </>
      )}
    </div>
  );
};
