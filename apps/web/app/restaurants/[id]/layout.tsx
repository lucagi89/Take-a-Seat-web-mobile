// app/restaurant/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { RestaurantProvider } from "../../../contexts/Restaurantcontext";
import RestaurantNav from "../../components/RestaurantNav";
import Bookingslist from "../../components/bookingsList";
import Styles from "../../../styles/restaurant-dashboard.module.scss";

export default function RestaurantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useParams();

  if (!id || typeof id !== "string") return <div>Invalid restaurant ID</div>;

  return (
    <RestaurantProvider restaurantId={id}>
      <div className={Styles.container}>
        <RestaurantNav />
        <Bookingslist />
        <div>{children}</div>
      </div>
    </RestaurantProvider>
  );
}
