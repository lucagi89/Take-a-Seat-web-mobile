// app/_layout.tsx
import React from "react";
import { Slot } from "expo-router";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Map from "../components/map";
import { UserContextProvider } from "../contexts/userContext";
import AuthGate from "@/contexts/AuthGate";
import { useRouter } from "expo-router";
import { usePathname } from "expo-router";

export default function RootLayout() {
  const pathname = usePathname();
  const router = useRouter();

  const isRoot = pathname === "/";
  const menuOpen = pathname === "/menu";
  console.log("Current path:", usePathname());

  return (
    <UserContextProvider>
      <AuthGate>
        <View style={styles.container}>
          <Slot />
        </View>
      </AuthGate>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayWrapper: {
    ...StyleSheet.absoluteFillObject,
    // zIndex: 0,
  },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "stretch",
    padding: 20,
  },
});
