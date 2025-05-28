"use client";
import { getRestaurantById } from "@/lib/databaseActions";
import React, {
  useEffect,
  useState,
  ReactNode,
  createContext,
  useContext,
} from "react";
import { DocumentData } from "firebase/firestore";

type RestaurantContextType = {
  restaurant: DocumentData | null;
  setRestaurant: (r: DocumentData | null) => void;
  loading: boolean;
  restaurantId: string;
  setRestaurantId: (id: string) => void;
};

const RestaurantContext = createContext<RestaurantContextType | null>(null);

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context)
    throw new Error("useRestaurant must be used within RestaurantProvider");
  return context;
};

export const RestaurantProvider = ({
  initialRestaurantId,
  children,
}: {
  initialRestaurantId: string;
  children: ReactNode;
}) => {
  const [restaurantId, setRestaurantId] = useState(initialRestaurantId);
  const [restaurant, setRestaurant] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!restaurantId) return;

    setLoading(true); // ✅ move this here

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
      value={{
        restaurant,
        setRestaurant,
        loading,
        restaurantId,
        setRestaurantId,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
