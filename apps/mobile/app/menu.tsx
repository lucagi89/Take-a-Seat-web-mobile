import React from "react";
import { View, Text } from "react-native";
import { useUser } from "../contexts/userContext";
import { useRouter } from "expo-router";

export default function Menu() {
  const { user, userData, loading } = useUser();
  return (
    <View style={{backgroundColor: "white" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Menu
      </Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : user ? (
        <Text>Welcome, {userData?.name || user.email}!</Text>
      ) : (
        <Text>Please log in to see the menu.</Text>
      )}
      {/* Add your menu items here */}
      <Text style={{ marginTop: 20 }}>Menu items will be displayed here.</Text>
    </View>
  );
}
