import React from 'react';
import { Star } from 'lucide-react';

interface LatestReviewProps {
  rating: number;
  comment: string;
  date: string;
}

export const LatestReview: React.FC<LatestReviewProps> = ({ rating, comment, date }) => {
  return (
    <div
      id="latest-review-card"
      className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs"
    >
      {/* Header: Badge & Date */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#E23744] bg-[#E23744]/10 px-2 py-0.5 rounded">
          Latest Review
        </span>
        <span className="text-xs text-stone-400 font-normal">{date}</span>
      </div>

      {/* Star Rating */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-1">
          <div className="flex text-[#E23744]">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={14}
                className={s <= rating ? 'fill-[#E23744] text-[#E23744]' : 'text-stone-200'}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-stone-700 ml-1">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Review text */}
      <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
        "{comment}"
      </p>
    </div>
  );
};
