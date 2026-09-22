'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Review } from './types';
import { INITIAL_REVIEWS } from './data';

interface ReviewsContextType {
  reviewsMap: Record<number, Review[]>;
  getReviews: (restaurantId: number) => Review[];
  addReview: (newReviewData: Omit<Review, 'id' | 'date'>) => void;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviewsMap, setReviewsMap] = useState<Record<number, Review[]>>(INITIAL_REVIEWS);

  const getReviews = (restaurantId: number): Review[] => {
    return reviewsMap[restaurantId] || [];
  };

  const addReview = (newReviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...newReviewData,
      id: `review-${Date.now()}`,
      date: 'Just now',
    };

    setReviewsMap((prev) => {
      const currentList = prev[newReview.restaurantId] || [];
      return {
        ...prev,
        [newReview.restaurantId]: [newReview, ...currentList],
      };
    });
  };

  return (
    <ReviewsContext.Provider value={{ reviewsMap, getReviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = (): ReviewsContextType => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};
