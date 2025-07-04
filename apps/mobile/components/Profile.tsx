import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useUser } from "../contexts/userContext";
import { Redirect, Link } from "expo-router";
import { getUserRestaurants } from "../services/databaseActions";
import { useRouter } from "expo-router";
import { deleteUser } from "../services/databaseActions";
import CloseButton from "./CloseButton";

interface UserData {
  name: string;
  photoURL?: string;
  isProfileComplete?: boolean;
}

interface ProfileProps {
  setComponent: React.Dispatch<
    React.SetStateAction<{ isComponentPageOpen: boolean }>
  >;
}

export default function Profile({ setComponent }: ProfileProps) {
  const { user, loading, userData } = useUser();
  const [userRestaurants, setUserRestaurants] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getUserRestaurants(user.uid).then((result) => {
        setUserRestaurants(result);
      });
    }
  }, [user]);

  const deleteAccount = async () => {
    try {
      await deleteUser(user.uid);
      router.push("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Hello {userData?.name ? userData.name : user.email}
        </Text>

        {userData?.photoURL && userData.photoURL.startsWith("http") ? (
          <Image
            source={{ uri: userData.photoURL }}
            style={styles.profileImage}
            onError={(e) =>
              console.log("Image load error:", e.nativeEvent.error)
            }
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Photo</Text>
          </View>
        )}

        <Text style={styles.subtitle}>This is your profile page.</Text>

        <TouchableOpacity style={styles.linkButton}>
          <Link href="/complete-profile" style={styles.linkText}>
            {userData?.isProfileComplete ? "Edit Profile" : "Complete Profile"}
          </Link>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteAccount}
          onPress={() => deleteAccount()}
        >
          <Text style={styles.linkText}>Cancel Account</Text>
        </TouchableOpacity>

        <CloseButton setComponent={setComponent} pageName="Profile" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.37)", // Slightly more opaque
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    height: "90%",
    width: "100%",
    maxWidth: 500,
    alignItems: "center",
    position: "relative",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 15,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#FFCA28",
    marginVertical: 15,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  placeholderText: {
    color: "#757575",
    fontSize: 14,
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
  linkButton: {
    backgroundColor: "#FFCA28",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  deleteAccount: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  linkText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    textDecorationLine: "none",
  },
  abort: {
    backgroundColor: "#FFCA28",
    position: "absolute",
    bottom: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 50,
    marginTop: 20,
  },
});
