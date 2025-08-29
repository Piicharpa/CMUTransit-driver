import { Stack, Link, usePathname } from "expo-router";
import {
  View,
  Text,
  Pressable,
  Platform,
  useColorScheme,
  Animated,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRef, useEffect } from "react";

// --- Types ---
type NavHref =
  | "/driver"
  | "/driver/scanner"
  | "/driver/profile"
  | "/driver/history";

interface NavItem {
  href: NavHref;
  label: string;
  icon: string;
}

// --- NavBar Styles ---
const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 8,
  },
  navbarTop: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 12,
  },
  navbarBottom: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 8,
    paddingBottom: Platform.OS === "ios" ? 20 : 12,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 4,
  },
});

// --- Layout Component ---
export default function Layout() {
  const isWeb = Platform.OS === "web";
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const isDark = colorScheme === "dark";

  const navItems: NavItem[] = [
    { href: "/driver", label: "หน้าหลัก" },
    { href: "/driver/scanner", label: "แสกนเพื่อขับ/ออกจากรถ" },
    { href: "/driver/profile", label: "โปรไฟล์" },
    { href: "/driver/history", label: "ประวัติการขับรถ" },
  ];

  // Animated values สำหรับทุก tab
  const animatedValues = useRef(
    navItems.map((item) => new Animated.Value(pathname === item.href ? 1 : 0))
  ).current;

  useEffect(() => {
    navItems.forEach((item, index) => {
      const isSelected = pathname === item.href;
      Animated.spring(animatedValues[index], {
        toValue: isSelected ? 1 : 0,
        useNativeDriver: true,
        stiffness: 150,
        damping: 20,
      }).start();
    });
  }, [pathname]);

  // --- NavBar ---
  const NavBar = () => {
    const navbarStyle = {
      ...styles.navbar,
      ...(isWeb ? styles.navbarTop : styles.navbarBottom),
      backgroundColor: isDark ? "#8B008B" : "#C954D3",
    };

    return (
      <View style={navbarStyle}>
        {navItems.map((item, index) => {
          const animatedValue = animatedValues[index];
          const isSelected = pathname === item.href;

          // label slide + fade
          const labelStyle = {
            opacity: animatedValue,
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0],
                }),
              },
            ],
          };

          // icon scale
          const scaleStyle = {
            transform: [
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.2],
                }),
              },
            ],
          };

          return (
            <Link key={item.href} href={item.href} asChild>
              <Pressable
                style={{
                  ...styles.navItem,
                  backgroundColor: isSelected ? "white" : "transparent",
                  borderRadius: 10,
                  paddingVertical: 6,
                  alignItems: "center",
                }}
              >
                <Animated.View style={scaleStyle}>
                  <Text
                    style={{
                      color: isSelected ? "#C954D3" : "white",
                      fontSize: 20,
                    }}
                  >
                    🔹
                  </Text>
                </Animated.View>
                <Animated.Text style={[{ fontWeight: "bold" }, labelStyle]}>
                  {item.label}
                </Animated.Text>
              </Pressable>
            </Link>
          );
        })}
      </View>
    );
  };

  // --- Layout Render ---
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={["top", "bottom"]}
        style={{ flex: 1, backgroundColor: "transparent" }}
      >
        {isWeb && <NavBar />}
        <View style={{ flex: 1, backgroundColor: "transparent" }}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
        </View>
        {!isWeb && <NavBar />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
