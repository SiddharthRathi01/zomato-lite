import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number; // 0 = none selected
  onChange: (rating: number) => void;
  error?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ value, onChange, error }) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const activeRating = hoverValue !== null ? hoverValue : value;

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 1:
        return 'Terrible';
      case 2:
        return 'Bad';
      case 3:
        return 'Average';
      case 4:
        return 'Good';
      case 5:
        return 'Excellent';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-2">
      <label
        id="star-rating-label"
        className="block text-sm font-semibold text-stone-900"
      >
        How would you rate your experience? <span className="text-[#E23744]">*</span>
      </label>

      <div
        className="flex items-center gap-2"
        role="radiogroup"
        aria-labelledby="star-rating-label"
        aria-required="true"
      >
        <div className="flex items-center gap-1.5 py-1">
          {[1, 2, 3, 4, 5].map((starNumber) => {
            const isFilled = starNumber <= activeRating;

            return (
              <button
                key={starNumber}
                type="button"
                id={`star-btn-${starNumber}`}
                role="radio"
                aria-checked={value === starNumber}
                aria-label={`${starNumber} star${starNumber > 1 ? 's' : ''} - ${getRatingLabel(starNumber)}`}
                onClick={() => onChange(starNumber)}
                onMouseEnter={() => setHoverValue(starNumber)}
                onMouseLeave={() => setHoverValue(null)}
                className="p-1 rounded-lg hover:scale-110 active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E23744] cursor-pointer"
              >
                <Star
                  size={28}
                  className={`transition-colors ${
                    isFilled
                      ? 'fill-[#E23744] text-[#E23744]'
                      : 'text-stone-300 hover:text-stone-400'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {activeRating > 0 && (
          <span
            id="rating-text-feedback"
            className="text-sm font-semibold text-stone-700 ml-2 animate-in fade-in duration-150"
          >
            {getRatingLabel(activeRating)}
          </span>
        )}
      </div>

      {error && (
        <p id="rating-error" className="text-xs font-medium text-[#E23744]" role="alert">
          Please select a star rating between 1 and 5.
        </p>
      )}
    </div>
  );
};
