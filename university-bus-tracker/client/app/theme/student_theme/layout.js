import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 4,
  },
  navbarTop: {
    borderBottomWidth: 1,
    borderBottomColor: "#AA00AA",
    paddingVertical: 12,
  },
  navbarBottom: {
    borderTopWidth: 1,
    borderTopColor: "#AA00AA",
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  link: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: 'center',
  },
});
