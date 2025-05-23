import { useRestaurant } from "../../contexts/Restaurantcontext";
import Styles from "../../styles/restaurant-dashboard.module.scss";
import Image from "next/image";

export default function RestaurantNav() {
  const { restaurant } = useRestaurant();
  const { id, name } = restaurant || {};

  return (
    <nav className={Styles.restaurantNav}>
      <Link href="/">
        <Image
          src="/logo2.png"
          alt="Logo"
          width={100}
          height={100}
          className={Styles.logo}
        />
      </Link>
      <h1>{name}</h1>
      <div className={Styles.linksContainer}>
        <Link href="/restaurants/[id]" as={`/restaurants/${id}`}>
          Restaurant
        </Link>
        <Link
          href="/restaurants/[id]/floorplan"
          as={`/restaurants/${id}/floorplan`}
        >
          Floorplan
        </Link>
        <Link
          href="/restaurants/[id]/tables-list"
          as={`/restaurants/${id}/tables-list`}
        >
          Tables List
        </Link>
        <Link href="/restaurants/[id]/menu" as={`/restaurants/${id}/menu`}>
          Menu
        </Link>
        <Link
          href="/restaurants/[id]/bookings"
          as={`/restaurants/${id}/bookings`}
        >
          Bookings
        </Link>
      </div>
    </nav>
  );
}
import Link from "next/link";
