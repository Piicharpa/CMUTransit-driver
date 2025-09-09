import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import styles from "../../theme/student_theme/reportHistory";

interface ReportHistory {
  id: string;
  busNumber: string;
  route: string;
  accidentDate: string;
  accidentTime: string;
  reportDate: string;
  reportTime: string;
  reason: string;
  category: "vehicle" | "route" | "passenger" | "safety" | "accident" | "other";
  title: string;
  status: "pending" | "processing" | "completed" | "canceled";
}

interface ReportCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface ReportStatus {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const reportCategories: ReportCategory[] = [
  { id: "vehicle", name: "ปัญหารถ", icon: "🚌", color: "#3b82f6" },
  { id: "route", name: "เส้นทาง", icon: "🗺️", color: "#10b981" },
  { id: "passenger", name: "ผู้โดยสาร", icon: "👥", color: "#f59e0b" },
  { id: "safety", name: "ความปลอดภัย", icon: "⚠️", color: "#ef4444" },
  { id: "accident", name: "อุบัติเหตุ", icon: "🚨", color: "#dc2626" },
  { id: "other", name: "อื่นๆ", icon: "📝", color: "#8b5cf6" },
];

const reportStatuses: ReportStatus[] = [
  {
    id: "completed",
    name: "ดำเนินการแก้ไข/ปรับปรุงแล้ว",
    icon: "✅",
    color: "#10b981",
  },
  {
    id: "processing",
    name: "กำลังดำเนินการแก้ไข/ปรับปรุง",
    icon: "🔄",
    color: "#3b82f6",
  },
  {
    id: "pending",
    name: "รอดำเนินการแก้ไข/ปรับปรุง",
    icon: "⏳",
    color: "#f59e0b",
  },
  {
    id: "canceled",
    name: "ปฏิเสธการร้องเรียน",
    icon: "❌",
    color: "#ef4444",
  },
];

const reportHistoryData: ReportHistory[] = [
  {
    id: "1",
    busNumber: "B-101",
    route: "1 - Purple Line",
    accidentDate: "2025-01-15",
    accidentTime: "14:30",
    reportDate: "2025-01-15",
    reportTime: "14:35",
    reason:
      "เครื่องยนต์เสียทำให้รถหยุดกะทันหัน ผู้โดยสารต้องรอรถคันถัดไป ช่างได้มาตรวจสอบและซ่อมแซมเรียบร้อยแล้ว",
    category: "vehicle",
    title: "เครื่องยนต์เสีย",
    status: "processing",
  },
  {
    id: "2",
    busNumber: "B-205",
    route: "2 - Red Line",
    accidentDate: "2025-01-14",
    accidentTime: "09:15",
    reportDate: "2025-01-14",
    reportTime: "09:20",
    reason:
      "ชนรถที่จอดอยู่ที่ป้ายรถเมล์เล็กน้อย ไม่มีผู้บาดเจ็บ ความเสียหายเพียงเล็กน้อย ได้แจ้งบริษัทประกันแล้ว",
    category: "accident",
    title: "ชนรถจอด",
    status: "completed",
  },
  {
    id: "3",
    busNumber: "B-312",
    route: "3 - Blue Line",
    accidentDate: "2025-01-14",
    accidentTime: "16:45",
    reportDate: "2025-01-14",
    reportTime: "16:50",
    reason:
      "ผู้โดยสารบาดเจ็บเนื่องจากเบรกกะทันหัน ได้นำส่งโรงพยาบาลแล้ว อาการไม่หนัก คาดว่าจะหายดีในไม่กี่วัน",
    category: "safety",
    title: "ผู้โดยสารบาดเจ็บ",
    status: "completed",
  },
  {
    id: "4",
    busNumber: "B-458",
    route: "4 - Green Line",
    accidentDate: "2025-01-13",
    accidentTime: "11:20",
    reportDate: "2025-01-13",
    reportTime: "11:25",
    reason:
      "ยางระเบิดระหว่างการให้บริการ ต้องเปลี่ยนยางใหม่ ใช้เวลาประมาณ 30 นาทีในการซ่อมแซม",
    category: "vehicle",
    title: "ยางระเบิด",
    status: "completed",
  },
  {
    id: "5",
    busNumber: "B-567",
    route: "1 - Purple Line",
    accidentDate: "2025-01-12",
    accidentTime: "13:50",
    reportDate: "2025-01-12",
    reportTime: "13:55",
    reason:
      "ประตูรถเสียทำให้ผู้โดยสารติดอยู่ข้างใน ต้องเรียกช่างมาซ่อม ใช้เวลาประมาณ 45 นาทีในการแก้ไข",
    category: "vehicle",
    title: "ประตูรถเสีย",
    status: "completed",
  },
  {
    id: "6",
    busNumber: "B-101",
    route: "1 - Purple Line",
    accidentDate: "2025-01-12",
    accidentTime: "08:30",
    reportDate: "2025-01-12",
    reportTime: "08:35",
    reason:
      "มาสายเนื่องจากอุบัติเหตุจราจรบนเส้นทาง ผู้โดยสารรอนาน ไม่สามารถควบคุมได้เนื่องจากปัจจัยภายนอก",
    category: "route",
    title: "มาสายเนื่องจากจราจร",
    status: "completed",
  },
  {
    id: "7",
    busNumber: "B-789",
    route: "2 - Red Line",
    accidentDate: "2025-01-11",
    accidentTime: "17:15",
    reportDate: "2025-01-11",
    reportTime: "17:20",
    reason:
      "แอร์เสียในช่วงเวลาเร่งด่วน อากาศร้อนจัด ผู้โดยสารร้องเรียน กำลังดำเนินการซ่อมแซม",
    category: "vehicle",
    title: "เครื่องปรับอากาศเสีย",
    status: "pending",
  },
  {
    id: "8",
    busNumber: "B-312",
    route: "3 - Blue Line",
    accidentDate: "2025-01-10",
    accidentTime: "12:40",
    reportDate: "2025-01-10",
    reportTime: "12:45",
    reason:
      "กระจกแตกเนื่องจากการทำลาย ต้องเปลี่ยนกระจกใหม่ กำลังรอชิ้นส่วนจากผู้ผลิต",
    category: "other",
    title: "กระจกแตกจากการทำลาย",
    status: "processing",
  },
  {
    id: "9",
    busNumber: "B-312",
    route: "3 - Blue Line",
    accidentDate: "2025-01-10",
    accidentTime: "12:40",
    reportDate: "2025-01-10",
    reportTime: "12:45",
    reason:
      "กระจกแตกเนื่องจากการทำลาย ต้องเปลี่ยนกระจกใหม่ กำลังรอชิ้นส่วนจากผู้ผลิต",
    category: "other",
    title: "กระจกแตกจากการทำลาย",
    status: "canceled",
  },
];

export default function Report_History() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const getCategoryInfo = (categoryId: string) => {
    return (
      reportCategories.find((cat) => cat.id === categoryId) ||
      reportCategories[0]
    );
  };

