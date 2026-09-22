export interface Review {
  id: string;
  restaurantId: number;
  reviewerName: string;
  rating: number;
  date: string;
  reviewText: string;
  isLatest?: boolean;
}

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  cuisine: string;
  diningType: string;
  rating: number;
  reviewCount: number;
  image: string;
}
