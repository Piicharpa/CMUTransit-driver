import { Stack, Link } from "expo-router";
import { View, Text, Pressable, Platform } from "react-native";
import { styles } from "../theme/driver_theme/layout";

export default function Layout() {
  const isWeb = Platform.OS === "web";

  const NavBar = () => (
    <View
      style={[styles.navbar, isWeb ? styles.navbarTop : styles.navbarBottom]}
    >
      <Link href="/driver" asChild>
        <Pressable style={styles.navItem}>
          <Text style={styles.link}>หน้าหลัก</Text>
        </Pressable>
      </Link>
      <Link href="/driver/scanner" asChild>
        <Pressable style={styles.navItem}>
          <Text style={[styles.link, styles.scannerText]}>
            แสกนเพื่อขับ/ออกจากรถ
          </Text>
        </Pressable>
      </Link>
      <Link href="/driver/profile" asChild>
        <Pressable style={styles.navItem}>
          <Text style={styles.link}>โปรไฟล์</Text>
        </Pressable>
      </Link>
      <Link href="/driver/history" asChild>
        <Pressable style={styles.navItem}>
          <Text style={styles.link}>ประวัติการขับรถ</Text>
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
