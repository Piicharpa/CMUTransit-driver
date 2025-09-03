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
import { styles } from "../../theme/admin_theme/admin_profile";

export default function Admin_Profile() {
  const [admin, setAdmin] = useState({
    userID: "ADM001",
    name: "นายสมชาย ใจดี",
    email: "somchai.jaidee@company.co.th",
    department: "ฝ่ายเทคโนโลยีสารสนเทศ",
    role: "System Administrator",
    profilePic: "https://via.placeholder.com/150/007AFF/FFFFFF?text=SC",
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState("");

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleEditName = () => {
    setEditName(admin.name);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    if (editName.trim()) {
      setAdmin({ ...admin, name: editName.trim() });
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
    const currentColor = admin.profilePic.includes("007AFF")
      ? "34C759"
      : admin.profilePic.includes("34C759")
      ? "FF3B30"
      : admin.profilePic.includes("FF3B30")
      ? "FF9500"
      : admin.profilePic.includes("FF9500")
      ? "5856D6"
      : "007AFF";

    const initials = admin.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    const newPic = `https://via.placeholder.com/150/${currentColor}/FFFFFF?text=${initials}`;

    setAdmin({ ...admin, profilePic: newPic });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "System Administrator":
        return "👑";
      case "Database Administrator":
        return "🗄️";
      case "Network Administrator":
        return "🌐";
      case "Security Administrator":
        return "🔒";
      default:
        return "👤";
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "System Administrator":
        return {
          bg: isDark ? "#7c2d12" : "#fef3c7",
          text: isDark ? "#fbbf24" : "#d97706",
        };
      case "Database Administrator":
        return {
          bg: isDark ? "#1e40af" : "#dbeafe",
          text: isDark ? "#60a5fa" : "#2563eb",
        };
      case "Network Administrator":
        return {
          bg: isDark ? "#166534" : "#dcfce7",
          text: isDark ? "#34d399" : "#16a34a",
        };
      case "Security Administrator":
        return {
          bg: isDark ? "#7c2d12" : "#fee2e2",
          text: isDark ? "#f87171" : "#dc2626",
        };
      default:
        return {
          bg: isDark ? "#374151" : "#f3f4f6",
          text: isDark ? "#9ca3af" : "#6b7280",
        };
    }
  };

  const roleBadgeColor = getRoleBadgeColor(admin.role);

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
            👨‍💼 โปรไฟล์ผู้ดูแลระบบ
          </Text>
          <Text
            style={[styles.subtitle, { color: isDark ? "#9ca3af" : "#6b7280" }]}
          >
            จัดการข้อมูลส่วนตัวของผู้ดูแลระบบ
          </Text>
        </View>

        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: isDark ? "#1f2937" : "#F9FAFB",
              borderColor: isDark ? "#374151" : "#E5E7EB",
              shadowColor: isDark ? "#000000" : "#007AFF",
            },
          ]}
        >
          {/* Profile Picture Section */}
          <View style={styles.profilePicSection}>
            <View style={styles.profilePicContainer}>
              <Image
                source={{ uri: admin.profilePic }}
                style={[
                  styles.profilePic,
                  { borderColor: isDark ? "#60a5fa" : "#007AFF" },
                ]}
              />
              <View
                style={[
                  styles.profileRing,
                  {
                    borderColor: isDark
                      ? "rgba(96, 165, 250, 0.3)"
                      : "rgba(0, 122, 255, 0.3)",
                  },
                ]}
              />
              <TouchableOpacity
                style={[
                  styles.changePicButton,
                  {
                    backgroundColor: isDark ? "#3b82f6" : "#007AFF",
                    borderColor: isDark ? "#1f2937" : "#FFFFFF",
                  },
                ]}
                onPress={handleChangeProfilePic}
                activeOpacity={0.8}
              >
                <Text style={styles.changePicText}>📷</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={[
                styles.changePicHint,
                { color: isDark ? "#6b7280" : "#9ca3af" },
              ]}
            >
              แตะเพื่อเปลี่ยนรูปโปรไฟล์
            </Text>
          </View>

          {/* Admin ID Section */}
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
                Admin ID
              </Text>
            </View>
            <View style={styles.userIDContainer}>
              <Text
                style={[
                  styles.userID,
                  { color: isDark ? "#f3f4f6" : "#111827" },
                ]}
              >
                {admin.userID}
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
                  {admin.name}
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
            <Text
              style={[
                styles.nameDisplay,
                { color: isDark ? "#f3f4f6" : "#111827" },
              ]}
            >
              {admin.email}
            </Text>
          </View>

          {/* Department Section */}
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
              <Text style={styles.infoIcon}>🏢</Text>
              <Text
                style={[
                  styles.label,
                  { color: isDark ? "#d1d5db" : "#374151" },
                ]}
              >
                หน่วยงาน
              </Text>
            </View>
            <Text
              style={[
                styles.nameDisplay,
                { color: isDark ? "#f3f4f6" : "#111827" },
              ]}
            >
              {admin.department}
            </Text>
          </View>

          {/* Role Section */}
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
              <Text style={styles.infoIcon}>👑</Text>
              <Text
                style={[
                  styles.label,
                  { color: isDark ? "#d1d5db" : "#374151" },
                ]}
              >
                บทบาท
              </Text>
            </View>
            <View style={styles.nameDisplayContainer}>
              <View
                style={[
                  styles.roleBadge,
                  {
                    backgroundColor: roleBadgeColor.bg,
                  },
                ]}
              >
                <Text style={styles.roleIcon}>{getRoleIcon(admin.role)}</Text>
                <Text style={[styles.roleText, { color: roleBadgeColor.text }]}>
                  {admin.role}
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
                สร้างบัญชี
              </Text>
              <Text
                style={[
                  styles.statValue,
                  { color: isDark ? "#d1d5db" : "#374151" },
                ]}
              >
                15/01/2024
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
                บัญชีผู้ดูแลระบบ - ยืนยันแล้ว
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
                  { color: isDark ? "#f87171" : "#dc2626" },
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
