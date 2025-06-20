"use client";
// import { useEffect, useState } from "react";
import Styles from "../../../../styles/restaurant-dashboard.module.scss";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { Restaurant } from "../../../../data/types";
import { useRestaurant } from "../../../../contexts/RestaurantContext";
import { useUser } from "../../../../contexts/userContext";
// import { getUserRestaurants } from "../../../lib/databaseActions";

export default function Sidebar() {
  const router = useRouter();
  const { setRestaurant } = useRestaurant();

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setRestaurant(restaurant || null);
    const restaurantId = restaurant.id;
    if (!restaurantId) {
      console.error("Restaurant ID is missing");
      return;
    }
    router.push(`/dashboard/${restaurantId}`);
  };

  const { userRestaurants } = useUser();

  return (
    <div className={Styles.sidebar}>
      <h2 className="">Your Restaurants</h2>
      {userRestaurants ? (
        <ul className={Styles.restaurantList}>
          {userRestaurants.map((restaurant) => (
            <li key={restaurant.id} className={Styles.restaurantItem}>
              <button
                onClick={() => handleRestaurantClick(restaurant)}
                className={Styles.restaurantLink}
              >
                <h3>{restaurant.name}</h3>

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
