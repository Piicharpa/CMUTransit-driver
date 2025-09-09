import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  useColorScheme,
  ScrollView,
} from "react-native";
import { useState } from "react";
import styles from "../../theme/driver_theme/profile";

export default function Driver_Profile() {
  const [driver, setDriver] = useState({
    userID: "DRV001",
    name: "John Smith",
    profilePic: "https://via.placeholder.com/150/007AFF/FFFFFF?text=JS",
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState("");

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleEditName = () => {
    setEditName(driver.name);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    if (editName.trim()) {
      setDriver({ ...driver, name: editName.trim() });
      setIsEditingName(false);
      setEditName("");
    } else {
      Alert.alert("ข้อผิดพลาด", "ชื่อไม่สามารถเว้นว่างได้");
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setEditName("");
  };

  const handleChangeProfilePic = () => {
    const currentColor = driver.profilePic.includes("007AFF")
      ? "34C759"
      : driver.profilePic.includes("34C759")
      ? "FF3B30"
      : driver.profilePic.includes("FF3B30")
      ? "FF9500"
      : driver.profilePic.includes("FF9500")
      ? "5856D6"
      : "007AFF";

    const initials = driver.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    const newPic = `https://via.placeholder.com/150/${currentColor}/FFFFFF?text=${initials}`;

    setDriver({ ...driver, profilePic: newPic });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0f172a" : "#FFFFFF" },
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: isDark ? "#60a5fa" : "#007AFF" }]}
          >
            👤 โปรไฟล์คนขับ
          </Text>
          <Text
            style={[styles.subtitle, { color: isDark ? "#9ca3af" : "#6b7280" }]}
          >
            จัดการข้อมูลส่วนตัวของคุณ
          </Text>
        </View>

        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: isDark ? "#1f2937" : "#F9FAFB",
              borderColor: isDark ? "#374151" : "#E5E7EB",
              shadowColor: isDark ? "#000000" : "#007AFF",
              boxShadow: isDark
                ? "0px 2px 4px rgba(0,0,0,0.25)"
                : "0px 2px 4px rgba(30,58,138,0.25)",
            },
          ]}
        >
          {/* Profile Picture Section */}
          <View style={styles.profilePicSection}>
            <View
              style={[
                styles.profilePic,
                styles.profileInitial,
                {
                  borderColor: isDark ? "#60a5fa" : "#007AFF",
                  backgroundColor: isDark ? "#374151" : "#f3f4f6",
                },
              ]}
            >
              <Text
                style={[
                  styles.initialText,
                  { color: isDark ? "#ffffff" : "#374151" },
                ]}
              >
                {driver.name?.charAt(0).toUpperCase() || "?"}
              </Text>
            </View>
          </View>

          {/* User ID Section */}
          <View
            style={[
              styles.infoCard,
              {
                backgroundColor: isDark ? "#111827" : "#ffffff",
                borderColor: isDark ? "#374151" : "#e5e7eb",
              },
            ]}
          >
            <View style={styles.infoHeader}>
              <Text style={styles.infoIcon}>🆔</Text>
              <Text
                style={[
                  styles.label,
                  { color: isDark ? "#d1d5db" : "#374151" },
                ]}
              >
                User ID
              </Text>
            </View>
            <View style={styles.userIDContainer}>
              <Text
                style={[
                  styles.userID,
                  { color: isDark ? "#f3f4f6" : "#111827" },
                ]}
              >
                {driver.userID}
              </Text>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            </View>
          </View>

          {/* Name Section */}
          <View
            style={[
              styles.infoCard,
              {
                backgroundColor: isDark ? "#111827" : "#ffffff",
                borderColor: isDark ? "#374151" : "#e5e7eb",
              },
            ]}
          >
            <View style={styles.infoHeader}>
              <Text style={styles.infoIcon}>👤</Text>
              <Text
                style={[
                  styles.label,
                  { color: isDark ? "#d1d5db" : "#374151" },
                ]}
              >
                ชื่อ-นามสกุล
              </Text>
            </View>

            {isEditingName ? (
              <View style={styles.editNameContainer}>
                <TextInput
                  style={[
                    styles.nameInput,
                    {
                      backgroundColor: isDark ? "#1f2937" : "#F3F4F6",
                      borderColor: isDark ? "#60a5fa" : "#007AFF",
                      color: isDark ? "#f3f4f6" : "#111827",
                    },
                  ]}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="กรอกชื่อ-นามสกุล"
                  placeholderTextColor={isDark ? "#6b7280" : "#999"}
                  autoFocus
                  selectionColor={isDark ? "#60a5fa" : "#007AFF"}
                />
                <View style={styles.editButtons}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={handleCancelEdit}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.cancelButtonText}>ยกเลิก</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={handleSaveName}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.saveButtonText}>✓ บันทึก</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.nameDisplayContainer}>
                <Text
                  style={[
                    styles.nameDisplay,
                    { color: isDark ? "#f3f4f6" : "#111827" },
                  ]}
                >
                  {driver.name}
                </Text>
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={handleEditName}
                  activeOpacity={0.8}
                >
                  <Text style={styles.editButtonText}>✏️ แก้ไข</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Stats Section */}
          <View
            style={[
              styles.statsContainer,
              {
                backgroundColor: isDark ? "#111827" : "#ffffff",
                borderColor: isDark ? "#374151" : "#e5e7eb",
              },
            ]}
          >
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>📅</Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: isDark ? "#9ca3af" : "#6B7280" },
                ]}
              >
                สร้างโปรไฟล์
              </Text>
              <Text
                style={[
                  styles.statValue,
                  { color: isDark ? "#d1d5db" : "#374151" },
                ]}
              >
                25/07/2025
              </Text>
            </View>
            <View
              style={[
                styles.statDivider,
                { backgroundColor: isDark ? "#374151" : "#e5e7eb" },
              ]}
            />
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🔄</Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: isDark ? "#9ca3af" : "#6B7280" },
                ]}
              >
                อัพเดทล่าสุด
              </Text>
              <Text
                style={[
                  styles.statValue,
                  { color: isDark ? "#d1d5db" : "#374151" },
                ]}
              >
                {new Date().toLocaleDateString("th-TH")}
              </Text>
            </View>
          </View>

          {/* Status Badge */}
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: isDark ? "#065f46" : "#d1fae5" },
              ]}
            >
              <Text style={styles.statusIcon}>✅</Text>
              <Text
                style={[
                  styles.statusText,
                  { color: isDark ? "#10b981" : "#059669" },
                ]}
              >
                โปรไฟล์ยืนยันแล้ว
              </Text>
            </View>
          </View>
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={[
                styles.logoutButton,
                {
                  backgroundColor: isDark ? "#991b1b" : "#fee2e2",
                  borderColor: isDark ? "#dc2626" : "#f87171",
                },
              ]}
              // onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Text style={styles.logoutIcon}>🚪</Text>
              <Text
                style={[
                  styles.logoutText,
                  { color: isDark ? "#fff" : "#dc2626" },
                ]}
              >
                ออกจากระบบ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
