import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  useColorScheme,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { MicrosoftAuthService } from "../auth/microsoftAuth";
import { MICROSOFT_CONFIG } from "../auth/microsoft.config";
import styles from "./theme/index";

// Constants
const AUTH_STORAGE_KEY = "auth_data";

// Complete auth session setup
WebBrowser.maybeCompleteAuthSession();

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
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  const colorScheme = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  // Microsoft OAuth Discovery - auto-discover endpoints
  const discovery = AuthSession.useAutoDiscovery(
    `https://login.microsoftonline.com/${MICROSOFT_CONFIG.tenantId}/v2.0`
  );

  // Auth request configuration
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: MICROSOFT_CONFIG.clientId,
      scopes: MICROSOFT_CONFIG.scopes,
      redirectUri: MICROSOFT_CONFIG.redirectUri,
      responseType: AuthSession.ResponseType.Code, // Use authorization code flow for security
      extraParams: {
        // Force user to select account (optional)
        prompt: "select_account",
      },
    },
    discovery
  );

  // Handle OAuth response
  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      if (code) {
        handleMicrosoftAuth(code);
      } else {
        Alert.alert("ข้อผิดพลาด", "ไม่ได้รับรหัสยืนยันจาก Microsoft");
      }
    } else if (response?.type === "error") {
      console.error("OAuth Error:", response.error);
      Alert.alert(
        "เข้าสู่ระบบล้มเหลว",
        response.error?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ"
      );
    } else if (response?.type === "cancel") {
      // User cancelled the login
      console.log("User cancelled Microsoft login");
    }
  }, [response]);

  // Load stored authentication on app start
  useEffect(() => {
    loadStoredAuth();

    // Warm up browser for better UX
    if (Platform.OS !== "web") {
      WebBrowser.warmUpAsync();
      return () => {
        WebBrowser.coolDownAsync();
      };
    }
  }, []);

  const handleMicrosoftAuth = async (authCode: string) => {
    setIsLoading(true);
    try {
      // Exchange authorization code for tokens using MicrosoftAuthService
      const authData = await MicrosoftAuthService.exchangeCodeForTokens(authCode);

      if (authData.accessToken) {
        // Get user information from CMU API
        const userInfo = await MicrosoftAuthService.validateAndGetUserInfo(authData.accessToken);

        // Store auth data securely
        await MicrosoftAuthService.storeAuthData(authData);

        setUserInfo(userInfo);

        // Extract display name from CMU API response
        const displayName = userInfo.displayName || 
                           userInfo.name || 
                           userInfo.firstName + " " + userInfo.lastName || 
                           userInfo.email || 
                           "นักศึกษา";

        Alert.alert(
          "เข้าสู่ระบบสำเร็จ! 🎉",
          `ยินดีต้อนรับ ${displayName}`,
          [
            {
              text: "ไปหน้านักศึกษา",
              onPress: () => router.push("/student/dashboard"),
            },
          ]
        );
      }
    } catch (error) {
      console.error("Token exchange error:", error);
      Alert.alert("เข้าสู่ระบบล้มเหลว", "ไม่สามารถตรวจสอบข้อมูลได้");
    } finally {
      setIsLoading(false);
    }
  };



  // Load stored authentication
  const loadStoredAuth = async () => {
    try {
      const authData = await MicrosoftAuthService.loadStoredAuth();

      if (authData) {
        setUserInfo(authData.userInfo);
      }
    } catch (error) {
      console.error("Error loading stored auth:", error);
    }
  };


  // Sign out function
  const signOut = async () => {
    try {
      await MicrosoftAuthService.clearAuthData();
      setUserInfo(null);

      // Optional: Revoke tokens on Microsoft side
      // This requires additional API calls
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleLogin = () => {
    if (username === "admin" && password === "admin")
      router.push("/admin/all_report");
    else if (username === "driver" && password === "driver")
      router.push("/driver/scanner");
    else Alert.alert("ข้อผิดพลาด", "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  };

  const handleMicrosoftLogin = async () => {
    if (!request) {
      Alert.alert("ข้อผิดพลาด", "กำลังตั้งค่า OAuth กรุณารอสักครู่");
      return;
    }

    if (!discovery) {
      Alert.alert("ข้อผิดพลาด", "ไม่สามารถเชื่อมต่อกับ Microsoft ได้");
      return;
    }

    setIsLoading(true);
    try {
      await promptAsync();
    } catch (error) {
      console.error("Login prompt error:", error);
      Alert.alert("ข้อผิดพลาด", "ไม่สามารถเปิดหน้าเข้าสู่ระบบได้");
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already logged in with Microsoft
  if (userInfo) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: isDark ? "#0f172a" : "#f8fafc" },
        ]}
        edges={["top", "bottom", "left", "right"]}
      >
        <View style={[styles.messageContainer, { padding: 40 }]}>
          <Text
            style={[
              styles.title,
              { color: isDark ? "#f1f5f9" : "#1e293b", marginBottom: 16 },
            ]}
          >
            ยินดีต้อนรับ! 👋
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isDark ? "#94a3b8" : "#64748b", marginBottom: 8 },
            ]}
          >
            {userInfo.displayName}
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isDark ? "#94a3b8" : "#64748b", marginBottom: 32 },
            ]}
          >
            {userInfo.mail || userInfo.userPrincipalName}
          </Text>

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
                marginBottom: 16,
              },
            ]}
            onPress={() => router.push("/student/dashboard")}
          >
            <Text style={styles.studentButtonText}>🎓 ไปหน้านักศึกษา</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#ef4444" : "#f87171",
                transform: [{ scale: pressed ? 0.98 : 1 }],
                ...styles.studentButton,
              },
            ]}
            onPress={signOut}
          >
            <Text style={styles.studentButtonText}>🚪 ออกจากระบบ</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

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
            Driver {"->"} driver:driver , Admin {"->"} admin:admin
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isDark ? "#64748b" : "#9ca3af", fontSize: 14 },
            ]}
          >
            หรือเข้าสู่ระบบด้วยบัญชี Microsoft ของมหาวิทยาลัย
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

            {/* Microsoft Login Button */}
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#0078d4" : "#0082d4",
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                  opacity: isLoading || !request || !discovery ? 0.7 : 1,
                  ...styles.studentButton,
                  marginBottom: 12,
                },
              ]}
              onPress={handleMicrosoftLogin}
              disabled={isLoading || !request || !discovery}
            >
              <Text style={styles.studentButtonText}>
                {isLoading
                  ? "🔄 กำลังเข้าสู่ระบบ..."
                  : !discovery
                  ? "⏳ กำลังโหลด..."
                  : "🏢 เข้าสู่ระบบด้วย Microsoft (CMU)"}
              </Text>
            </Pressable>

            {/* Student Login Button (Legacy) */}
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
              onPress={() => router.push("/student/dashboard")}
            >
              <Text style={styles.studentButtonText}>
                🎓 สำหรับนักศึกษา (ทดลอง)
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
