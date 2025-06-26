import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CloseButtonProps {
  setComponent: React.Dispatch<
    React.SetStateAction<{ isComponentPageOpen: boolean }>
  >;
  pageName: string;
}

export default function CloseButton({
  setComponent,
  pageName,
}: CloseButtonProps) {
  return (
    <TouchableOpacity
      style={styles.abort}
      onPress={() => {
        const pageNameCapitalised =
          pageName.charAt(0).toUpperCase() + pageName.slice(1);
        const key = `is${pageNameCapitalised}PageOpen`;
        setComponent((prev) => ({ ...prev, [key]: false }));
      }}
    >
      <Text style={{ color: "black", textAlign: "center" }}>X</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  abort: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});
