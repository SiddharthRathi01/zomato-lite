import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  id?: string | number;
  rating: number;
  comment: string;
  date: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ id, rating, comment, date }) => {
  return (
    <div
      id={id ? `review-card-${id}` : undefined}
      className="bg-white rounded-xl border border-stone-200/80 p-4 sm:p-5 shadow-xs hover:border-stone-300 transition-colors"
    >
      <div className="flex items-start justify-between gap-4 mb-2.5">
        <div>
          <span className="text-xs text-stone-400 font-normal block">
            {date}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex text-[#E23744]">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={13}
                className={s <= rating ? 'fill-[#E23744] text-[#E23744]' : 'text-stone-200'}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-stone-700 ml-1">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      <p className="text-sm text-stone-700 leading-relaxed font-normal">
        {comment}
      </p>
    </div>
  );
};
