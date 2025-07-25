import { Stack, Link } from "expo-router";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";

export default function Layout() {
  const isWeb = Platform.OS === 'web';
  
  const NavBar = () => (
    <View style={[styles.navbar, isWeb ? styles.navbarTop : styles.navbarBottom]}>
      <Link href="/admin" asChild>
        <Pressable style={styles.navItem}>
          <Text style={styles.link}>หน้าหลัก</Text>
        </Pressable>
      </Link>
      <Link href="/admin/all_report" asChild>
        <Pressable style={styles.navItem}>
          <Text style={styles.link}>รายงานทั้งหมด</Text>
        </Pressable>
      </Link>
      <Link href="/admin/driver_dashboard" asChild>
        <Pressable style={styles.navItem}>
          <Text style={styles.link}>จัดการคนขับ</Text>
        </Pressable>
      </Link>
      <Link href="/admin/route" asChild>
        <Pressable style={styles.navItem}>
          <Text style={styles.link}>จัดการสายรถ</Text>
        </Pressable>
      </Link>
    </View>
  );

  if (isWeb) {
    return (
      <View style={{ flex: 1 }}>
        {/* ✅ Navbar at top for web */}
        <NavBar />
        {/* ✅ Page Content */}
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* ✅ Page Content */}
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      {/* ✅ Navbar at bottom for mobile */}
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
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