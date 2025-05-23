"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../contexts/userContext";
import Styles from "../../styles/dashboard.module.scss";
import { getUserRestaurants } from "../../lib/databaseActions";
import { Restaurant } from "../../data/types";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  const [userRestaurants, setUserRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

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
    <main className={Styles.container}>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : user ? (
        <p className="text-center">Hello, {user.email}</p>
      ) : (
        <p className="text-center">Please log in to access your dashboard.</p>
      )}

      <h2 className="">Your Restaurants</h2>
      {userRestaurants ? (
        <ul className={Styles.restaurantList}>
          {userRestaurants.map((restaurant) => (
            <li key={restaurant.id} className={Styles.restaurantItem}>
              <Link
                href={`/restaurants/${restaurant.id}`}
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
        Create New Restaurant
      </button>
      <h2 className="">Go to Home</h2>
    </main>
  );
}
