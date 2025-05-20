"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../contexts/userContext";
import Styles from "../../styles/dashboard.module.scss";
import { getUserRestaurants } from "../../lib/databaseActions";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [userRestaurants, setUserRestaurants] = useState([]);

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

  // useEffect(() => {
  //   if (userRestaurants.length === 0) {
  //     router.push("/create-restaurant");
  //   }
  // }, [userRestaurants, router]);

  return (
    <main className={Styles.container}>
      <h1 className="">Dashboard</h1>
      <p className="">Welcome to the dashboard!</p>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : user ? (
        <p className="text-center">Hello, {user.email}</p>
      ) : (
        <p className="text-center">Please log in to access your dashboard.</p>
      )}

      <h2 className="">Your Restaurants</h2>
      {userRestaurants ?
        <ul className={Styles.restaurantList}>
          {userRestaurants.map((restaurant) => (
            <li key={restaurant.id} className={Styles.restaurantItem}>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.description}</p>
              <button
                onClick={() => router.push(`/restaurants/${restaurant.id}`)}
                className={Styles.button}
              >
                View
              </button>
            </li>
          ))}
        </ul>
        : <p className="text-center">No restaurants found.</p>
      }
      <h2 className="">Create a New Restaurant</h2>
      <p className="text-center">
        If you don't have any restaurants, you can create one.
      </p>
      <button
        onClick={() => router.push("/create-restaurant")}
        className={Styles.button}
      >
        Create Restaurant
      </button>
      <h2 className="">Go to Home</h2>
      <p className="text-center">
        You can go back to the home page if you want.
      </p>
      <p className="text-center">
        <strong>Note:</strong> This is a demo application. The data is not
        persistent and will be reset after a while.
      </p>
      <button onClick={() => router.push("/")} className={Styles.button}>
        Go
      </button>
    </main>
  );
}
