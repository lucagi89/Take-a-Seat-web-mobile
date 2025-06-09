"use client";

import RestaurantNavbar from "./components/RestaurantNavbar";
import Styles from "../../../styles/restaurant-dashboard.module.scss";
import { useParams } from "next/navigation";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const { id } = params;
  if (!id) {
    return <div>Error: Restaurant ID is required.</div>;
  }
  console.log("RestaurantLayout rendered with ID:", id);
  return (
    <div className={Styles.dashboardContainer}>
      <div className="overflow-y-auto p-4">{children}</div>
      <RestaurantNavbar restaurantId={id} />
    </div>
  );
}
