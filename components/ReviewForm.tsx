'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Loader2, MapPin, AlertCircle } from 'lucide-react';
import { Restaurant } from '@/lib/types';
import { StarRating } from '@/components/StarRating';

interface ReviewFormProps {
  restaurant: Restaurant;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ restaurant }) => {
  const router = useRouter();
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [reviewerName, setReviewerName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ rating?: boolean; reviewText?: string; reviewerName?: string }>({});

  const MAX_CHARS = 500;
  const MAX_NAME_CHARS = 100;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setReviewText(text);
      if (errors.reviewText) {
        setErrors((prev) => ({ ...prev, reviewText: undefined }));
      }
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const newErrors: { rating?: boolean; reviewText?: string; reviewerName?: string } = {};

    const trimmedName = reviewerName.trim();
    if (!trimmedName) {
      newErrors.reviewerName = 'Please enter your name.';
    } else if (trimmedName.length > MAX_NAME_CHARS) {
      newErrors.reviewerName = `Name cannot exceed ${MAX_NAME_CHARS} characters.`;
    }

    if (rating === 0) {
      newErrors.rating = true;
    }

    const trimmedText = reviewText.trim();
    if (!trimmedText) {
      newErrors.reviewText = 'Please write a review before submitting.';
    } else if (trimmedText.length > MAX_CHARS) {
      newErrors.reviewText = `Review cannot exceed ${MAX_CHARS} characters.`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId: restaurant.id,
          reviewerName: trimmedName,
          rating,
          comment: trimmedText,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.status === 201 && data?.success) {
        setIsSubmitted(true);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('review-submitted', { detail: { restaurantId: restaurant.id } }));
        }
        // Direct navigation back without artificial delays
        setTimeout(() => {
          router.push(`/restaurant/${restaurant.id}`);
        }, 500);
      } else {
        const errorMsg = data?.error || `Failed to submit review (HTTP ${response.status})`;
        setSubmitError(errorMsg);
      }
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Network error submitting review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div id="review-success-container" className="max-w-xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-2xl border border-stone-200/90 p-8 sm:p-10 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-5">
            <CheckCircle2 size={36} />
          </div>

          <h2 id="review-success-heading" className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
            Review submitted successfully
          </h2>

          <p className="text-stone-600 text-sm max-w-sm mb-8">
            Thank you for sharing your dining experience at {restaurant.name}. Your review has been saved to the database.
          </p>

          <Link
            id="back-to-restaurant-after-submit-btn"
            href={`/restaurant/${restaurant.id}`}
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('review-submitted', { detail: { restaurantId: restaurant.id } }));
              }
              router.refresh();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1C1C1C] hover:bg-black text-white font-semibold px-8 py-3.5 rounded-xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
          >
            <ArrowLeft size={16} />
            <span>Back to {restaurant.name}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="write-review-container" className="max-w-2xl mx-auto py-4 sm:py-8 px-4">
      {/* Top back link */}
      <Link
        id="back-to-restaurant-link"
        href={`/restaurant/${restaurant.id}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-[#E23744] transition-colors mb-6 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E23744] rounded-md px-1 py-0.5"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to {restaurant.name}</span>
      </Link>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-sm">
        {/* Header section */}
        <div className="border-b border-stone-100 pb-6 mb-6">
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#E23744] block mb-1">
            WRITING A REVIEW FOR
          </span>
          <h1 id="reviewing-restaurant-name" className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            {restaurant.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1.5 flex items-center gap-1.5">
            <MapPin size={14} className="text-stone-400 shrink-0" />
            <span>{restaurant.address}</span>
          </p>
        </div>

        {/* Error message banner if API returned error */}
        {submitError && (
          <div
            id="submission-error-banner"
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200/80 text-red-700 flex items-start gap-3"
            role="alert"
          >
            <AlertCircle size={18} className="shrink-0 mt-0.5 text-[#E23744]" />
            <div className="text-sm">
              <span className="font-semibold block mb-0.5">Submission Error</span>
              <span>{submitError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Star rating component */}
          <StarRating
            value={rating}
            onChange={handleRatingChange}
            error={errors.rating}
          />

          {/* Reviewer Name */}
          <div>
            <label
              htmlFor="reviewer-name-input"
              className="block text-sm font-semibold text-stone-900 mb-1.5"
            >
              Your name <span className="text-[#E23744]">*</span>
            </label>
            <input
              id="reviewer-name-input"
              type="text"
              value={reviewerName}
              onChange={(e) => {
                setReviewerName(e.target.value);
                if (errors.reviewerName) {
                  setErrors((prev) => ({ ...prev, reviewerName: undefined }));
                }
              }}
              placeholder="e.g. Rahul Sharma"
              maxLength={MAX_NAME_CHARS}
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.reviewerName ? 'border-[#E23744] ring-1 ring-[#E23744]' : 'border-stone-200'
              } focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/20 outline-none text-sm text-stone-800 transition-all placeholder:text-stone-400`}
              aria-describedby={errors.reviewerName ? 'reviewer-name-error' : undefined}
            />
            {errors.reviewerName && (
              <p id="reviewer-name-error" className="text-xs font-medium text-[#E23744] mt-1" role="alert">
                {errors.reviewerName}
              </p>
            )}
          </div>

          {/* Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="review-textarea"
                className="block text-sm font-semibold text-stone-900"
              >
                Your review <span className="text-[#E23744]">*</span>
              </label>
              <span
                id="char-counter"
                className={`text-xs font-mono font-medium ${
                  reviewText.length >= MAX_CHARS ? 'text-[#E23744] font-bold' : 'text-stone-400'
                }`}
              >
                {reviewText.length} / {MAX_CHARS}
              </span>
            </div>

            <textarea
              id="review-textarea"
              rows={5}
              value={reviewText}
              onChange={handleTextChange}
              placeholder="Tell us about your experience..."
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.reviewText ? 'border-[#E23744] ring-1 ring-[#E23744]' : 'border-stone-200'
              } focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/20 outline-none text-sm text-stone-800 transition-all placeholder:text-stone-400 resize-y`}
              aria-describedby={errors.reviewText ? 'review-error' : undefined}
            />

            {errors.reviewText && (
              <p id="review-error" className="text-xs font-medium text-[#E23744] mt-1" role="alert">
                {errors.reviewText}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              id="submit-review-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#E23744] hover:bg-[#CB202D] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold px-6 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E23744] focus-visible:ring-offset-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Submitting Review...</span>
                </>
              ) : (
                <span>Submit Review</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
