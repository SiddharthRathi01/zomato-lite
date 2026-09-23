import { notFound } from 'next/navigation';
import { RESTAURANTS } from '@/lib/data';
import { RestaurantDetailClient } from './RestaurantDetailClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurantId = parseInt(id, 10);
  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId);

  if (!restaurant || isNaN(restaurantId)) {
    notFound();
  }

  return (
    <RestaurantDetailClient
      restaurantId={restaurant.id}
      initialImage={restaurant.image}
    />
  );
}
