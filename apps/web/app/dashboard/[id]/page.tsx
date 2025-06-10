"use client";

import { useParams } from "next/navigation";
import { useUser } from "../../../contexts/userContext";

export default function RestaurantPage() {
  const { userRestaurants } = useUser();
  const params = useParams();
  const { id } = params;

  const currentRestaurant = userRestaurants?.find(
    (restaurant) => restaurant.id === id
  );

  if (!id) {
    return <div>Error: Restaurant ID is required.</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <h1 className="text-2xl font-bold">{currentRestaurant?.name}</h1>
        <p className="text-gray-600">{currentRestaurant?.description}</p>
      </div>
    </div>
  );
}
