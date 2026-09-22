import { notFound } from 'next/navigation';
import { RESTAURANTS } from '@/lib/data';
import { ReviewPageClient } from './ReviewPageClient';

export function generateStaticParams() {
  return RESTAURANTS.map((r) => ({
    restaurantId: r.id.toString(),
  }));
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = await params;
  const id = parseInt(restaurantId, 10);
  const restaurant = RESTAURANTS.find((r) => r.id === id);

  if (!restaurant) {
    notFound();
  }

  return <ReviewPageClient restaurant={restaurant} />;
}
