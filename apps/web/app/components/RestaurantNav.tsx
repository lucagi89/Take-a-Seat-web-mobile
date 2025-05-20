import { useRestaurant } from "../../contexts/Restaurantcontext";

export default function RestaurantNav() {
  const { restaurant } = useRestaurant();
  const { id, name } = restaurant || {};
  return (
    <nav className="flex gap-4">
      <h1 className="text-center text-2xl font-bold">{name}</h1>
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
    </nav>
  );
}
import Link from "next/link";
