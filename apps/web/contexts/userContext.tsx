"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase.config";
import { getUserRestaurants } from "../lib/databaseActions";
import { Restaurant } from "../data/types";

interface UserContextType {
  user: User | null;
  loading: boolean;
  userRestaurants: Restaurant[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  userRestaurants: [],
  setLoading: () => {}, // Default function to avoid undefined error
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
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true); // ✅ set loading at start of async call
      if (user) {
        try {
          const restaurants = await getUserRestaurants(user.uid);
          setUserRestaurants(restaurants);
        } catch (error) {
          console.error("Failed to fetch user restaurants", error);
          setUserRestaurants([]);
        }
      } else {
        setUserRestaurants([]);
      }
      setLoading(false); // ✅ only set to false after everything is done
    };

    fetchRestaurants();
  }, [user]); // ✅ Only depend on `user`

  return (
    <UserContext.Provider
      value={{ user, loading, userRestaurants, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
