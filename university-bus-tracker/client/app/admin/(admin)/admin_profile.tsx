import {
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from "react-native";
import styles from "../../theme/admin_theme/admin_profile";

export default function Admin_Profile() {
  const admin = {
    userID: "ADM001",
    name: "สมชาย ใจดี",
    email: "somchai.jaidee@company.co.th",
    department: "ฝ่ายเทคโนโลยีสารสนเทศ",
    role: "System Administrator",
    profilePic: "https://via.placeholder.com/150/007AFF/FFFFFF?text=SC",
  };

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

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
                {admin.name?.charAt(0).toUpperCase() || "?"}
              </Text>
            </View>
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
                {admin.name}
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
