import React, { useMemo, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  Alert,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import MapView, { Marker, Callout } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useUser } from "../contexts/userContext";
import { useLocation } from "../hooks/useLocation";
import { useRestaurants } from "../hooks/useRestaurants";
import { fetchUserData } from "../services/databaseActions";
import { styles } from "../styles/main-page-style";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Settings from "./Settings";
import About from "./About";
import Help from "./Help";
import Favourites from "./Favourites";
import Notifications from "./Notifications";
// import Bookings from "./Bookings";

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export default function Map() {
  const router = useRouter();
  const { user, userData, loading } = useUser();
  const fallbackRegion: Region = {
    latitude: 51.5074,
    longitude: -0.1278,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [openComponents, setOpenComponents] = useState({
    isProfilePageOpen: false,
    isSettingsPageOpen: false,
    isAboutPageOpen: false,
    isHelpPageOpen: false,
    isFavouritesPageOpen: false,
    isNotificationsPageOpen: false,
    isBookingsPageOpen: false,
  });

  const [profilePicture, setProfilePicture] = useState<string | undefined>();

  useEffect(() => {
    if (userData?.photoURL && userData.photoURL.startsWith("http")) {
      Image.prefetch(userData.photoURL);
      setProfilePicture(userData.photoURL);
    }
  }, [userData?.photoURL]);

  const closeEveryPage = () => {
    setOpenComponents({
      isProfilePageOpen: false,
      isSettingsPageOpen: false,
      isAboutPageOpen: false,
      isHelpPageOpen: false,
      isFavouritesPageOpen: false,
      isNotificationsPageOpen: false,
      isBookingsPageOpen: false,
    });
    setSidebarVisible(false);
  };

  const renderActiveComponent = () => {
    if (openComponents.isProfilePageOpen)
      return <Profile setComponent={setOpenComponents} />;
    if (openComponents.isSettingsPageOpen)
      return <Settings setComponent={setOpenComponents} />;
    if (openComponents.isAboutPageOpen)
      return <About setComponent={setOpenComponents} />;
    if (openComponents.isHelpPageOpen)
      return <Help setComponent={setOpenComponents} />;
    if (openComponents.isFavouritesPageOpen)
      return <Favourites setComponent={setOpenComponents} />;
    if (openComponents.isNotificationsPageOpen)
      return <Notifications setComponent={setOpenComponents} />;
    if (openComponents.isBookingsPageOpen)
      return <Bookings setComponent={setOpenComponents} />;
    return null;
  };

  const activeComponent = renderActiveComponent();

  const { region, setRegion, loading: locationLoading } = useLocation();

  const [mapRegion, setMapRegion] = useState<Region | null>(
    region || fallbackRegion
  );

  const { visibleRestaurants } = useRestaurants(mapRegion ?? region);

  useEffect(() => {
    if (region) {
      setMapRegion(region);
    }
  }, [region]);

  const restaurantSelectionHandler = async (restaurantId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }
    const userHasData = await fetchUserData(user.uid);
    if (userHasData) {
      router.replace(`/restaurant/${restaurantId}`);
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
    <TouchableWithoutFeedback
      onPress={() => {
        closeEveryPage();
      }}
    >
      <View style={styles.container}>
        {!isSidebarVisible && !activeComponent && (
          <View style={styles.menuButtonWrapper}>
            <Ionicons
              name="menu"
              size={32}
              color="white"
              onPress={() => setSidebarVisible((prev) => !prev)}
            />
          </View>
        )}

        {mapRegion && (
          <>
            <MapView
              style={styles.map}
              showsUserLocation
              showsMyLocationButton
              showsCompass
              region={mapRegion}
              onRegionChangeComplete={(newRegion) => {
                setMapRegion(newRegion);
                setRegion(newRegion); // if you still want to sync with global location state
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
                      restaurantSelectionHandler(restaurant.id);
                    }}
                  >
                    <View>
                      <Text style={styles.calloutTitle}>{restaurant.name}</Text>
                      <Text>{restaurant.streetAddress}</Text>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>
          </>
        )}

        {isSidebarVisible && (
          <Sidebar
            setVisible={setSidebarVisible}
            setComponents={setOpenComponents}
            userProfilePicture={profilePicture}
          />
        )}

        {activeComponent && (
          <View style={styles.componentContainer}>{activeComponent}</View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
