import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { styles } from "../../theme/admin_theme/all_report";

interface ReportHistory {
  id: string;
  busNumber: string;
  route: string;
  accidentDate: string;
  accidentTime: string;
  reportDate: string;
  reportTime: string;
  reason: string;
  driverName: string;
  category: "mechanical" | "accident" | "passenger" | "delay" | "safety"; // เพิ่ม category
}

const reportHistoryData: ReportHistory[] = [
  {
    id: "1",
    busNumber: "B-101",
    route: "สยาม - สุวรรณภูมิ",
    accidentDate: "2025-01-15",
    accidentTime: "14:30",
    reportDate: "2025-01-15",
    reportTime: "14:35",
    reason: "เครื่องยนต์มีปัญหาทำให้รถหยุดกะทันหัน",
    driverName: "สมชาย วงศ์ใหญ่",
    category: "mechanical",
  },
  {
    id: "2",
    busNumber: "B-205",
    route: "มหาวิทยาลัย - เซ็นทรัลลาดพร้าว",
    accidentDate: "2025-01-14",
    accidentTime: "09:15",
    reportDate: "2025-01-14",
    reportTime: "09:20",
    reason: "ชนรถที่จอดอยู่ที่ป้ายรถเมล์เล็กน้อย",
    driverName: "สุปราณี จันทร์เพ็ญ",
    category: "accident",
  },
  {
    id: "3",
    busNumber: "B-312",
    route: "สถานีรถไฟ - พัทยา",
    accidentDate: "2025-01-14",
    accidentTime: "16:45",
    reportDate: "2025-01-14",
    reportTime: "16:50",
    reason: "ผู้โดยสารได้รับบาดเจ็บจากการเบรกกะทันหัน",
    driverName: "สมศักดิ์ แสงทอง",
    category: "passenger",
  },
  {
    id: "4",
    busNumber: "B-458",
    route: "ศูนย์เมือง - ชานเมือง",
    accidentDate: "2025-01-13",
    accidentTime: "11:20",
    reportDate: "2025-01-13",
    reportTime: "11:25",
    reason: "ยางรถแตกขณะให้บริการปกติ",
    driverName: "สุกัญญา ทองดี",
    category: "mechanical",
  },
  {
    id: "5",
    busNumber: "B-567",
    route: "หมอชิต - บางแค",
    accidentDate: "2025-01-12",
    accidentTime: "13:50",
    reportDate: "2025-01-12",
    reportTime: "13:55",
    reason: "ประตูรถเสียทำให้ผู้โดยสารติดอยู่",
    driverName: "วิชัย ศรีสวัสดิ์",
    category: "safety",
  },
  {
    id: "6",
    busNumber: "B-101",
    route: "สยาม - สุวรรณภูมิ",
    accidentDate: "2025-01-12",
    accidentTime: "08:30",
    reportDate: "2025-01-12",
    reportTime: "08:35",
    reason: "เดินทางล่าช้าเนื่องจากอุบัติเหตุบนเส้นทาง",
    driverName: "นิรมล เจริญสุข",
    category: "delay",
  },
  {
    id: "7",
    busNumber: "B-789",
    route: "ลาดกระบัง - อโศก",
    accidentDate: "2025-01-11",
    accidentTime: "17:15",
    reportDate: "2025-01-11",
    reportTime: "17:20",
    reason: "เครื่องปรับอากาศเสียในช่วงเวลาเร่งด่วน",
    driverName: "ประวิทย์ มงคลชัย",
    category: "mechanical",
  },
  {
    id: "8",
    busNumber: "B-312",
    route: "สถานีรถไฟ - พัทยา",
    accidentDate: "2025-01-10",
    accidentTime: "12:40",
    reportDate: "2025-01-10",
    reportTime: "12:45",
    reason: "กระจกหน้าต่างแตกจากการทำลาย",
    driverName: "สมหญิง ใจดี",
    category: "safety",
  },
  {
    id: "9",
    busNumber: "1",
    route: "1 - สายสีม่วง",
    accidentDate: "2025-01-09",
    accidentTime: "07:45",
    reportDate: "2025-01-09",
    reportTime: "07:50",
    reason: "ออกเดินทางล่าช้าจากปัญหาระบบเครื่องยนต์",
    driverName: "รุ่งโรจน์ พรหมมี",
    category: "delay",
  },
  {
    id: "10",
    busNumber: "30",
    route: "1 - สายสีม่วง",
    accidentDate: "2025-01-08",
    accidentTime: "15:20",
    reportDate: "2025-01-08",
    reportTime: "15:25",
    reason: "ชนกันเล็กน้อยที่แยกไฟแดง",
    driverName: "สุมลลี ดาวเด่น",
    category: "accident",
  },
  {
    id: "11",
    busNumber: "2",
    route: "2 - สายสีแดง",
    accidentDate: "2025-01-07",
    accidentTime: "10:15",
    reportDate: "2025-01-07",
    reportTime: "10:20",
    reason: "ผู้โดยสารล้มขณะรถเบรก",
    driverName: "อนุชิต บุญเรือง",
    category: "passenger",
  },
  {
    id: "12",
    busNumber: "40",
    route: "2 - สายสีแดง",
    accidentDate: "2025-01-06",
    accidentTime: "16:30",
    reportDate: "2025-01-06",
    reportTime: "16:35",
    reason: "เครื่องยนต์ร้อนเกินไปในช่วงรถติด",
    driverName: "จินดา รัตนพฤทธิ์",
    category: "mechanical",
  },
  {
    id: "13",
    busNumber: "8",
    route: "3 - สายสีฟ้า",
    accidentDate: "2025-01-05",
    accidentTime: "13:20",
    reportDate: "2025-01-05",
    reportTime: "13:25",
    reason: "ระบบเบรกมีปัญหาขณะจอดรถ",
    driverName: "ธนวัฒน์ สุขใส",
    category: "safety",
  },
  {
    id: "14",
    busNumber: "50",
    route: "3 - สายสีฟ้า",
    accidentDate: "2025-01-04",
    accidentTime: "11:45",
    reportDate: "2025-01-04",
    reportTime: "11:50",
    reason: "ระบบไฟฟ้าในรถขัดข้อง",
    driverName: "พิมพ์ใจ มณีรัตน์",
    category: "mechanical",
  },
  {
    id: "15",
    busNumber: "12",
    route: "4 - สายสีเขียว",
    accidentDate: "2025-01-03",
    accidentTime: "08:10",
    reportDate: "2025-01-03",
    reportTime: "08:15",
    reason: "ชนรถมอเตอร์ไซค์เล็กน้อยที่สี่แยก",
    driverName: "กฤษณะ ทองคำ",
    category: "accident",
  },
];

