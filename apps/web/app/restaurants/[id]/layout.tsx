// app/restaurant/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { RestaurantProvider } from "../../../contexts/Restaurantcontext";

export default function RestaurantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useParams();

  if (!id || typeof id !== "string") return <div>Invalid restaurant ID</div>;

  return (
    <RestaurantProvider restaurantId={id}>
      <div className="flex flex-col gap-4">{children}</div>
    </RestaurantProvider>
  );
}
