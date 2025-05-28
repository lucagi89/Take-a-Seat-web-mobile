"use client";
import Styles from "../../../../styles/restaurant-dashboard.module.scss";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function RestaurantNavbar() {
  const { id } = useParams();

  return (
    <div className={Styles.restaurantNav}>
      <Link href={`/dashboard/restaurants/${id}`}>Restaurant</Link>
      <Link href={`/dashboard/restaurants/${id}/floorplan`}>Floorplan</Link>
      {/* <Link href={`/dashboard/restaurants/${id}/tables-list`}>Tables List</Link> */}
      <Link href={`/dashboard/restaurants/${id}/menu`}>Menu</Link>
    </div>
  );
}
