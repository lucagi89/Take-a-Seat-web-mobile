import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { getRestaurantById } from "../services/databaseActions";
import { RestaurantContextType, Restaurant } from "../data/types";

const RestaurantContext = createContext<RestaurantContextType | null>(null);

export const useRestaurant = () => useContext(RestaurantContext);

import { ReactNode } from "react";

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useLocalSearchParams(); // ✅ Get ID directly from URL
  const restaurantId = id as string;
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Handle undefined ID

    const fetchRestaurant = async () => {
      try {
        const data = await getRestaurantById(Array.isArray(id) ? id[0] : id);
        setRestaurant((data as Restaurant) || null);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]); // ✅ Fetch when ID changes

  return (
    <RestaurantContext.Provider
      value={{
        restaurant,
        setRestaurant,
        loading,
        restaurantId,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
