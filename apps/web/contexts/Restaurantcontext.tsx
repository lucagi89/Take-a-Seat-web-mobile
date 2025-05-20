// contexts/RestaurantContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getRestaurantById } from "@/lib/databaseActions"; // Adjust import path
import { DocumentData } from "firebase/firestore";

type RestaurantContextType = {
  restaurant: DocumentData | null;
  setRestaurant: (r: DocumentData | null) => void;
  loading: boolean;
  restaurantId: string;
};

const RestaurantContext = createContext<RestaurantContextType | null>(null);

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context)
    throw new Error("useRestaurant must be used within RestaurantProvider");
  return context;
};

export const RestaurantProvider = ({
  restaurantId,
  children,
}: {
  restaurantId: string;
  children: ReactNode;
}) => {
  const [restaurant, setRestaurant] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!restaurantId) return;

    const fetchRestaurant = async () => {
      try {
        const data = await getRestaurantById(restaurantId);
        setRestaurant(data || null);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  return (
    <RestaurantContext.Provider
      value={{ restaurant, setRestaurant, loading, restaurantId }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
