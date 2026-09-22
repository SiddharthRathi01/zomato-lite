import React from 'react';
import Link from 'next/link';
import { Edit3 } from 'lucide-react';

interface WriteReviewButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
}

export const WriteReviewButton: React.FC<WriteReviewButtonProps> = ({
  onClick,
  href,
  className = '',
}) => {
  const commonClasses = `inline-flex items-center justify-center gap-2 bg-[#E23744] hover:bg-[#CB202D] active:scale-[0.98] text-white font-bold px-5 py-2.5 rounded-xl shadow-xs hover:shadow-sm transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E23744] ${className}`;

  if (href) {
    return (
      <Link id="write-review-btn" href={href} className={commonClasses}>
        <Edit3 size={16} />
        <span>Write a Review</span>
      </Link>
    );
  }

  return (
    <button
      id="write-review-btn"
      type="button"
      onClick={onClick}
      className={commonClasses}
    >
      <Edit3 size={16} />
      <span>Write a Review</span>
    </button>
  );
};
