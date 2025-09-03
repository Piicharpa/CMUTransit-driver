import { Stack, Link, usePathname } from "expo-router";
import {
  View,
  Pressable,
  Platform,
  useColorScheme,
  Animated,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useRef, useEffect } from "react";
import { styles } from "../theme/student_theme/layout";
// Import icons from @expo/vector-icons
import { Ionicons, MaterialIcons, FontAwesome5, FontAwesome } from "@expo/vector-icons";

// --- Types ---
type NavHref =
  | "/student"
  | "/student/dashboard"
  | "/student/history"
  | "/student/student_profile";

interface NavItem {
  href: NavHref;
  label: string;
  iconName: string;
  iconFamily: "Ionicons" | "MaterialIcons" | "FontAwesome5" | "FontAwesome";
}

// --- Layout Component ---
export default function Layout() {
  const isWeb = Platform.OS === "web";
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const isDark = colorScheme === "dark";

  const navItems: NavItem[] = [
    {
      href: "/student",
      label: "หน้าหลัก",
      iconName: "home",
      iconFamily: "Ionicons",
    },
    {
      href: "/student/dashboard",
      label: "รายงานทั้งหมด",
      iconName: "report",
      iconFamily: "MaterialIcons",
    },
    {
      href: "/student/history",
      label: "ประวัติรายงาน",
      iconName: "history",
      iconFamily: "FontAwesome5",
    },
    {
      href: "/student/student_profile",
      label: "โปรไฟล์",
      iconName: "user-o",
      iconFamily: "FontAwesome",
    },
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

  // Function to render icon based on family
  const renderIcon = (item: NavItem, isSelected: boolean) => {
    const iconColor = isSelected ? "black" : "white";
    const iconSize = 24;

    switch (item.iconFamily) {
      case "Ionicons":
        return (
          <Ionicons
            name={item.iconName as any}
            size={iconSize}
            color={iconColor}
          />
        );
      case "MaterialIcons":
        return (
          <MaterialIcons
            name={item.iconName as any}
            size={iconSize}
            color={iconColor}
          />
        );
      case "FontAwesome5":
        return (
          <FontAwesome5
            name={item.iconName as any}
            size={iconSize}
            color={iconColor}
          />
        );
      case "FontAwesome":
        return (
          <FontAwesome
            name={item.iconName as any}
            size={iconSize}
            color={iconColor}
          />
        );
      default:
        return <Ionicons name="help" size={iconSize} color={iconColor} />;
    }
  };

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
                  justifyContent: isSelected ? "flex-start" : "center",
                }}
              >
                <Animated.View style={[scaleStyle, { alignItems: "center" }]}>
                  {renderIcon(item, isSelected)}
                </Animated.View>
                {isSelected && (
                  <Animated.Text
                    style={[
                      {
                        fontWeight: "bold",
                        color: "black",
                        textAlign: "center",
                        marginTop: 2,
                        fontSize: 12,
                      },
                      labelStyle,
                    ]}
                  >
                    {item.label}
                  </Animated.Text>
                )}
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
