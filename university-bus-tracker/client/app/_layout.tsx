import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

export default function Layout() {
  const isDark = useColorScheme() === "dark";

  return (
    <>
      {/* 👇 Global StatusBar ที่ทุกหน้าจะ inherit */}
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={isDark ? "#0f172a" : "#f8fafc"}
      />

      {/* 👇 ตรงนี้คือที่ render หน้าแต่ละหน้า */}
      <Slot />
    </>
  );
}
