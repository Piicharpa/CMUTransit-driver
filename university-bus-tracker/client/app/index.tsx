import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  useColorScheme,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <LoginScreen />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const colorScheme = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") router.push("/admin");
    else if (username === "driver" && password === "driver")
      router.push("/driver");
    else alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  };

  const handleStudentLogin = () => router.push("/student");

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0f172a" : "#f8fafc" },
      ]}
      edges={["top", "bottom", "left", "right"]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 16,
            paddingHorizontal: 24,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🚌</Text>
          </View>

          {/* Header */}
          <Text
            style={[styles.title, { color: isDark ? "#f1f5f9" : "#1e293b" }]}
          >
            ระบบขนส่งสาธารณะ มหาวิทยาลัยเชียงใหม่
          </Text>
          <Text
            style={[styles.subtitle, { color: isDark ? "#94a3b8" : "#64748b" }]}
          >
            เข้าสู่ระบบเพื่อใช้งาน
          </Text>
          <Text
            style={[styles.subtitle, { color: isDark ? "#94a3b8" : "#64748b" }]}
          >
            Driver {'->'} driver:driver ,Admin {'->'} admin:admin
          </Text>

          {/* Form */}
          <View style={[styles.formContainer, { marginTop: 24 }]}>
            {/* Username */}
            <View style={styles.inputGroup}>
              <Text
                style={[
                  styles.inputLabel,
                  { color: isDark ? "#e2e8f0" : "#374151" },
                ]}
              >
                👤 ชื่อผู้ใช้
              </Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "username" && styles.inputFocused,
                  {
                    backgroundColor: isDark ? "#1e293b" : "#ffffff",
                    borderColor:
                      focusedInput === "username"
                        ? "#3b82f6"
                        : isDark
                        ? "#334155"
                        : "#e2e8f0",
                    color: isDark ? "#f1f5f9" : "#1f2937",
                  },
                ]}
                placeholder="กรอกชื่อผู้ใช้"
                placeholderTextColor={isDark ? "#64748b" : "#9ca3af"}
                value={username}
                onChangeText={setUsername}
                onFocus={() => setFocusedInput("username")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text
                style={[
                  styles.inputLabel,
                  { color: isDark ? "#e2e8f0" : "#374151" },
                ]}
              >
                🔒 รหัสผ่าน
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    focusedInput === "password" && styles.inputFocused,
                    {
                      backgroundColor: isDark ? "#1e293b" : "#ffffff",
                      borderColor:
                        focusedInput === "password"
                          ? "#3b82f6"
                          : isDark
                          ? "#334155"
                          : "#e2e8f0",
                      color: isDark ? "#f1f5f9" : "#1f2937",
                    },
                  ]}
                  placeholder="กรอกรหัสผ่าน"
                  placeholderTextColor={isDark ? "#64748b" : "#9ca3af"}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                />
                <Pressable
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeIcon}>
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Login Button */}
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#2563eb" : "#3b82f6",
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                  ...styles.loginButton,
                },
              ]}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>🚀 เข้าสู่ระบบ</Text>
            </Pressable>

            {/* Divider */}
            <View style={styles.divider}>
              <View
                style={[
                  styles.dividerLine,
                  { backgroundColor: isDark ? "#334155" : "#e2e8f0" },
                ]}
              />
              <Text
                style={[
                  styles.dividerText,
                  { color: isDark ? "#64748b" : "#6b7280" },
                ]}
              >
                หรือ
              </Text>
              <View
                style={[
                  styles.dividerLine,
                  { backgroundColor: isDark ? "#334155" : "#e2e8f0" },
                ]}
              />
            </View>

            {/* Student Login Button */}
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? isDark
                      ? "#7c3aed"
                      : "#8b5cf6"
                    : isDark
                    ? "#8b5cf6"
                    : "#a855f7",
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                  ...styles.studentButton,
                },
              ]}
              onPress={handleStudentLogin}
            >
              <Text style={styles.studentButtonText}>
                🎓 สำหรับนักศึกษา
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoIcon: { fontSize: 40 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 16,
  },
  formContainer: { width: "100%", maxWidth: 400, alignSelf: "center" },
  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  input: {
    width: "100%",
    borderWidth: 2,
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  inputFocused: { borderColor: "#3b82f6" },
  passwordContainer: { position: "relative" },
  passwordInput: { paddingRight: 50 },
  eyeButton: { position: "absolute", right: 16, top: 16 },
  eyeIcon: { fontSize: 20 },
  loginButton: {
    width: "100%",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: { color: "#ffffff", fontWeight: "bold", fontSize: 18 },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 24 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { paddingHorizontal: 16, fontSize: 14, fontWeight: "500" },
  studentButton: {
    width: "100%",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  studentButtonText: { color: "#ffffff", fontWeight: "bold", fontSize: 18 },
});
