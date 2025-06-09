"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase.config"; // your Firebase config
import { getUserRestaurants } from "../lib/databaseActions"; // your function to get user restaurants
import { Restaurant } from "../data/types"; // your Restaurant type

interface UserContextType {
  user: User | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  userRestaurants: Restaurant[];
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  setLoading: () => {},
  userRestaurants: [],
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRestaurants, setUserRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    const fetchRestaurants = async () => {
      if (user) {
        try {
          const restaurants = await getUserRestaurants(user.uid);
          setUserRestaurants(restaurants);
        } catch (error) {
          console.error("Failed to fetch user restaurants", error);
          setUserRestaurants([]); // fallback to empty
        }
      } else {
        setUserRestaurants([]);
      }
    };

    fetchRestaurants();
    setLoading(false);
  }, [user, loading]);

  return (
    <UserContext.Provider
      value={{ user, loading, setLoading, userRestaurants }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
