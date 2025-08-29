import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  navbarTop: {
    borderBottomWidth: 1,
    borderBottomColor: "#0056CC",
  },
  navbarBottom: {
    borderTopWidth: 1,
    borderTopColor: "#0056CC",
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  link: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: 'center',
  },
  scannerText: {
    fontSize: 12, // Smaller font for the longer text
    lineHeight: 16,
  },
});