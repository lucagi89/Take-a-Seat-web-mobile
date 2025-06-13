import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import MapView, { Marker, Callout } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useUser } from "../contexts/userContext";
import { useLocation } from "../hooks/useLocation";
import { useRestaurants } from "../hooks/useRestaurants";
import { fetchUserData } from "../services/databaseActions";
import { useSidebarAnimation } from "../hooks/useSidebarAnimation";
// import { Sidebar } from "../app/sidebar/Sidebar";
import { styles } from "../styles/main-page-style";

export default function Map() {
  const router = useRouter();
  const { user, userData, loading } = useUser();
  const { region, setRegion, loading: locationLoading } = useLocation();
  const { visibleRestaurants } = useRestaurants(region);

  const restaurantSelectionHandler = async (restaurantId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }
    const userHasData = await fetchUserData(user.uid);
    if (userHasData) {
      router.push(`/restaurant/${restaurantId}`);
    } else {
      Alert.alert("Complete Profile", "Please complete your profile.");
      router.push("/complete-profile");
    }
  };

  if (loading || locationLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#FFCA28" />
      </SafeAreaView>
    );
  }

  return (
    // <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      {region && (
        <>
          <MapView
            style={styles.map}
            showsUserLocation
            showsMyLocationButton
            showsCompass
            region={region}
            onRegionChangeComplete={(newRegion) => {
              setRegion(newRegion);
            }}
          >
            {visibleRestaurants.map((restaurant) => (
              <Marker
                key={restaurant.id}
                coordinate={{
                  latitude: restaurant.latitude,
                  longitude: restaurant.longitude,
                }}
                pinColor={restaurant.isAvailable ? "green" : "red"}
              >
                <Callout
                  tooltip={false}
                  onPress={() => {
                    alert(
                      `You selected ${restaurant.name}. This will navigate you to the restaurant details page.`
                    );
                    restaurantSelectionHandler(restaurant.id);
                  }}
                >
                  <View>
                    <Text style={styles.calloutTitle}>{restaurant.name}</Text>
                    <Text>{restaurant.streetAddress}</Text>
                    <Text>
                      {[
                        restaurant.cuisine_one,
                        restaurant.cuisine_two,
                        restaurant.cuisine_three,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>

          <View
            pointerEvents="box-none"
            style={{
              position: "absolute",
              top: 50,
              left: 20,
              zIndex: 999,
            }}
          >
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => console.log("Menu button pressed")}
            >
              <Ionicons name="menu" size={32} color="white" />
            </TouchableOpacity>
          </View>
          {/* <Sidebar user={user} userData={userData} router={router} /> */}
        </>
      )}
    </View>
    // </SafeAreaView>
  );
}
