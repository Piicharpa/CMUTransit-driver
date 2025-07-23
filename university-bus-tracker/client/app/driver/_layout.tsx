import { Stack ,Link } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      {/* ✅ Navbar */}
      <View style={styles.navbar}>
        <Link href="/driver" asChild>
          <Pressable>
            <Text style={styles.link}>Home</Text>
          </Pressable>
        </Link>
        <Link href="/driver/scanner" asChild>
          <Pressable>
            <Text style={styles.link}>QR Scan</Text>
          </Pressable>
        </Link>
        <Link href="/driver/profile" asChild>
          <Pressable>
            <Text style={styles.link}>Profile</Text>
          </Pressable>
        </Link>
        <Link href="/driver/history" asChild>
          <Pressable>
            <Text style={styles.link}>History</Text>
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
