"use client";
import Styles from "../../../../styles/restaurant-dashboard.module.scss";

import Link from "next/link";
// import { useParams } from "next/navigation";

export default function RestaurantNavbar() {
  // const { id } = useParams();
  console.log("RestaurantNavbar rendered");
  return (
    <div className={Styles.restaurantNav}>
      <Link href={`/dashboard/restaurants`}>Restaurant</Link>
      <Link href={`/dashboard/restaurants/floorplan`}>Floorplan</Link>
      <Link href={`/dashboard/restaurants/tables-list`}>Tables List</Link>
      <Link href={`/dashboard/restaurants/menu`}>Menu</Link>
    </div>
  );
}
