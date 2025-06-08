"use client";
import { useEffect } from "react";
import Link from "next/link";
import styles from "../styles/home-page.module.scss";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user, userRestaurants, loading } = useUser();
  const router = useRouter();

  // Debugging: Log user and userRestaurants to the consol
  console.log("User Restaurants:", userRestaurants);

  useEffect(() => {
    if (loading) return;
    if (user) {
      // If the user is logged in, redirect to the dashboard of the first restaurant
      if (userRestaurants && userRestaurants.length > 0) {
        router.push(`/dashboard/${userRestaurants[0].id}`);
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, loading, userRestaurants, router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching user data
  }

  return (
    <>
      <h1 className={styles.title}>Take a Seat</h1>

      <div className={styles.buttons}>
        <Link href="/login">
          <p className={styles.button}>I&#39;m a Restaurant Owner</p>
        </Link>

        <Link href="/signup">
          <p className={styles.button}>I Want to Add my Restaurant</p>
        </Link>
      </div>

      <div className={styles.message}>
        Not a restaurant owner? To book tables and explore restaurants, please
        use the <span className="font-semibold">Take a Seat</span> mobile app
        available on iOS and Android.
      </div>
    </>
  );
}
