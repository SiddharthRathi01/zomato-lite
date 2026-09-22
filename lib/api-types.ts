export interface ApiReview {
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ApiRestaurantResponse {
  name: string;
  cuisine: string;
  area: string;
  averageRating: number | null;
  totalReviews: number;
  latestReview: ApiReview | null;
  reviews: ApiReview[];
}
