"use client";
import { useEffect, useState } from "react";
import { getUserRestaurants } from "../../lib/databaseActions";

import Sidebar from "./components/Sidebar";
import Styles from "../../styles/dashboard.module.scss";

import { RestaurantProvider } from "../../contexts/RestaurantContext";
import { useUser } from "../../contexts/userContext";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const userRestaurants = async () => {
      if (user) {
        try {
          const userRestaurants = await getUserRestaurants(user.uid);
          setRestaurants(userRestaurants);
        } catch (error) {
          console.error("Error fetching user's first restaurant:", error);
        }
      }
    };
    userRestaurants();
  }, [user]);

  return (
    <div className={Styles.dashboardContainer}>
      <RestaurantProvider initialRestaurantId={restaurants[0] ?? ""}>
        {restaurants.length > 1 && <Sidebar />}
        {children}
      </RestaurantProvider>
    </div>
  );
}
