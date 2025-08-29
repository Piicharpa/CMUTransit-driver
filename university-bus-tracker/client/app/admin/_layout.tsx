import { Stack, Link } from "expo-router";
import { View, Text, Pressable, Platform } from "react-native";
import { styles } from "../theme/admin_theme/layout";

export default function Layout() {
  const isWeb = Platform.OS === "web";

  const NavBar = () => (
    <View
      style={[styles.navbar, isWeb ? styles.navbarTop : styles.navbarBottom]}
    >
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
