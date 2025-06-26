import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Help() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help</Text>
      <Text style={styles.description}>
        If you need assistance, please contact our support team at
        support@takeaseat.com.
      </Text>
      <Text style={styles.description}>
        You can also visit our FAQ section for common questions and answers.
      </Text>
      <Text style={styles.version}>Version 1.0.0</Text>
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
});
