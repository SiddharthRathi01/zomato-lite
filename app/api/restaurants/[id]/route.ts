import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const restaurantId = parseInt(id, 10);

    if (isNaN(restaurantId) || restaurantId <= 0) {
      return NextResponse.json(
        { error: 'Invalid restaurant ID' },
        { status: 404 }
      );
    }

    const sql = getDb();

    // 1. Find the restaurant by ID
    const restaurantRows = await sql`
      SELECT id, name, cuisine, area
      FROM restaurants
      WHERE id = ${restaurantId}
      LIMIT 1;
    `;

    if (restaurantRows.length === 0) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      );
    }

    const restaurant = restaurantRows[0];

    // 2. Fetch reviews ordered newest first (created_at DESC, id DESC)
    const reviewsRows = await sql`
      SELECT rating, comment, created_at
      FROM reviews
      WHERE restaurant_id = ${restaurantId}
      ORDER BY created_at DESC, id DESC;
    `;

    const totalReviews = reviewsRows.length;

    if (totalReviews === 0) {
      return NextResponse.json({
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        area: restaurant.area,
        averageRating: null,
        totalReviews: 0,
        latestReview: null,
        reviews: [],
      });
    }

    // Calculate average rating from reviews and round to 1 decimal place
    const sumRatings = reviewsRows.reduce((acc, row) => acc + Number(row.rating), 0);
    const avgRating = Number((sumRatings / totalReviews).toFixed(1));

    const formattedReviews = reviewsRows.map((r) => ({
      rating: Number(r.rating),
      comment: r.comment,
      createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : new Date(r.created_at).toISOString(),
    }));

    const latestReview = formattedReviews[0] || null;

    return NextResponse.json({
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      area: restaurant.area,
      averageRating: avgRating,
      totalReviews,
      latestReview,
      reviews: formattedReviews,
    });
  } catch (error) {
    console.error('Error in GET /api/restaurants/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
