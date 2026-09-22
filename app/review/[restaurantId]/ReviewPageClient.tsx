'use client';

import React from 'react';
import { Restaurant } from '@/lib/types';
import { ReviewForm } from '@/components/ReviewForm';

interface ReviewPageClientProps {
  restaurant: Restaurant;
}

export const ReviewPageClient: React.FC<ReviewPageClientProps> = ({ restaurant }) => {
  return (
    <section id="write-review-view">
      <ReviewForm restaurant={restaurant} />
    </section>
  );
};