export default function All_Report() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [status, setStatus] = useState<{ [key: string]: string }>({});
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    route: "",
    accidentDate: "",
    driverName: "",
    status: "",
    busNumber: "",
    category: "", // เพิ่ม category filter
  });

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // ฟังก์ชันสำหรับหาสีและไอคอนของหมวดหมู่
  const getCategoryConfig = (category: string) => {
    switch (category) {
      case "mechanical":
        return { color: "#f59e0b", icon: "🔧", label: "เครื่องยนต์/อุปกรณ์" };
      case "accident":
        return { color: "#ef4444", icon: "⚠️", label: "อุบัติเหตุ" };
      case "passenger":
        return { color: "#8b5cf6", icon: "👥", label: "ผู้โดยสาร" };
      case "delay":
        return { color: "#06b6d4", icon: "⏰", label: "ความล่าช้า" };
      case "safety":
        return { color: "#10b981", icon: "🛡️", label: "ความปลอดภัย" };
      default:
        return {
          color: isDark ? "#6b7280" : "#9ca3af",
          icon: "📝",
          label: "อื่นๆ",
        };
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  // ฟังก์ชันเช็คว่ามี filter ที่ active อยู่หรือไม่
  const hasActiveFilters = () => {
    return Object.values(filters).some((value) => value !== "");
  };

  // ฟังก์ชันล้าง filter ทั้งหมด
  const clearAllFilters = () => {
    setFilters({
      route: "",
      accidentDate: "",
      driverName: "",
      status: "",
      busNumber: "",
      category: "", // ล้าง category filter ด้วย
    });
  };

  // กรองข้อมูลตาม filter
  const filteredData = reportHistoryData.filter((item) => {
    const routeMatch = item.route.includes(filters.route);
    const dateMatch = item.accidentDate.includes(filters.accidentDate);
    const driverMatch = item.driverName.includes(filters.driverName);
    const busMatch = item.busNumber.includes(filters.busNumber);
    const categoryMatch =
      !filters.category || item.category === filters.category; // เพิ่ม category filter
    const statusMatch = !filters.status || status[item.id] === filters.status;
    return (
      routeMatch &&
      dateMatch &&
      driverMatch &&
      busMatch &&
      categoryMatch &&
      statusMatch
    );
  });

  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case "pending":
        return "#f59e0b";
      case "in_progress":
        return "#3b82f6";
      case "done":
        return "#10b981";
      default:
        return isDark ? "#6b7280" : "#9ca3af";
    }
  };

  const renderReportItem = ({ item }: { item: ReportHistory }) => {
    const isExpanded = expandedItem === item.id;
    const itemStatus = status[item.id];
    const categoryConfig = getCategoryConfig(item.category);

    return (
      <View
        style={[
          styles.reportCard,
          {
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e2e8f0",
            shadowColor: isDark ? "#000000" : "#1e3a8a",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => toggleExpanded(item.id)}
          activeOpacity={0.8}
        >
          {/* Header Section */}
          <View style={styles.cardHeader}>
            <View style={styles.headerTop}>
              <View style={styles.busInfoContainer}>
                <View
                  style={[
                    styles.busNumberTag,
                    { backgroundColor: isDark ? "#3b82f6" : "#1e3a8a" },
                  ]}
                >
                  <Text style={styles.busNumber}>🚌 {item.busNumber}</Text>
                </View>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: getStatusColor(itemStatus) },
                  ]}
                />
              </View>

              {/* Category Badge */}
              <View
                style={[
                  styles.categoryBadge,
                  {
                    backgroundColor: categoryConfig.color + "20",
                    borderColor: categoryConfig.color,
                  },
                ]}
              >
                <Text style={styles.categoryIcon}>{categoryConfig.icon}</Text>
                <Text
                  style={[styles.categoryText, { color: categoryConfig.color }]}
                >
                  {categoryConfig.label}
                </Text>
              </View>
            </View>

            <View style={styles.driverInfoRow}>
              <Text
                style={[
                  styles.driverLabel,
                  { color: isDark ? "#9ca3af" : "#64748b" },
                ]}
              >
                ผู้ขับรถ
              </Text>
              <Text
                style={[
                  styles.driverName,
                  { color: isDark ? "#f3f4f6" : "#1e293b" },
                ]}
              >
                👤 {item.driverName}
              </Text>
            </View>

            <View style={styles.routeContainer}>
              <Text
                style={[
                  styles.routeLabel,
                  { color: isDark ? "#9ca3af" : "#64748b" },
                ]}
              >
                เส้นทาง
              </Text>
              <Text
                style={[
                  styles.route,
                  { color: isDark ? "#f3f4f6" : "#1e293b" },
                ]}
              >
                🛣️ {item.route}
              </Text>
            </View>

            <View style={styles.dateTimeContainer}>
              <View
                style={[
                  styles.dateTimeBox,
                  {
                    backgroundColor: isDark ? "#111827" : "#f1f5f9",
                    borderColor: isDark ? "#374151" : "#e2e8f0",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.dateTimeLabel,
                    { color: isDark ? "#9ca3af" : "#64748b" },
                  ]}
                >
                  📅 วันที่อุบัติเหตุ
                </Text>
                <Text
                  style={[
                    styles.dateTime,
                    { color: isDark ? "#f3f4f6" : "#1e293b" },
                  ]}
                >
                  {item.accidentDate}
                </Text>
              </View>
              <View
                style={[
                  styles.dateTimeBox,
                  {
                    backgroundColor: isDark ? "#111827" : "#f1f5f9",
                    borderColor: isDark ? "#374151" : "#e2e8f0",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.dateTimeLabel,
                    { color: isDark ? "#9ca3af" : "#64748b" },
                  ]}
                >
                  🕐 เวลา
                </Text>
                <Text
                  style={[
                    styles.dateTime,
                    { color: isDark ? "#f3f4f6" : "#1e293b" },
                  ]}
                >
                  {item.accidentTime}
                </Text>
              </View>
            </View>
          </View>

          {/* Expand/Collapse Indicator */}
          <View
            style={[
              styles.expandIndicator,
              {
                backgroundColor: isDark ? "#111827" : "#f1f5f9",
                borderTopColor: isDark ? "#374151" : "#e2e8f0",
              },
            ]}
          >
            <Text
              style={[
                styles.expandText,
                { color: isDark ? "#60a5fa" : "#1e3a8a" },
              ]}
            >
              {isExpanded ? "▲ ซ่อนรายละเอียด" : "▼ ดูรายละเอียดเพิ่มเติม"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Expanded Details */}
        {isExpanded && (
          <View
            style={[
              styles.expandedContent,
              {
                backgroundColor: isDark ? "#111827" : "#f8f9fa",
                borderTopColor: isDark ? "#374151" : "#e2e8f0",
              },
            ]}
          >
            <View
              style={[
                styles.separator,
                { backgroundColor: isDark ? "#374151" : "#e2e8f0" },
              ]}
            />

            <View style={styles.detailsGrid}>
              <View
                style={[
                  styles.detailItem,
                  {
                    backgroundColor: isDark ? "#1f2937" : "#ffffff",
                    borderColor: isDark ? "#374151" : "#e2e8f0",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.detailLabel,
                    { color: isDark ? "#9ca3af" : "#64748b" },
                  ]}
                >
                  📄 วันที่ส่งรายงาน
                </Text>
                <Text
                  style={[
                    styles.detailValue,
                    { color: isDark ? "#f3f4f6" : "#1e293b" },
                  ]}
                >
                  {item.reportDate}
                </Text>
              </View>
              <View
                style={[
                  styles.detailItem,
                  {
                    backgroundColor: isDark ? "#1f2937" : "#ffffff",
                    borderColor: isDark ? "#374151" : "#e2e8f0",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.detailLabel,
                    { color: isDark ? "#9ca3af" : "#64748b" },
                  ]}
                >
                  ⏰ เวลาส่งรายงาน
                </Text>
                <Text
                  style={[
                    styles.detailValue,
                    { color: isDark ? "#f3f4f6" : "#1e293b" },
                  ]}
                >
                  {item.reportTime}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.reasonContainer,
                {
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  borderColor: isDark ? "#374151" : "#e2e8f0",
                },
              ]}
            >
              <Text
                style={[
                  styles.reasonTitle,
                  { color: isDark ? "#60a5fa" : "#1e3a8a" },
                ]}
              >
                📝 รายละเอียดเหตุการณ์
              </Text>
              <Text
                style={[
                  styles.reasonText,
                  { color: isDark ? "#d1d5db" : "#475569" },
                ]}
              >
                {item.reason}
              </Text>
            </View>

            {/* Status Selection */}
            <View style={styles.statusSection}>
              <Text
                style={[
                  styles.statusLabel,
                  { color: isDark ? "#60a5fa" : "#1e3a8a" },
                ]}
              >
                🔄 สถานะการดำเนินการ
              </Text>
              <View style={styles.statusButtons}>
                {[
                  {
                    label: "⏳ รอดำเนินการ",
                    value: "pending",
                    color: "#f59e0b",
                  },
                  {
                    label: "⚡ กำลังดำเนินการ",
                    value: "in_progress",
                    color: "#3b82f6",
                  },
                  { label: "✅ เสร็จสิ้น", value: "done", color: "#10b981" },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.statusButton,
                      {
                        backgroundColor:
                          status[item.id] === option.value
                            ? option.color
                            : isDark
                            ? "#1f2937"
                            : "#ffffff",
                        borderColor:
                          status[item.id] === option.value
                            ? option.color
                            : isDark
                            ? "#374151"
                            : "#e2e8f0",
                      },
                    ]}
                    onPress={() =>
                      setStatus((prev) => ({
                        ...prev,
                        [item.id]: option.value,
                      }))
                    }
                  >
                    <Text
                      style={[
                        styles.statusButtonText,
                        {
                          color:
                            status[item.id] === option.value
                              ? "#ffffff"
                              : isDark
                              ? "#9ca3af"
                              : "#64748b",
                        },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0f172a" : "#f8f9fa" },
      ]}
    >
      <FlatList
        data={filteredData}
        renderItem={renderReportItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View style={styles.headerContainer}>
              <Text
                style={[
                  styles.title,
                  { color: isDark ? "#60a5fa" : "#1e3a8a" },
                ]}
              >
                📋 รายงานอุบัติเหตุทั้งหมด
              </Text>
              <Text
                style={[
                  styles.subtitle,
                  { color: isDark ? "#9ca3af" : "#64748b" },
                ]}
              >
                จัดการและติดตามสถานะรายงาน {filteredData.length} รายการ
              </Text>
            </View>

            {/* Summary Card */}
            <View
              style={[
                styles.summaryCard,
                {
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  borderColor: isDark ? "#374151" : "#e2e8f0",
                  shadowColor: isDark ? "#000000" : "#1e3a8a",
                },
              ]}
            >
              <View style={styles.summaryItem}>
                <Text
                  style={[
                    styles.summaryNumber,
                    { color: isDark ? "#60a5fa" : "#1e3a8a" },
                  ]}
                >
                  {filteredData.length}
                </Text>
                <Text
                  style={[
                    styles.summaryLabel,
                    { color: isDark ? "#9ca3af" : "#64748b" },
                  ]}
                >
                  📊 รายงานทั้งหมด
                </Text>
              </View>
              <View
                style={[
                  styles.summaryDivider,
                  { backgroundColor: isDark ? "#374151" : "#e2e8f0" },
                ]}
              />
              <View style={styles.summaryItem}>
                <Text
                  style={[
                    styles.summaryNumber,
                    { color: isDark ? "#60a5fa" : "#1e3a8a" },
                  ]}
                >
                  {Object.values(status).filter((s) => s === "done").length}
                </Text>
                <Text
                  style={[
                    styles.summaryLabel,
                    { color: isDark ? "#9ca3af" : "#64748b" },
                  ]}
                >
                  ✅ เสร็จสิ้น
                </Text>
              </View>
              <View
                style={[
                  styles.summaryDivider,
                  { backgroundColor: isDark ? "#374151" : "#e2e8f0" },
                ]}
              />
              <View style={styles.summaryItem}>
                <Text
                  style={[
                    styles.summaryNumber,
                    { color: isDark ? "#60a5fa" : "#1e3a8a" },
                  ]}
                >
                  {
                    Object.values(status).filter(
                      (s) => s === "pending" || s === "in_progress"
                    ).length
                  }
                </Text>
                <Text
                  style={[
                    styles.summaryLabel,
                    { color: isDark ? "#9ca3af" : "#64748b" },
                  ]}
                >
                  ⏳ กำลังดำเนินการ
                </Text>
              </View>
            </View>

            {/* Filter Toggle Button */}
            <View style={styles.filterToggleContainer}>
              <TouchableOpacity
                style={[
                  styles.filterToggleButton,
                  {
                    backgroundColor: showFilters
                      ? isDark
                        ? "#3b82f6"
                        : "#1e3a8a"
                      : isDark
                      ? "#374151"
                      : "#f1f5f9",
                    borderColor: isDark ? "#4b5563" : "#e2e8f0",
                  },
                ]}
                onPress={() => setShowFilters(!showFilters)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterToggleText,
                    {
                      color: showFilters
                        ? "#ffffff"
                        : isDark
                        ? "#d1d5db"
                        : "#1e293b",
                    },
                  ]}
                >
                  🔍 {showFilters ? "ซ่อนตัวกรอง" : "แสดงตัวกรอง"}
                </Text>
                <Text
                  style={[
                    styles.filterToggleIcon,
                    {
                      color: showFilters
                        ? "#ffffff"
                        : isDark
                        ? "#9ca3af"
                        : "#64748b",
                    },
                  ]}
                >
                  {showFilters ? "▲" : "▼"}
                </Text>
              </TouchableOpacity>

              {/* Filter Status Indicator */}
              {hasActiveFilters() && (
                <View style={styles.filterIndicatorContainer}>
                  <View
                    style={[
                      styles.filterIndicator,
                      { backgroundColor: isDark ? "#f59e0b" : "#f59e0b" },
                    ]}
                  >
                    <Text style={styles.filterIndicatorText}>
                      {Object.values(filters).filter((v) => v !== "").length}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.clearFiltersButton,
                      {
                        backgroundColor: isDark ? "#ef4444" : "#ef4444",
                      },
                    ]}
                    onPress={clearAllFilters}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.clearFiltersText}>ล้าง</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Filter Section */}
            {showFilters && (
              <View
                style={[
                  styles.filterContainer,
                  {
                    backgroundColor: isDark ? "#1f2937" : "#ffffff",
                    borderColor: isDark ? "#374151" : "#e2e8f0",
                    shadowColor: isDark ? "#000000" : "#1e3a8a",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterTitle,
                    { color: isDark ? "#60a5fa" : "#1e3a8a" },
                  ]}
                >
                  🔍 ค้นหาและกรองข้อมูล
                </Text>

                {/* Category Filter */}
                <View style={styles.categoryFilterContainer}>
                  <Text
                    style={[
                      styles.statusFilterLabel,
                      { color: isDark ? "#9ca3af" : "#64748b" },
                    ]}
                  >
                    📂 กรองตามหมวดหมู่
                  </Text>
                  <View style={styles.categoryFilterButtons}>
                    <TouchableOpacity
                      style={[
                        styles.categoryFilterButton,
                        {
                          backgroundColor:
                            filters.category === ""
                              ? isDark
                                ? "#3b82f6"
                                : "#1e3a8a"
                              : isDark
                              ? "#374151"
                              : "#f1f5f9",
                          borderColor:
                            filters.category === ""
                              ? isDark
                                ? "#3b82f6"
                                : "#1e3a8a"
                              : isDark
                              ? "#4b5563"
                              : "#e2e8f0",
                        },
                      ]}
                      onPress={() =>
                        setFilters((prev) => ({ ...prev, category: "" }))
                      }
                    >
                      <Text
                        style={[
                          styles.categoryFilterText,
                          {
                            color:
                              filters.category === ""
                                ? "#ffffff"
                                : isDark
                                ? "#9ca3af"
                                : "#64748b",
                          },
                        ]}
                      >
                        ทั้งหมด
                      </Text>
                    </TouchableOpacity>

                    {[
                      { key: "mechanical", ...getCategoryConfig("mechanical") },
                      { key: "accident", ...getCategoryConfig("accident") },
                      { key: "passenger", ...getCategoryConfig("passenger") },
                      { key: "delay", ...getCategoryConfig("delay") },
                      { key: "safety", ...getCategoryConfig("safety") },
                    ].map((category) => (
                      <TouchableOpacity
                        key={category.key}
                        style={[
                          styles.categoryFilterButton,
                          {
                            backgroundColor:
                              filters.category === category.key
                                ? category.color
                                : isDark
                                ? "#374151"
                                : "#f1f5f9",
                            borderColor:
                              filters.category === category.key
                                ? category.color
                                : isDark
                                ? "#4b5563"
                                : "#e2e8f0",
                          },
                        ]}
                        onPress={() =>
                          setFilters((prev) => ({
                            ...prev,
                            category:
                              prev.category === category.key
                                ? ""
                                : category.key,
                          }))
                        }
                      >
                        <Text style={styles.categoryFilterIcon}>
                          {category.icon}
                        </Text>
                        <Text
                          style={[
                            styles.categoryFilterText,
                            {
                              color:
                                filters.category === category.key
                                  ? "#ffffff"
                                  : isDark
                                  ? "#9ca3af"
                                  : "#64748b",
                            },
                          ]}
                        >
                          {category.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.filterGrid}>
                  <TextInput
                    placeholder="🚌 ค้นหาหมายเลขรถ"
                    placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                    style={[
                      styles.filterInput,
                      {
                        backgroundColor: isDark ? "#111827" : "#f8f9fa",
                        borderColor: isDark ? "#374151" : "#e2e8f0",
                        color: isDark ? "#f3f4f6" : "#1e293b",
                      },
                    ]}
                    value={filters.busNumber}
                    onChangeText={(text) =>
                      setFilters((prev) => ({ ...prev, busNumber: text }))
                    }
                  />
                  <TextInput
                    placeholder="🛣️ ค้นหาเส้นทาง"
                    placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                    style={[
                      styles.filterInput,
                      {
                        backgroundColor: isDark ? "#111827" : "#f8f9fa",
                        borderColor: isDark ? "#374151" : "#e2e8f0",
                        color: isDark ? "#f3f4f6" : "#1e293b",
                      },
                    ]}
                    value={filters.route}
                    onChangeText={(text) =>
                      setFilters((prev) => ({ ...prev, route: text }))
                    }
                  />
                  <TextInput
                    placeholder="👤 ค้นหาชื่อผู้ขับ"
                    placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                    style={[
                      styles.filterInput,
                      {
                        backgroundColor: isDark ? "#111827" : "#f8f9fa",
                        borderColor: isDark ? "#374151" : "#e2e8f0",
                        color: isDark ? "#f3f4f6" : "#1e293b",
                      },
                    ]}
                    value={filters.driverName}
                    onChangeText={(text) =>
                      setFilters((prev) => ({ ...prev, driverName: text }))
                    }
                  />
                  <TextInput
                    placeholder="📅 ค้นหาวันที่ (YYYY-MM-DD)"
                    placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                    style={[
                      styles.filterInput,
                      {
                        backgroundColor: isDark ? "#111827" : "#f8f9fa",
                        borderColor: isDark ? "#374151" : "#e2e8f0",
                        color: isDark ? "#f3f4f6" : "#1e293b",
                      },
                    ]}
                    value={filters.accidentDate}
                    onChangeText={(text) =>
                      setFilters((prev) => ({ ...prev, accidentDate: text }))
                    }
                  />
                </View>

                {/* Status Filter */}
                <View style={styles.statusFilterContainer}>
                  <Text
                    style={[
                      styles.statusFilterLabel,
                      { color: isDark ? "#9ca3af" : "#64748b" },
                    ]}
                  >
                    🔄 กรองตามสถานะ
                  </Text>
                  <View style={styles.statusFilterButtons}>
                    {[
                      { label: "ทั้งหมด", value: "" },
                      { label: "⏳ รอดำเนินการ", value: "pending" },
                      { label: "⚡ กำลังดำเนินการ", value: "in_progress" },
                      { label: "✅ เสร็จสิ้น", value: "done" },
                    ].map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={[
                          styles.filterStatusButton,
                          {
                            backgroundColor:
                              filters.status === option.value
                                ? isDark
                                  ? "#3b82f6"
                                  : "#1e3a8a"
                                : isDark
                                ? "#374151"
                                : "#f1f5f9",
                            borderColor:
                              filters.status === option.value
                                ? isDark
                                  ? "#3b82f6"
                                  : "#1e3a8a"
                                : isDark
                                ? "#4b5563"
                                : "#e2e8f0",
                          },
                        ]}
                        onPress={() =>
                          setFilters((prev) => ({
                            ...prev,
                            status: option.value,
                          }))
                        }
                      >
                        <Text
                          style={[
                            styles.filterStatusText,
                            {
                              color:
                                filters.status === option.value
                                  ? "#ffffff"
                                  : isDark
                                  ? "#9ca3af"
                                  : "#64748b",
                            },
                          ]}
                        >
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            )}
          </View>
        }
        ListEmptyComponent={
          <View
            style={[
              styles.emptyContainer,
              {
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                borderColor: isDark ? "#374151" : "#e2e8f0",
              },
            ]}
          >
            <Text style={styles.emptyIcon}>📭</Text>
            <Text
              style={[
                styles.emptyTitle,
                { color: isDark ? "#60a5fa" : "#1e3a8a" },
              ]}
            >
              ไม่พบรายงาน
            </Text>
            <Text
              style={[
                styles.emptyText,
                { color: isDark ? "#9ca3af" : "#64748b" },
              ]}
            >
              ลองปรับเงื่อนไขการค้นหาใหม่
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}
