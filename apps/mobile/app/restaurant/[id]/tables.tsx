import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import RestaurantFloorPlan from "@/components/RestaurantFloorPlan";
import TableList from "@/components/TableList";
import { useRestaurant } from "../../../contexts/RestaurantContext";
import { useRestaurantTables } from "@/hooks/useRestaurantTables";
import { useUser } from "../../../contexts/userContext";

export default function Tables() {
  const { restaurant, restaurantId } = useRestaurant();
  const { tables, loading } = useRestaurantTables(restaurantId);
  const { user } = useUser();
  const isOwner = user?.uid === restaurant?.userId;

  const [restaurantListView, setRestaurantListView] = React.useState(true);

  if (!restaurant) return <Text>Loading Tables...</Text>;

  const handleSwitchView = () => {
    setRestaurantListView((prev) => !prev);
  };

  // const handleBooking = (tableId) => {
  //   // Handle table booking logic here
  //   console.log(`Table ${tableId} booked`);
  // };

  return (
    <View style={styles.container}>
      {!restaurantListView ? (
        <RestaurantFloorPlan
          restaurant={restaurant}
          restaurantId={restaurantId}
          tables={tables}
          isOwner={isOwner}
        />
      ) : (
        <TableList
        // restaurantId={restaurantId}
        // tables={tables}
        // isOwner={isOwner}
        />
      )}
      <TouchableOpacity
        onPress={() => handleSwitchView()}
        style={styles.switch}
      >
        <Text
          style={[
            styles.buttonSwitch,
            restaurantListView ? styles.lighter : styles.darker,
          ]}
        >
          List
        </Text>
        <Text
          style={[
            styles.buttonSwitch,
            !restaurantListView ? styles.lighter : styles.darker,
          ]}
        >
          Floorplan
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 100,
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    borderWidth: 5,
    borderColor: "#ccc",
    flex: 1,
  },
  switch: {
    margin: "auto",
    width: "80%",
    // height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 10,
    borderRadius: 5,
    // marginTop: 40,
    // marginBottom: 10,
  },
  buttonSwitch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  lighter: {
    backgroundColor: "#f0f0f0",
  },
  darker: {
    backgroundColor: "#ccc",
  },
});
