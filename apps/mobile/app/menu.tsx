import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Menu() {
  const router = useRouter();

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24 }}>Menu</Text>
      <TouchableOpacity
        onPress={() => router.push("/profile")}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "#007BFF",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/")}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "#007BFF",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
