import { Stack, Link } from "expo-router";
import { View, Text, Pressable, StyleSheet, Platform, useWindowDimensions } from "react-native";

export default function Layout() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768; // Consider tablets and desktops as large screens

  const NavBar = () => (
    <View style={styles.navbar}>
      <Link href="/student" asChild>
        <Pressable style={styles.navItem}>
          <Text style={styles.link}>Home</Text>
        </Pressable>
      </Link>
      <Link href="/student/dashboard" asChild>
        <Pressable style={styles.navItem}>
          <Text style={styles.link}>Dashboard</Text>
        </Pressable>
      </Link>
      <Link href="/student/history" asChild>
        <Pressable style={styles.navItem}>
          <Text style={styles.link}>History</Text>
        </Pressable>
      </Link>
    </View>
  );

  if (isLargeScreen || Platform.OS === 'web') {
    // Large screen/Web layout - navbar on top
    return (
      <View style={{ flex: 1 }}>
        <NavBar />
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </View>
    );
  }

  // Mobile layout - navbar on bottom
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    ...(Platform.OS !== 'web' && { paddingBottom: 34 }),
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  link: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});