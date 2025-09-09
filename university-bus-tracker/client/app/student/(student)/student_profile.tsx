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
import styles from "../../theme/student_theme/student_profile";

export default function Student_Profile() {
  const [student, setStudent] = useState({
    studentID: "650610787",
    name: "ปุณณวิชญ์ เดชอินทร์",
    email: "punnawich_dachin@cmu.ac.th",
    faculty: "คณะวิศวกรรมคอมพิวเตอร์",
    profilePic: "https://via.placeholder.com/150/007AFF/FFFFFF?text=SY",
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState("");

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleEditName = () => {
    setEditName(student.name);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    if (editName.trim()) {
      setStudent({ ...student, name: editName.trim() });
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
    const colors = ["007AFF", "34C759", "FF3B30", "FF9500", "5856D6", "AF52DE"];
    const currentColorIndex = colors.findIndex((color) =>
      student.profilePic.includes(color)
    );
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    const newColor = colors[nextColorIndex];

    const initials = student.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const newPic = `https://via.placeholder.com/150/${newColor}/FFFFFF?text=${initials}`;
    setStudent({ ...student, profilePic: newPic });
  };

  const getFacultyIcon = (faculty: string) => {
    switch (faculty) {
      case "คณะวิทยาการคอมพิวเตอร์":
        return "💻";
      case "คณะวิศวกรรมศาสตร์":
        return "⚙️";
      case "คณะบริหารธุรกิจ":
        return "💼";
      case "คณะศึกษาศาสตร์":
        return "📚";
      case "คณะแพทยศาสตร์":
        return "🏥";
      case "คณะพยาบาลศาสตร์":
        return "👩‍⚕️";
      case "คณะเภสัชศาสตร์":
        return "💊";
      case "คณะนิติศาสตร์":
        return "⚖️";
      default:
        return "🎓";
    }
  };

  const getFacultyBadgeColor = (faculty: string) => {
    switch (faculty) {
      case "คณะวิทยาการคอมพิวเตอร์":
        return {
          bg: isDark ? "#1e3a8a" : "#dbeafe",
          text: isDark ? "#60a5fa" : "#2563eb",
          border: isDark ? "#3b82f6" : "#3b82f6",
        };
      case "คณะวิศวกรรมศาสตร์":
        return {
          bg: isDark ? "#7c2d12" : "#fef3c7",
          text: isDark ? "#fbbf24" : "#d97706",
          border: isDark ? "#92400e" : "#f59e0b",
        };
      case "คณะบริหารธุรกิจ":
        return {
          bg: isDark ? "#166534" : "#dcfce7",
          text: isDark ? "#22c55e" : "#16a34a",
          border: isDark ? "#16a34a" : "#22c55e",
        };
      case "คณะศึกษาศาสตร์":
        return {
          bg: isDark ? "#7e22ce" : "#f3e8ff",
          text: isDark ? "#c084fc" : "#7c3aed",
          border: isDark ? "#a855f7" : "#8b5cf6",
        };
      default:
        return {
          bg: isDark ? "#374151" : "#f3f4f6",
          text: isDark ? "#9ca3af" : "#6b7280",
          border: isDark ? "#6b7280" : "#9ca3af",
        };
    }
  };

  const handleLogout = () => {
    Alert.alert("ออกจากระบบ", "คุณต้องการออกจากระบบหรือไม่?", [
      {
        text: "ยกเลิก",
        style: "cancel",
      },
      {
        text: "ออกจากระบบ",
        style: "destructive",
        onPress: () => {
          // Add your logout logic here
          Alert.alert("สำเร็จ", "ออกจากระบบเรียบร้อยแล้ว");
        },
      },
    ]);
  };

  const facultyBadgeColor = getFacultyBadgeColor(student.faculty);

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
            👨‍🎓 โปรไฟล์นักศึกษา
          </Text>
          <Text
            style={[styles.subtitle, { color: isDark ? "#9ca3af" : "#6b7280" }]}
          >
            จัดการข้อมูลส่วนตัวของนักศึกษา
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
              {student.name?.charAt(0).toUpperCase() || "?"}
            </Text>
          </View>

          {/* Student ID Section */}
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
              <Text style={styles.infoIcon}>🎓</Text>
              <Text
                style={[
                  styles.label,
                  { color: isDark ? "#d1d5db" : "#374151" },
                ]}
              >
                รหัสนักศึกษา
              </Text>
            </View>
            <View style={styles.userIDContainer}>
              <Text
                style={[
                  styles.userID,
                  { color: isDark ? "#f3f4f6" : "#111827" },
                ]}
                selectable={true}
              >
                {student.studentID}
              </Text>
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

            <View style={styles.nameDisplayContainer}>
              <Text
                style={[
                  styles.nameDisplay,
                  { color: isDark ? "#f3f4f6" : "#111827" },
                ]}
              >
                {student.name}
              </Text>
            </View>
          </View>

          {/* Email Section */}
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
              <Text style={styles.infoIcon}>📧</Text>
              <Text
                style={[
                  styles.label,
                  { color: isDark ? "#d1d5db" : "#374151" },
                ]}
              >
                อีเมล
              </Text>
            </View>
            <View style={styles.nameDisplayContainer}>
              <Text
                style={[
                  styles.nameDisplay,
                  {
                    color: isDark ? "#f3f4f6" : "#111827",
                    fontSize: 16,
                    fontFamily: "monospace",
                  },
                ]}
                selectable={true}
              >
                {student.email}
              </Text>
            </View>
          </View>

          {/* Faculty Section */}
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
              <Text style={styles.infoIcon}>🏛️</Text>
              <Text
                style={[
                  styles.label,
                  { color: isDark ? "#d1d5db" : "#374151" },
                ]}
              >
                คณะ
              </Text>
            </View>
            <View style={styles.nameDisplayContainer}>
              <View
                style={[
                  styles.roleBadge,
                  {
                    backgroundColor: facultyBadgeColor.bg,
                    borderColor: facultyBadgeColor.border,
                  },
                ]}
              >
                <Text style={styles.roleIcon}>
                  {getFacultyIcon(student.faculty)}
                </Text>
                <Text
                  style={[styles.roleText, { color: facultyBadgeColor.text }]}
                >
                  {student.faculty}
                </Text>
              </View>
            </View>
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
                เข้าศึกษา
              </Text>
              <Text
                style={[
                  styles.statValue,
                  { color: isDark ? "#d1d5db" : "#374151" },
                ]}
              >
                2565
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
                เข้าใช้ล่าสุด
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
                นักศึกษาปัจจุบัน - ยืนยันแล้ว
              </Text>
            </View>
          </View>

          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={[
                styles.logoutButton,
                {
                  backgroundColor: isDark ? "#991b1b" : "#fee2e2",
                  borderColor: isDark ? "#dc2626" : "#f87171",
                },
              ]}
              onPress={handleLogout}
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
