import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CloseButton from "./CloseButton";

interface AboutProps {
  setComponent: React.Dispatch<
    React.SetStateAction<{ isAboutPageOpen: boolean }>
  >;
}

export default function About({ setComponent }: AboutProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Take a Seat</Text>
      <Text style={styles.description}>
        Take a Seat is a mobile application designed to help users find and book
        restaurants easily. Our mission is to connect food lovers with the best
        dining experiences in their area.
      </Text>
      <Text style={styles.version}>Version 1.0.0</Text>
      <CloseButton setComponent={setComponent} pageName="About" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  version: {
    fontSize: 14,
    color: "#888",
  },
  abort: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});
