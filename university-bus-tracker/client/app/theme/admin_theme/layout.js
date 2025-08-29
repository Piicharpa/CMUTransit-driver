import { StyleSheet ,Platform } from "react-native";

export const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#007AFF",
    paddingVertical: 20,
  },
  navbarTop: {
    // Additional styles for top navbar if needed
    borderBottomWidth: 1,
    borderBottomColor: "#0056CC",
  },
  navbarBottom: {
    // Additional styles for bottom navbar
    borderTopWidth: 1,
    borderTopColor: "#0056CC",
    paddingBottom: Platform.OS === 'ios' ? 20 : 12, // Account for iOS safe area
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  link: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
  },
});