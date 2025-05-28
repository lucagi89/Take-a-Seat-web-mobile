"use client";
import { useEffect, useState } from "react";
import Styles from "../../../styles/dashboard.module.scss";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { Restaurant } from "../../../data/types";
import { useRestaurant } from "../../../contexts/RestaurantContext";
import { useUser } from "../../../contexts/userContext";
import { getUserRestaurants } from "../../../lib/databaseActions";

export default function Sidebar() {
  const router = useRouter();
  const { setRestaurant } = useRestaurant();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const handleRestaurantClick = (restaurantId: string) => {
    setRestaurant({ id: restaurantId });
    router.push(`/dashboard/${restaurantId}`);
  };

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const fetchRestaurants = async () => {
        try {
          const userRestaurants = await getUserRestaurants(user.uid);
          if (userRestaurants) {
            setRestaurants(userRestaurants);
          } else {
            console.warn("No restaurants found for user.");
          }
        } catch (error) {
          console.error("Error fetching restaurants:", error);
        }
      };
      fetchRestaurants();
    }
  }, [user]);

  return (
    <div className={Styles.sidebar}>
      <h2 className="">Your Restaurants</h2>
      {restaurants ? (
        <ul className={Styles.restaurantList}>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id} className={Styles.restaurantItem}>
              <button
                onClick={() => handleRestaurantClick(restaurant.id)}
                className={Styles.restaurantLink}
              >
                <h3>{restaurant.name}</h3>
                <p>{restaurant.description}</p>
                <hr />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p className="text-center">No restaurants found.</p>
          <p className="text-center">
            If you don&#39;t have any restaurants, you can create one.
          </p>
        </div>
      )}
      <button
        onClick={() => router.push("/create-restaurant")}
        className={Styles.button}
      >
        +
      </button>
    </div>
  );
}
