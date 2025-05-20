// app/restaurant/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { RestaurantProvider } from "../../../contexts/Restaurantcontext";
import RestaurantDetails from "@/components/RestaurantDetails"; // or whatever you render

export default function RestaurantPage() {
  const { id } = useParams();

  if (!id || typeof id !== "string") return <div>Invalid restaurant ID</div>;

  return (
    <RestaurantProvider restaurantId={id}>
      <RestaurantDetails />
    </RestaurantProvider>
  );
}
