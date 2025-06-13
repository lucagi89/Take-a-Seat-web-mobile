import React from "react";
import { View, Text } from "react-native";
import { Slot } from "expo-router";

export default function AppMenuPage() {
  console.log("AppMenuPage rendered");
  return (
    <View
      style={{
        flex: 1,
        width: 200,
        height: 200,
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text>App Menu Page</Text>
      <Text>This is the menu page for the app.</Text>
      <Text>Here you can find various options and settings.</Text>
      <Text>Feel free to explore!</Text>
    </View>
  );
}
