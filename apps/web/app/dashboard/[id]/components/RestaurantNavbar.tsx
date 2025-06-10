"use client";
import Styles from "../../../../styles/restaurant-dashboard.module.scss";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function RestaurantNavbar() {
  const params = useParams();
  const { id } = params;
  if (!id || Array.isArray(id)) {
    return <div>Error: Restaurant ID is required.</div>;
  }
  return (
    <div className={Styles.restaurantNav}>
      <Link href={`/dashboard/${id}`}>Restaurant</Link>
      <Link href={`/dashboard/${id}/floorplan`}>Floorplan</Link>
      <Link href={`/dashboard/${id}/tables-list`}>Tables List</Link>
      <Link href={`/dashboard/${id}/bookings`}>Bookings</Link>
      <Link href={`/dashboard/${id}/menu`}>Menu</Link>
    </div>
  );
}
