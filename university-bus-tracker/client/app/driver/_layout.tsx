import { Stack, Link } from "expo-router";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";

export default function Layout() {
  const isWeb = Platform.OS === 'web';
  
  const NavBar = () => (
    <View style={[styles.navbar, isWeb ? styles.navbarTop : styles.navbarBottom]}>
      <Link href="/driver" asChild>
        <Pressable style={styles.navItem}>
          <Text style={styles.link}>หน้าหลัก</Text>
        </Pressable>
      </Link>
      <Link href="/driver/scanner" asChild>
        <Pressable style={styles.navItem}>
          <Text style={[styles.link, styles.scannerText]}>แสกนเพื่อขับ/ออกจากรถ</Text>
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

const styles = StyleSheet.create({
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