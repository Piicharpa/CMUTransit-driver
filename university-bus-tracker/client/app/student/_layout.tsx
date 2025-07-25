import { Stack, Link } from "expo-router";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from "react-native";

export default function Layout() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768; // Consider tablets and desktops as large screens

  const NavBar = () => (
    <View
      style={[
        styles.navbar,
        isLargeScreen || Platform.OS === "web"
          ? styles.navbarTop
          : styles.navbarBottom,
      ]}
    >
      <Link href="/student" asChild>
        <Pressable style={styles.navItem}>
          <Text style={styles.link}>หน้าหลัก</Text>
        </Pressable>
      </Link>
      <Link href="/student/dashboard" asChild>
        <Pressable style={styles.navItem}>
          <Text style={styles.link}>เลือกสายรถม่วง</Text>
        </Pressable>
      </Link>
      <Link href="/student/history" asChild>
        <Pressable style={styles.navItem}>
          <Text style={styles.link}>ประวัติการรายงาน</Text>
        </Pressable>
      </Link>
    </View>
  );

  if (isLargeScreen || Platform.OS === "web") {
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
    paddingHorizontal: 8,
  },
  navbarTop: {
    borderBottomWidth: 1,
    borderBottomColor: "#0056CC",
    paddingTop: Platform.OS === "web" ? 12 : 16,
  },
  navbarBottom: {
    borderTopWidth: 1,
    borderTopColor: "#0056CC",
    paddingBottom: Platform.OS === "ios" ? 34 : 16, // Better safe area handling
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  link: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
