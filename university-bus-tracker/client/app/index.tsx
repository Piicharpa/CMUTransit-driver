import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";


export default function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme();
  const router = useRouter();

  const isDark = colorScheme === "dark";

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      alert("Wellcome Admin");
      router.push("/admin");
    }
    else if (username === "driver" && password === "driver") {
      alert("Wellcome Driver")
      router.push("/driver");
    }
  };

  const handleStudentLogin = () => {
    alert("Wellcome Student")
    router.push("/student")
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#F3F4F6" },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? "#fff" : "#333" }]}>
        Welcome
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1E1E1E" : "#fff",
            borderColor: isDark ? "#444" : "#ccc",
            color: isDark ? "#fff" : "#000",
          },
        ]}
        placeholder="Username"
        placeholderTextColor={isDark ? "#aaa" : "#999"}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1E1E1E" : "#fff",
            borderColor: isDark ? "#444" : "#ccc",
            color: isDark ? "#fff" : "#000",
          },
        ]}
        placeholder="Password"
        placeholderTextColor={isDark ? "#aaa" : "#999"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable
        style={({ pressed, hovered }) => [
          styles.button,
          {
            backgroundColor: pressed
              ? "#3B34D8"
              : hovered
              ? "#5B52F2"
              : "#4F46E5",
          },
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Text style={[styles.orText, { color: isDark ? "#aaa" : "#666" }]}>
        or
      </Text>

      <Pressable
        style={({ pressed, hovered }) => [
          styles.altButton,
          {
            backgroundColor: pressed
              ? "#7C3AED"
              : hovered
              ? "#A78BFA"
              : "#8B5CF6",
          },
        ]}
        onPress={handleStudentLogin}
      >
        <Text style={styles.altButtonText}>Student Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orText: {
    marginVertical: 12,
    fontSize: 16,
  },
  altButton: {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  altButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
