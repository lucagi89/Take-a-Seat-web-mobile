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

  useEffect(() => {
    if (userRestaurants.length === 0) {
      router.push("/create-restaurant");
    }
  }, [userRestaurants, router]);

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
      <button onClick={() => router.push("/")} className={Styles.button}>
        Go
      </button>
    </main>
  );
}
