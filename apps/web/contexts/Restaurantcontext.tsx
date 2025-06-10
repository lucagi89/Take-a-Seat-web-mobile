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
import {
  getRestaurantBookings,
  getRestaurantDishes,
  getRestaurantReviews,
  getRestaurantTables,
} from "../lib/databaseActions";

type RestaurantContextType = {
  restaurantData: DocumentData | null;
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
  const [restaurantData, setRestaurantData] = useState<DocumentData | null>({
    data: null,
    bookings: [],
    reviews: [],
    dishes: [],
    tables: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!restaurantId) return;

    setLoading(true);

    const fetchRestaurantData = async () => {
      setLoading(true);
      try {
        const restaurant = await getRestaurantById(restaurantId);
        if (!restaurant) {
          throw new Error("Restaurant not found");
        }

        const bookings = await getRestaurantBookings(restaurantId);
        const reviews = await getRestaurantReviews(restaurantId);
        const dishes = await getRestaurantDishes(restaurantId);
        const tables = await getRestaurantTables(restaurantId);

        setRestaurantData({
          data: restaurant,
          bookings,
          reviews,
          dishes,
          tables,
        });
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurantData();
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
