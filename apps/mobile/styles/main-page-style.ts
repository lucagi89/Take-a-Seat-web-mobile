import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",},
  container: { flex: 1 },
  map: { flex: 1 },
  slotContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  searchButton: {
    position: "absolute",
    bottom: 90,
    alignSelf: "center",
    backgroundColor: "#2E7D32",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    textTransform: "uppercase",
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2E7D32",
    marginBottom: 4,
  },
  menuButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FFCA28",
    zIndex: 999,
    padding: 12,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  ownerButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#FFCA28",
    padding: 12,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  icon: { marginRight: 10 },
  divider: { height: 1, backgroundColor: "#E0E0E0", marginVertical: 5 },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D32F2F",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: "center",
  },
  logoutText: { fontSize: 16, color: "#FFFFFF", fontWeight: "600" },
 sidebarOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  zIndex: 998,
},

sidebarContent: {
  position: "absolute",
  top: 55,
  left: 0,
  width: 250,
  height: "85%", // Fill full height of screen if needed
  backgroundColor: "#ccc",
  zIndex: 999,
  padding: 20,
  borderRightWidth: 2,
  borderColor: "#ccc",
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
},

image: {
  width: 80,
  height: 80,
  borderRadius: 40,
  marginBottom: 20,
},



menuItem: {
  fontSize: 18,
  marginBottom: 20,
},

menuButtonWrapper: {
  position: "absolute",
  bottom: 50,
  right: 20,
  zIndex: 1000,
  backgroundColor: "rgba(0,0,0,0.5)",
  borderRadius: 20,
  padding: 5,
},

componentContainer: {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: [{ translateX: -170 }, { translateY: -370 }], // adjust based on size
  width: 340, // required for horizontal centering
  height: 740, // or any fixed/dynamic height
  backgroundColor: "#ccc",
  zIndex: 999,
  padding: 20,
  borderRightWidth: 2,
  borderColor: "#ccc",
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
},

});
