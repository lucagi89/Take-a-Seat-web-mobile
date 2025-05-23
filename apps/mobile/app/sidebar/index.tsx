import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "../../styles/main-page-style";
import SidebarLinks from "./SidebarLinks";
import SidebarFooter from "./SidebarFooter";

const Sidebar = ({
  user,
  userData,
  router,
}: {
  user: any;
  userData: any;
  router: any;
}) => {
  return (
    <View style={styles.containerPage}>
      <TouchableOpacity
        style={[
          styles.overlay,
          // {
          //   display: sidebarVisible ? "flex" : "none", // toggle visibility
          // },
        ]}
        onPress={() => {
          router.push("/");
        }}
        activeOpacity={1}
      />

      <View style={[styles.sidebar]}>
        <View style={styles.sidebarGradient}>
          <View style={styles.sidebarHeader}>
            <View>
              {userData?.photoURL ? (
                <Image
                  source={{ uri: userData.photoURL }}
                  style={styles.profileImage}
                />
              ) : (
                <Ionicons name="person-circle" size={70} color="#FFCA28" />
              )}
            </View>
            <Text style={styles.sidebarText}>
              HI, {userData?.name || user?.displayName || "Guest"}
            </Text>
          </View>
        </View>

        <SidebarLinks userData={userData} router={router} />
        <SidebarFooter />
      </View>
    </View>
  );
};

export default Sidebar;
