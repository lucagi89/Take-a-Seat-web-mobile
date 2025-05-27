"use client";
import { useEffect, useState } from "react";
import Styles from "../../../styles/dashboard.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "../../../contexts/userContext";
import { getUserRestaurants } from "../../../lib/databaseActions";
import { Restaurant } from "../../../data/types";

export default function Sidebar() {
  const router = useRouter();
  const { user } = useUser();

  const [userRestaurants, setUserRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    if (user) {
      const fetchRestaurants = async () => {
        try {
          const restaurants = await getUserRestaurants(user.uid);
          console.log("Restaurants:", restaurants);
          setUserRestaurants(restaurants);
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
      {userRestaurants ? (
        <ul className={Styles.restaurantList}>
          {userRestaurants.map((restaurant) => (
            <li key={restaurant.id} className={Styles.restaurantItem}>
              <Link
                href={`dashboard/${restaurant.id}`}
                className={Styles.restaurantLink}
              >
                <h3>{restaurant.name}</h3>
                <p>{restaurant.description}</p>
                <hr />
              </Link>
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
