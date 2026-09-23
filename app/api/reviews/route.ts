import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { restaurantId, reviewerName, rating, comment } = body;

    // Validation 1: reviewerName exists and is a non-empty string after trimming
    if (
      reviewerName === undefined ||
      reviewerName === null ||
      typeof reviewerName !== 'string' ||
      reviewerName.trim().length === 0
    ) {
      return NextResponse.json(
        { error: 'reviewerName must be a non-empty string' },
        { status: 400 }
      );
    }

    const trimmedReviewerName = reviewerName.trim();
    if (trimmedReviewerName.length > 100) {
      return NextResponse.json(
        { error: 'reviewerName cannot exceed 100 characters' },
        { status: 400 }
      );
    }

    // Validation 2: restaurantId must be a valid number and refer to an existing restaurant
    if (
      restaurantId === undefined ||
      restaurantId === null ||
      typeof restaurantId !== 'number' ||
      !Number.isInteger(restaurantId) ||
      restaurantId <= 0
    ) {
      return NextResponse.json(
        { error: 'restaurantId must be a positive integer referring to an existing restaurant' },
        { status: 400 }
      );
    }

    // Validation 3: rating must be an integer from 1 to 5
    if (
      rating === undefined ||
      rating === null ||
      typeof rating !== 'number' ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        { error: 'rating must be an integer between 1 and 5' },
        { status: 400 }
      );
    }

    // Validation 4: comment must be a non-empty string after trimming
    if (
      comment === undefined ||
      comment === null ||
      typeof comment !== 'string' ||
      comment.trim().length === 0
    ) {
      return NextResponse.json(
        { error: 'comment must be a non-empty string' },
        { status: 400 }
      );
    }

    const trimmedComment = comment.trim();
    if (trimmedComment.length > 500) {
      return NextResponse.json(
        { error: 'comment cannot exceed 500 characters' },
        { status: 400 }
      );
    }

    const sql = getDb();

    // Check if restaurant exists in database
    const existingRestaurant = await sql`
      SELECT id FROM restaurants WHERE id = ${restaurantId} LIMIT 1;
    `;

    if (existingRestaurant.length === 0) {
      return NextResponse.json(
        { error: `Restaurant with id ${restaurantId} does not exist` },
        { status: 400 }
      );
    }

    // Insert review using parameterized SQL including reviewer_name
    const result = await sql`
      INSERT INTO reviews (restaurant_id, reviewer_name, rating, comment)
      VALUES (${restaurantId}, ${trimmedReviewerName}, ${rating}, ${trimmedComment})
      RETURNING id;
    `;

    const newReviewId = result[0].id;

    return NextResponse.json(
      {
        success: true,
        reviewId: newReviewId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/reviews:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
