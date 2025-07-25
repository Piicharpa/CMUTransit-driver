import { Stack ,Link } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      {/* ✅ Navbar */}
      <View style={styles.navbar}>
        <Link href="/admin" asChild>
          <Pressable>
            <Text style={styles.link}>หน้าหลัก</Text>
          </Pressable>
        </Link>
        <Link href="/admin/all_report" asChild>
          <Pressable>
            <Text style={styles.link}>รายงานทั้งหมด</Text>
          </Pressable>
        </Link>
        <Link href="/admin/driver_dashboard" asChild>
          <Pressable>
            <Text style={styles.link}>จัดการคนขับ</Text>
          </Pressable>
        </Link>
        <Link href="/admin/route" asChild>
          <Pressable>
            <Text style={styles.link}>จัดการสายรถ</Text>
          </Pressable>
        </Link>
      </View>

      {/* ✅ Page Content */}
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
  },
  link: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
