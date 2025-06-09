"use client";
import { useRestaurant } from "../../../../contexts/RestaurantContext";

export default function FloorplanPage() {
  const { restaurant } = useRestaurant();
  if (!restaurant) {
    return <div>Error: No restaurant selected.</div>;
  }
  return (
    <div>
      <h1>{restaurant.name} Floorplan Page</h1>
      <p>This is the floorplan page for the restaurant.</p>
      {/* Add your floorplan components and logic here */}
    </div>
  );
}
