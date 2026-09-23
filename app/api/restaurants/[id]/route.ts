import { NextRequest, NextResponse } from 'next/server';
import { getRestaurantDetails } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

    const details = await getRestaurantDetails(restaurantId);

    if (!details) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(details);
  } catch (error) {
    console.error('Error in GET /api/restaurants/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

