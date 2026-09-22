import React from 'react';
import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({ rating, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 gap-1',
    md: 'text-sm px-2 py-0.5 gap-1 font-bold',
    lg: 'text-base px-2.5 py-1 gap-1.5 font-black',
  };

  const starSizes = {
    sm: 10,
    md: 12,
    lg: 14,
  };

  return (
    <div
      className={`inline-flex items-center rounded-lg bg-[#24963F] text-white shadow-xs ${sizeClasses[size]} ${className}`}
      aria-label={`Rating: ${rating.toFixed(1)} out of 5 stars`}
    >
      <span>{rating.toFixed(1)}</span>
      <Star size={starSizes[size]} className="fill-white text-white" aria-hidden="true" />
    </div>
  );
};
