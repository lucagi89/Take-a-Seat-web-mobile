// app/restaurant/[id]/page.tsx
"use client";

import { useRestaurant } from "../../../contexts/Restaurantcontext";

export default function RestaurantPage() {
  const { restaurant, loading } = useRestaurant();
  if (loading) return <div>Loading...</div>;

  const { name, id } = restaurant || {};

  if (!id || typeof id !== "string") return <div>Invalid restaurant ID</div>;

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">{name}</h1>
      <p>Restaurant {id}</p>
      <p>This is the restaurant page.</p>
    </div>
  );
}
