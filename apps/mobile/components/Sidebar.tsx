import React from "react";
import { useEffect } from "react";
import { View, Text, TouchableOpacity, Pressable, Image } from "react-native";

import { styles } from "../styles/main-page-style";
// import { useRouter } from "expo-router";

interface SidebarProps {
  setVisible: (visible: boolean) => void;
  setComponents?: (components: {
    isProfilePageOpen: boolean;
    isSettingsPageOpen: boolean;
    isAboutPageOpen: boolean;
    isHelpPageOpen: boolean;
    isFavouritesPageOpen: boolean;
    isNotificationsPageOpen: boolean;
    isBookingsPageOpen: boolean;
  }) => void;
  userProfilePicture?: string;
}

type ComponentKey =
  | "isProfilePageOpen"
  | "isSettingsPageOpen"
  | "isAboutPageOpen"
  | "isHelpPageOpen"
  | "isFavouritesPageOpen"
  | "isNotificationsPageOpen"
  | "isBookingsPageOpen";

const menuItems: {
  label: string;
  componentKey: ComponentKey;
}[] = [
  { label: "Profile", componentKey: "isProfilePageOpen" },
  { label: "Settings", componentKey: "isSettingsPageOpen" },
  { label: "About", componentKey: "isAboutPageOpen" },
  { label: "Help", componentKey: "isHelpPageOpen" },
  {
    label: "Favourites",
    componentKey: "isFavouritesPageOpen",
  },
  {
    label: "Notifications",
    componentKey: "isNotificationsPageOpen",
  },
  {
    label: "Bookings",
    componentKey: "isBookingsPageOpen",
  },
];

export default function Sidebar({
  setVisible,
  setComponents,
  userProfilePicture,
}: SidebarProps) {
  const setOnlyComponent = (key: ComponentKey) => {
    if (!setComponents) return;

    const allKeys: ComponentKey[] = [
      "isProfilePageOpen",
      "isSettingsPageOpen",
      "isAboutPageOpen",
      "isHelpPageOpen",
      "isFavouritesPageOpen",
      "isNotificationsPageOpen",
      "isBookingsPageOpen",
    ];

    const state = allKeys.reduce((acc, k) => {
      acc[k] = k === key;
      return acc;
    }, {} as Record<ComponentKey, boolean>);

    setComponents(state);
  };

  return (
    <>
      {/* Full-screen overlay */}
      <Pressable
        onPress={() => setVisible(false)}
        style={styles.sidebarOverlay}
      />

      {/* Sidebar content */}
      <View style={styles.sidebarContent}>
        {userProfilePicture && userProfilePicture?.startsWith("http") ? (
          <Image
            source={{ uri: userProfilePicture }}
            style={styles.image}
            onError={(e) =>
              console.log("Error loading image:", e.nativeEvent.error)
            }
          />
        ) : (
          <View style={styles.placeholder}>
            <Text>No Photo</Text>
          </View>
        )}

        {menuItems.map(({ label, componentKey }) => (
          <TouchableOpacity
            key={componentKey}
            style={styles.menuItem}
            onPress={() => {
              setOnlyComponent(componentKey);
              setVisible(false);
            }}
          >
            <Text>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