  const getStatusInfo = (statusId: string) => {
    return (
      reportStatuses.find((status) => status.id === statusId) ||
      reportStatuses[0]
    );
  };

  const toggleExpanded = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const filteredData =
    filterStatus === "all"
      ? reportHistoryData
      : reportHistoryData.filter((item) => item.status === filterStatus);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear() + 543;
    return `${day}/${month}/${year}`;
  };

  const renderReportItem = ({ item }: { item: ReportHistory }) => {
    const isExpanded = expandedItem === item.id;
    const categoryInfo = getCategoryInfo(item.category);
    const statusInfo = getStatusInfo(item.status);

    return (
      <View
        style={[
          styles.reportCard,
          {
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            shadowColor: isDark ? "#000000" : "#007AFF",
            boxShadow: isDark
              ? "0px 2px 4px rgba(0,0,0,0.25)"
              : "0px 2px 4px rgba(30,58,138,0.25)",
          },
        ]}
      >
        {/* Main Content */}
        <View style={styles.cardContent}>
          {/* Header Section - Always Visible */}
          <View style={styles.cardHeader}>
            {/* Top Row: Category and Status */}
            <View style={styles.topRow}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryIcon}>{categoryInfo.icon}</Text>
                <Text
                  style={[styles.categoryText, { color: categoryInfo.color }]}
                >
                  {categoryInfo.name}
                </Text>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: `${statusInfo.color}20` },
                ]}
              >
                <Text style={styles.statusIcon}>{statusInfo.icon}</Text>
                <Text style={[styles.statusText, { color: statusInfo.color }]}>
                  {statusInfo.name}
                </Text>
              </View>
            </View>

            {/* Bus Info Row */}
            <View style={styles.busInfoRow}>
              <Text
                style={[
                  styles.busNumberText,
                  { color: isDark ? "#60a5fa" : "#3b82f6" },
                ]}
              >
                🚌 {item.busNumber}
              </Text>
              <Text
                style={[
                  styles.routeText,
                  { color: isDark ? "#9ca3af" : "#6b7280" },
                ]}
              >
                🗺️ {item.route}
              </Text>
            </View>

            {/* Date Time Row */}
            <View style={styles.dateTimeRow}>
              <Text
                style={[
                  styles.dateTimeText,
                  { color: isDark ? "#d1d5db" : "#374151" },
                ]}
              >
                📅 {formatDate(item.accidentDate)}
              </Text>
              <Text
                style={[
                  styles.dateTimeText,
                  { color: isDark ? "#d1d5db" : "#374151" },
                ]}
              >
                ⏰ {item.accidentTime}
              </Text>
            </View>
          </View>

          {/* Expand/Collapse Button */}
          <TouchableOpacity
            style={[
              styles.expandButton,
              { backgroundColor: isDark ? "#374151" : "#f3f4f6" },
            ]}
            onPress={() => toggleExpanded(item.id)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.expandText,
                { color: isDark ? "#9ca3af" : "#6b7280" },
              ]}
            >
              {isExpanded ? "🔼 ซ่อนรายละเอียด" : "🔽 ดูรายละเอียดเพิ่มเติม"}
            </Text>
            <Text
              style={[
                styles.expandArrow,
                { color: isDark ? "#60a5fa" : "#3b82f6" },
              ]}
            >
              {isExpanded ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>

          {/* Expanded Details */}
          {isExpanded && (
            <View style={styles.expandedContent}>
              <View
                style={[
                  styles.separator,
                  { backgroundColor: isDark ? "#374151" : "#e5e7eb" },
                ]}
              />

              {/* Report Details Grid */}
              <View style={styles.detailsSection}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: isDark ? "#f3f4f6" : "#111827" },
                  ]}
                >
                  📋 ข้อมูลการรายงาน
                </Text>

                <View style={styles.detailsGrid}>
                  <View style={styles.detailRow}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: isDark ? "#9ca3af" : "#6b7280" },
                      ]}
                    >
                      📅 วันที่รายงาน
                    </Text>
                    <Text
                      style={[
                        styles.detailValue,
                        { color: isDark ? "#f3f4f6" : "#111827" },
                      ]}
                    >
                      {formatDate(item.reportDate)}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text
                      style={[
                        styles.detailLabel,
                        { color: isDark ? "#9ca3af" : "#6b7280" },
                      ]}
                    >
                      ⏰ เวลาที่ส่งรายงาน
                    </Text>
                    <Text
                      style={[
                        styles.detailValue,
                        { color: isDark ? "#f3f4f6" : "#111827" },
                      ]}
                    >
                      {item.reportTime} น.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Reason Section */}
              <View style={styles.reasonSection}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: isDark ? "#f3f4f6" : "#111827" },
                  ]}
                >
                  📄 รายละเอียดเหตุการณ์
                </Text>

                <View
                  style={[
                    styles.reasonContainer,
                    {
                      backgroundColor: isDark ? "#111827" : "#f9fafb",
                      borderColor: isDark ? "#374151" : "#e5e7eb",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.reasonText,
                      { color: isDark ? "#d1d5db" : "#374151" },
                    ]}
                  >
                    {item.reason}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      <Text
        style={[styles.filterTitle, { color: isDark ? "#d1d5db" : "#374151" }]}
      >
        🔍 กรองตามสถานะ
      </Text>
      <View style={styles.filterButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor:
                filterStatus === "all"
                  ? isDark
                    ? "#3b82f6"
                    : "#007AFF"
                  : isDark
                  ? "#374151"
                  : "#f3f4f6",
              borderColor:
                filterStatus === "all"
                  ? isDark
                    ? "#3b82f6"
                    : "#007AFF"
                  : isDark
                  ? "#4b5563"
                  : "#d1d5db",
            },
          ]}
          onPress={() => setFilterStatus("all")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.filterButtonText,
              {
                color:
                  filterStatus === "all"
                    ? "#ffffff"
                    : isDark
                    ? "#d1d5db"
                    : "#374151",
              },
            ]}
          >
            📋 ทั้งหมด
          </Text>
        </TouchableOpacity>

        {reportStatuses.map((status) => (
          <TouchableOpacity
            key={status.id}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  filterStatus === status.id
                    ? status.color
                    : isDark
                    ? "#374151"
                    : "#f3f4f6",
                borderColor:
                  filterStatus === status.id
                    ? status.color
                    : isDark
                    ? "#4b5563"
                    : "#d1d5db",
              },
            ]}
            onPress={() => setFilterStatus(status.id)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterButtonText,
                {
                  color:
                    filterStatus === status.id
                      ? "#ffffff"
                      : isDark
                      ? "#d1d5db"
                      : "#374151",
                },
              ]}
            >
              {status.icon} {status.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={[styles.title, { color: isDark ? "#60a5fa" : "#007AFF" }]}>
        📊 ประวัติการรายงาน
      </Text>
      <Text
        style={[styles.subtitle, { color: isDark ? "#9ca3af" : "#6b7280" }]}
      >
        รายงานทั้งหมด: {reportHistoryData.length} รายการ | แสดง:{" "}
        {filteredData.length} รายการ
      </Text>

      {/* Stats Cards */}
      <View
        style={[
          styles.statsContainer,
          {
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            shadowColor: isDark ? "#000000" : "#007AFF",
            boxShadow: isDark
              ? "0px 2px 4px rgba(0,0,0,0.25)"
              : "0px 2px 4px rgba(30,58,138,0.25)",
          },
        ]}
      >
        {reportStatuses.map((status) => {
          const count = reportHistoryData.filter(
            (item) => item.status === status.id
          ).length;
          return (
            <View key={status.id} style={styles.statItem}>
              <Text style={styles.statIcon}>{status.icon}</Text>
              <Text style={[styles.statValue, { color: status.color }]}>
                {count}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: isDark ? "#9ca3af" : "#6b7280" },
                ]}
              >
                {status.name}
              </Text>
            </View>
          );
        })}
      </View>

      {renderFilterButtons()}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📋</Text>
      <Text
        style={[styles.emptyText, { color: isDark ? "#9ca3af" : "#6b7280" }]}
      >
        {filterStatus === "all"
          ? "ยังไม่เคยรายงาน"
          : `ไม่พบรายงานที่มีสถานะ "${getStatusInfo(filterStatus).name}"`}
      </Text>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0f172a" : "#f9fafb" },
      ]}
    >
      <FlatList
        data={filteredData}
        renderItem={renderReportItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}
