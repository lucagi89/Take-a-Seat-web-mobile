import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link, usePathname } from "expo-router";
import { useRestaurant } from "../../../../contexts/RestaurantContext";

export default function RestaurantNavbar() {
  const pathname = usePathname();
  const { restaurantId } = useRestaurant();

  const tabs = ["info", "tables", "dishes", "reviews"];

  return (
    <View style={styles.navbar}>
      {tabs.map((tab) => {
        const isActive =
          tab === "info"
            ? pathname === `/restaurant/${restaurantId}`
            : pathname.includes(`/restaurant/${restaurantId}/${tab}`);

        const href =
          tab === "info"
            ? `/restaurant/${restaurantId}`
            : `/restaurant/${restaurantId}/${tab}`;

        return (
          <Link
            key={tab}
            href={href}
            style={[styles.navItem, isActive && styles.activeNavItem]}
          >
            <Text style={[styles.navText, isActive && styles.activeNavText]}>
              {tab.toUpperCase()}
            </Text>
          </Link>
        );
      })}

      <Link
        href="/"
        style={[
          styles.navItem,
          (pathname === "/" || pathname === "") && styles.activeNavItem,
        ]}
      >
        <Text
          style={[
            styles.navText,
            (pathname === "/" || pathname === "") && styles.activeNavText,
          ]}
        >
          X
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#2E7D32",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 50,
    zIndex: 10,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  navItem: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  navText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  activeNavItem: {
    backgroundColor: "#FFCA28",
  },
  activeNavText: {
    color: "#2E7D32",
    fontWeight: "700",
  },
});
