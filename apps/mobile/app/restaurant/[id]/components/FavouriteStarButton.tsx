import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../../../contexts/userContext";
import { useRestaurant } from "../../../../contexts/RestaurantContext";
import {
  seeIfRestaurantIsInFavourites,
  toggleRestaurantToFavourites,
} from "../../../../services/databaseActions";

export default function FavouriteStarButton() {
  const { user } = useUser();
  const { loading, restaurantId } = useRestaurant();
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (user && restaurantId) {
      seeIfRestaurantIsInFavourites(user.uid, restaurantId)
        .then(setIsFavourite)
        .catch((err) => console.error("Error checking favourite:", err));
    }
  }, [user, restaurantId]);

  const toggleFavourite = () => {
    if (!user) return;
    toggleRestaurantToFavourites(user.uid, restaurantId)
      .then(() => setIsFavourite((prev) => !prev))
      .catch((err) => console.error("Toggle error:", err));
  };

  if (loading) return null;

  return (
    <TouchableOpacity
      onPress={toggleFavourite}
      style={{
        position: "absolute",
        top: 40,
        right: 20,
        zIndex: 10,
        borderRadius: 50,
        padding: 10,
      }}
    >
      <Ionicons
        name={isFavourite ? "star" : "star-outline"}
        size={30}
        color="#2E7D32"
      />
    </TouchableOpacity>
  );
}
