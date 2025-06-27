import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import FavouriteStarButton from "./FavouriteStarButton";
import RestaurantNavbar from "./RestaurantNavbar";
import { Stack } from "expo-router";

export default function LayoutContent() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FavouriteStarButton />
        <View style={styles.stackContainer}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
        <RestaurantNavbar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(254, 180, 8, 0.7)",
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  stackContainer: {
    maxHeight: "100%",
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
});
