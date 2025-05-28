"use client";
import { useEffect, useState } from "react";
import { getFirstUserRestaurantId } from "../../lib/databaseActions";

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
  const [firstUserRestaurant, setFirstUserRestaurant] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchFirstRestaurant = async () => {
      if (user) {
        try {
          const restaurantId = await getFirstUserRestaurantId(user.uid);
          setFirstUserRestaurant(restaurantId);
        } catch (error) {
          console.error("Error fetching first restaurant:", error);
        }
      }
    };
    fetchFirstRestaurant();
  }, [user]);

  return (
    <div className={Styles.dashboardContainer}>
      <RestaurantProvider initialRestaurantId={firstUserRestaurant ?? ""}>
        <Sidebar />
        {children}
      </RestaurantProvider>
    </div>
  );
}
