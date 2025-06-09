"use client";
import { useRestaurant } from "../../../../contexts/RestaurantContext";

export default function BookingsPage() {
  const { restaurant } = useRestaurant();
  if (!restaurant) {
    return <div>Error: No restaurant selected.</div>;
  }
  return (
    <div>
      <h1>{restaurant.name}&apos; Bookings Page</h1>
      <p>This is the bookings page for the restaurant.</p>
      {/* Add your bookings components and logic here */}
    </div>
  );
}
