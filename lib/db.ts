import { neon } from '@neondatabase/serverless';

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not defined.');
  }
  return neon(databaseUrl);
}

export interface RestaurantReviewItem {
  rating: number;
  comment: string;
  createdAt: string;
}

export interface RestaurantDetailsResult {
  id: number;
  name: string;
  cuisine: string;
  area: string;
  averageRating: number | null;
  totalReviews: number;
  latestReview: RestaurantReviewItem | null;
  reviews: RestaurantReviewItem[];
}

export async function getRestaurantDetails(restaurantId: number): Promise<RestaurantDetailsResult | null> {
  const sql = getDb();

  // 1. Fetch restaurant record
  const restaurantRows = await sql`
    SELECT id, name, cuisine, area
    FROM restaurants
    WHERE id = ${restaurantId}
    LIMIT 1;
  `;

  if (restaurantRows.length === 0) {
    return null;
  }

  const restaurant = restaurantRows[0];

  // 2. Fetch all reviews for this restaurant, newest first
  const reviewsRows = await sql`
    SELECT rating, comment, created_at
    FROM reviews
    WHERE restaurant_id = ${restaurantId}
    ORDER BY created_at DESC, id DESC;
  `;

  const totalReviews = reviewsRows.length;

  if (totalReviews === 0) {
    return {
      id: Number(restaurant.id),
      name: String(restaurant.name),
      cuisine: String(restaurant.cuisine),
      area: String(restaurant.area),
      averageRating: null,
      totalReviews: 0,
      latestReview: null,
      reviews: [],
    };
  }

  // Calculate average rating from all reviews and round to 1 decimal place
  const sumRatings = reviewsRows.reduce((acc, row) => acc + Number(row.rating), 0);
  const avgRating = Number((sumRatings / totalReviews).toFixed(1));

  const formattedReviews: RestaurantReviewItem[] = reviewsRows.map((r) => ({
    rating: Number(r.rating),
    comment: String(r.comment),
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : new Date(r.created_at).toISOString(),
  }));

  const latestReview = formattedReviews[0] || null;

  return {
    id: Number(restaurant.id),
    name: String(restaurant.name),
    cuisine: String(restaurant.cuisine),
    area: String(restaurant.area),
    averageRating: avgRating,
    totalReviews,
    latestReview,
    reviews: formattedReviews,
  };
}
