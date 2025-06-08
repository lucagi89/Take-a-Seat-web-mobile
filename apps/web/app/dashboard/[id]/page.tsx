"use client";

import { useParams } from "next/navigation";

import { useUser } from "../../../contexts/userContext";

export default function RestaurantPage() {
  const { userRestaurants, loading } = useUser();
  const params = useParams();

  const currentRestaurant = userRestaurants?.find(
    (restaurant) => restaurant.id === params.id
  );

  const { id } = useParams();

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching user data
  }

  if (!id) {
    return <div>Error: Restaurant ID is required.</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <h1 className="text-2xl font-bold">{currentRestaurant?.name}</h1>
        <p>Welcome to the restaurant dashboard!</p>
        {/* Add more content or components as needed */}
      </div>
    </div>
  );
}
