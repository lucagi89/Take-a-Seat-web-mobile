// import React from "react";
// import { View, Text, Image, StyleSheet, Pressable } from "react-native";
// import { useRestaurant } from "../../../contexts/RestaurantContext";
// import FavouriteStarButton from "./components/FavouriteStarButton";

// // type Restaurant = {
// //   name: string;
// //   description: string;
// //   address: string;
// //   imageUrls: string[];
// // };

// export default function Info() {
//   const restaurantContext = useRestaurant();
//   const restaurant = restaurantContext ? restaurantContext.restaurant : null;
//   const { name, description, address, imageUrls } = restaurant || {};

//   if (!restaurant) return <Text>Loading Info...</Text>;

//   return (
//     <View style={styles.container}>
//       <FavouriteStarButton />
//       <Text style={styles.title}>{name}</Text>
//       <Text>{description}</Text>
//       <Text>{address}</Text>
//       <View style={styles.imageContainer}>
//         {imageUrls && imageUrls.length > 0 ? (
//           imageUrls.map((url, index) => (
//             <Pressable key={index} onPress={() => console.log("Image clicked")}>
//               <Image
//                 key={index}
//                 source={{ uri: url }}
//                 style={styles.image}
//                 resizeMode="cover"
//               />
//             </Pressable>
//           ))
//         ) : (
//           <Text>No images available</Text>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, height: 800 },
//   title: { fontSize: 24, fontWeight: "bold" },
//   imageContainer: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-around",
//     flexWrap: "wrap",
//     marginVertical: 10,
//     gap: 10,
//   },
//   image: { width: 150, height: 150, marginVertical: 10 },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";
import { useRestaurant } from "../../../contexts/RestaurantContext";
import FavouriteStarButton from "./components/FavouriteStarButton";

const { width, height } = Dimensions.get("window");

export default function Info() {
  const restaurantContext = useRestaurant();
  const restaurant = restaurantContext ? restaurantContext.restaurant : null;
  const { name, description, address, imageUrls } = restaurant || {};

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openCarousel = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  if (!restaurant) return <Text>Loading Info...</Text>;

  return (
    <View style={styles.container}>
      <FavouriteStarButton />
      <Text style={styles.title}>{name}</Text>
      <Text>{description}</Text>
      <Text>{address}</Text>
      <View style={styles.imageContainer}>
        {imageUrls && imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <Pressable key={index} onPress={() => openCarousel(index)}>
              <Image
                source={{ uri: url }}
                style={styles.image}
                resizeMode="cover"
              />
            </Pressable>
          ))
        ) : (
          <Text>No images available</Text>
        )}
      </View>

      {/* Fullscreen Carousel Modal */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalOverlay}>
          <FlatList
            data={imageUrls}
            horizontal
            pagingEnabled
            initialScrollIndex={selectedIndex}
            keyExtractor={(_, index) => index.toString()}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={styles.carouselImageContainer}>
                <Image
                  source={{ uri: item }}
                  style={styles.carouselImage}
                  resizeMode="contain"
                />
              </View>
            )}
          />
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>✕</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, height: 600 },
  title: { fontSize: 24, fontWeight: "bold" },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginVertical: 10,
    gap: 10,
  },
  image: { width: 150, height: 150, marginVertical: 10 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImageContainer: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: width,
    height: height,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
  closeText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
});
