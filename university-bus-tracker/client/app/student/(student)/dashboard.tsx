import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  useColorScheme,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { styles } from "../../theme/student_theme/dashboard";

interface BusData {
  id: string;
  busNumber: string;
  route: string;
  startTime: string;
  endTime?: string | null;
  status: string;
  operatingDate: string;
  lastUpdate: string;
}

interface ReportCategory {
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

const busData: BusData[] = [
  // วันนี้ - รถที่กำลังวิ่ง
  {
    id: "1",
    busNumber: "1",
    route: "1 - Purple Line",
    startTime: "07:20",
    endTime: null,
    status: "online",
    operatingDate: "2025-01-25",
    lastUpdate: "14:30",
  },
  {
    id: "2",
    busNumber: "30",
    route: "1 - Purple Line",
    startTime: "07:30",
    endTime: null,
    status: "online",
    operatingDate: "2025-01-25",
    lastUpdate: "14:25",
  },
  {
    id: "3",
    busNumber: "2",
    route: "2 - Red Line",
    startTime: "06:00",
    endTime: null,
    status: "online",
    operatingDate: "2025-01-25",
    lastUpdate: "14:15",
  },

  // วันนี้ - รถที่วิ่งเสร็จแล้ว
  {
    id: "4",
    busNumber: "5",
    route: "1 - Purple Line",
    startTime: "05:00",
    endTime: "12:30",
    status: "completed",
    operatingDate: "2025-01-25",
    lastUpdate: "12:30",
  },
  {
    id: "5",
    busNumber: "15",
    route: "3 - Blue Line",
    startTime: "06:45",
    endTime: "13:15",
    status: "completed",
    operatingDate: "2025-01-25",
    lastUpdate: "13:15",
  },

  // เมื่อวาน
  {
    id: "6",
    busNumber: "4",
    route: "1 - Purple Line",
    startTime: "07:15",
    endTime: "16:30",
    status: "completed",
    operatingDate: "2025-01-24",
    lastUpdate: "16:30",
  },
  {
    id: "7",
    busNumber: "33",
    route: "2 - Red Line",
    startTime: "08:00",
    endTime: "17:45",
    status: "completed",
    operatingDate: "2025-01-24",
    lastUpdate: "17:45",
  },
  {
    id: "8",
    busNumber: "7",
    route: "3 - Blue Line",
    startTime: "06:30",
    endTime: "15:20",
    status: "completed",
    operatingDate: "2025-01-24",
    lastUpdate: "15:20",
  },
  {
    id: "9",
    busNumber: "12",
    route: "1 - Purple Line",
    startTime: "14:00",
    endTime: "22:30",
    status: "completed",
    operatingDate: "2025-01-24",
    lastUpdate: "22:30",
  },

  // 2 วันก่อน
  {
    id: "10",
    busNumber: "25",
    route: "2 - Red Line",
    startTime: "09:15",
    endTime: "18:45",
    status: "completed",
    operatingDate: "2025-01-23",
    lastUpdate: "18:45",
  },
  {
    id: "11",
    busNumber: "8",
    route: "4 - Green Line",
    startTime: "13:30",
    endTime: "21:15",
    status: "completed",
    operatingDate: "2025-01-23",
    lastUpdate: "21:15",
  },
];

export default function Bus_Dashboard() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBus, setSelectedBus] = useState<BusData | null>(null);
  const [reportData, setReportData] = useState({
    accidentTime: "",
    reason: "",
    category: "vehicle",
    title: "",
  });

  // Filter states
  const [filterDate, setFilterDate] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [filteredBuses, setFilteredBuses] = useState<BusData[]>([]);
  const [showHistoricalModal, setShowHistoricalModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Helper function to check if a time is within a bus operating period
  const isTimeWithinBusOperation = (
    incidentTime: string,
    bus: BusData
  ): boolean => {
    const incident = timeToMinutes(incidentTime);
    const start = timeToMinutes(bus.startTime);

    if (bus.endTime) {
      // Bus has finished - check if incident time was within operating hours
      const end = timeToMinutes(bus.endTime);
      return incident >= start && incident <= end;
    } else {
      // Bus is still running - check if incident time is after start time
      return incident >= start;
    }
  };

  // Convert time string (HH:MM) to minutes for easy comparison
  const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Format minutes back to time string
  // const minutesToTime = (minutes: number): string => {
  //   const hours = Math.floor(minutes / 60);
  //   const mins = minutes % 60;
  //   return `${hours.toString().padStart(2, "0")}:${mins
  //     .toString()
  //     .padStart(2, "0")}`;
  // };

  // Get current running buses (today's buses that are still active)
  const getCurrentBuses = () => {
    const today = new Date().toISOString().split("T")[0];
    return busData.filter(
      (bus) => bus.operatingDate === today && bus.status === "online"
    );
  };

  const [currentBuses, setCurrentBuses] = useState<BusData[]>(
    getCurrentBuses()
  );

  useEffect(() => {
    if (filterDate.trim() && incidentTime.trim()) {
      // ค้นหารถที่วิ่งในวันที่และเวลาที่เกิดเหตุการณ์
      let filtered = busData.filter((bus) => {
        // ตรวจสอบวันที่ก่อน
        if (bus.operatingDate !== filterDate) return false;

        // ตรวจสอบว่าเวลาที่เกิดเหตุอยู่ในช่วงที่รถวิ่งหรือไม่
        return isTimeWithinBusOperation(incidentTime, bus);
      });

      // เรียงตามเวลาเริ่มต้น
      filtered.sort(
        (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
      );

      setFilteredBuses(filtered);
    } else if (filterDate.trim()) {
      // แสดงรถทั้งหมดในวันที่เลือก (ยกเว้นรถที่กำลังวิ่งวันนี้)
      const today = new Date().toISOString().split("T")[0];
      let filtered = busData.filter(
        (bus) =>
          bus.operatingDate === filterDate &&
          !(bus.operatingDate === today && bus.status === "online")
      );
      filtered.sort(
        (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
      );
      setFilteredBuses(filtered);
    } else {
      setFilteredBuses([]);
    }
  }, [filterDate, incidentTime]);

  const clearFilters = () => {
    setFilterDate("");
    setIncidentTime("");
    setFilteredBuses([]);
  };

  const handleReport = (bus: BusData) => {
    setSelectedBus(bus);
    // ถ้ามาจากการค้นหา ให้ใส่เวลาเหตุการณ์ที่ค้นหาไว้
    if (incidentTime) {
      setReportData({
        ...reportData,
        accidentTime: incidentTime,
      });
    }
    setModalVisible(true);
  };

  const handleOpenHistoricalReport = () => {
    setShowHistoricalModal(true);
    // Auto set today's date
    const today = new Date().toISOString().split("T")[0];
    setFilterDate(today);
  };

  const handleSelectHistoricalBus = (bus: BusData) => {
    setSelectedBus(bus);
    setShowHistoricalModal(false);
    setModalVisible(true);
    clearFilters();
  };

  const getCategoryInfo = (categoryId: string) => {
    return (
      reportCategories.find((cat) => cat.id === categoryId) ||
      reportCategories[0]
    );
  };

  const handleSendReport = () => {
    if (
      !reportData.accidentTime.trim() ||
      !reportData.reason.trim() ||
      !reportData.title.trim()
    ) {
      Alert.alert(
        isDark ? "ข้อผิดพลาด" : "Error",
        isDark
          ? "กรุณากรอกข้อมูลให้ครบถ้วน"
          : "Please fill in all required fields"
      );
      return;
    }

    const categoryInfo = getCategoryInfo(reportData.category);

    Alert.alert(
      isDark ? "ส่งรายงานสำเร็จ" : "Report Sent",
      isDark
        ? `รายงานสำหรับรถหมายเลข ${selectedBus?.busNumber} ได้ถูกส่งเรียบร้อยแล้ว\n\nหมวดหมู่: ${categoryInfo.icon} ${categoryInfo.name}\nหัวข้อ: ${reportData.title}\nเวลา: ${reportData.accidentTime}\nรายละเอียด: ${reportData.reason}`
        : `Report for bus ${selectedBus?.busNumber} has been submitted successfully.\n\nCategory: ${categoryInfo.icon} ${categoryInfo.name}\nTitle: ${reportData.title}\nTime: ${reportData.accidentTime}\nDetails: ${reportData.reason}`,
      [
        {
          text: "OK",
          onPress: handleCloseModal,
        },
      ]
    );
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setReportData({
      accidentTime: "",
      reason: "",
      category: "vehicle",
      title: "",
    });
    setSelectedBus(null);
  };

  const renderBusRow = ({ item }: { item: BusData }) => (
    <View
      style={[
        styles.tableRow,
        {
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          borderBottomColor: isDark ? "#374151" : "#e5e7eb",
        },
      ]}
    >
      <View style={styles.busNumberColumn}>
        <Text
          style={[styles.busNumber, { color: isDark ? "#f3f4f6" : "#111827" }]}
        >
          {item.busNumber}
        </Text>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.onlineStatus,
              {
                backgroundColor:
                  item.status === "online" ? "#10b981" : "#6b7280",
              },
            ]}
          />
          <Text
            style={[
              styles.statusText,
              { color: item.status === "online" ? "#10b981" : "#6b7280" },
            ]}
          >
            {item.status === "online" ? "กำลังขับ" : "เสร็จสิ้น"}
          </Text>
        </View>
      </View>
      <View style={styles.routeColumn}>
        <Text
          style={[styles.routeText, { color: isDark ? "#d1d5db" : "#6b7280" }]}
        >
          {item.route}
        </Text>
      </View>
      <View style={styles.dateColumn}>
        <Text
          style={[styles.routeText, { color: isDark ? "#d1d5db" : "#6b7280" }]}
        >
          {item.operatingDate}
        </Text>
      </View>
      <View style={styles.timeColumn}>
        <Text
          style={[styles.timeText, { color: isDark ? "#f3f4f6" : "#111827" }]}
        >
          {item.startTime} - {item.endTime == null ? "ปัจจุบัน" : item.endTime}
        </Text>
      </View>
      <View style={styles.actionColumn}>
        <TouchableOpacity
          style={[
            styles.reportButton,
            { backgroundColor: isDark ? "#ef4444" : "#dc2626" },
          ]}
          onPress={() => handleReport(item)}
          activeOpacity={0.8}
        >
          <Text style={styles.reportButtonText}>รายงาน</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const CategoryModal = () => (
    <Modal
      visible={showCategoryModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowCategoryModal(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowCategoryModal(false)}
      >
        <View
          style={[
            styles.categoryModalContent,
            {
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              borderColor: isDark ? "#374151" : "#e5e7eb",
            },
          ]}
        >
          <Text
            style={[
              styles.categoryModalTitle,
              { color: isDark ? "#f3f4f6" : "#111827" },
            ]}
          >
            เลือกหมวดหมู่การรายงาน
          </Text>

          {reportCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryOption}
              onPress={() => {
                setReportData({ ...reportData, category: category.id });
                setShowCategoryModal(false);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text
                style={[
                  styles.categoryOptionText,
                  { color: isDark ? "#d1d5db" : "#374151" },
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0f172a" : "#f9fafb" },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#60a5fa" : "#007AFF" }]}>
          🚌 {isDark ? "แดชบอร์ดรถประจำทาง" : "Bus Dashboard"}
        </Text>
        <Text
          style={[styles.subtitle, { color: isDark ? "#9ca3af" : "#6b7280" }]}
        >
          {isDark
            ? "ติดตามและรายงานสถานะรถประจำทาง"
            : "Track and report bus status"}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: isDark ? "#3b82f6" : "#007AFF" },
          ]}
          onPress={handleOpenHistoricalReport}
          activeOpacity={0.8}
        >
          <Text style={styles.actionButtonText}>
            🔍 ค้นหารถตามเวลาเหตุการณ์
          </Text>
        </TouchableOpacity>
      </View>

      {/* Current Running Buses */}
      <View
        style={[
          styles.section,
          {
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            shadowColor: isDark ? "#000000" : "#007AFF",
          },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: isDark ? "#f3f4f6" : "#111827" },
          ]}
        >
          🚦 รถที่กำลังวิ่งอยู่ในขณะนี้
        </Text>

        <View
          style={[
            styles.tableContainer,
            {
              backgroundColor: isDark ? "#111827" : "#f9fafb",
              borderColor: isDark ? "#374151" : "#e5e7eb",
            },
          ]}
        >
          <View
            style={[
              styles.tableHeader,
              { backgroundColor: isDark ? "#374151" : "#f3f4f6" },
            ]}
          >
            <Text
              style={[
                styles.headerText,
                styles.busNumberColumn,
                { color: isDark ? "#f3f4f6" : "#374151" },
              ]}
            >
              หมายเลขรถ
            </Text>
            <Text
              style={[
                styles.headerText,
                styles.routeColumn,
                { color: isDark ? "#f3f4f6" : "#374151" },
              ]}
            >
              เส้นทาง
            </Text>
            <Text
              style={[
                styles.headerText,
                styles.dateColumn,
                { color: isDark ? "#f3f4f6" : "#374151" },
              ]}
            >
              วันที่
            </Text>
            <Text
              style={[
                styles.headerText,
                styles.timeColumn,
                { color: isDark ? "#f3f4f6" : "#374151" },
              ]}
            >
              เวลา
            </Text>
            <Text
              style={[
                styles.headerText,
                styles.actionColumn,
                { color: isDark ? "#f3f4f6" : "#374151" },
              ]}
            >
              การดำเนินการ
            </Text>
          </View>

          {currentBuses.length > 0 ? (
            <FlatList
              data={currentBuses}
              renderItem={renderBusRow}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              style={styles.list}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🚌</Text>
              <Text
                style={[
                  styles.emptyText,
                  { color: isDark ? "#9ca3af" : "#6b7280" },
                ]}
              >
                ไม่มีรถที่กำลังวิ่งอยู่ในขณะนี้
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Historical Bus Search Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showHistoricalModal}
        onRequestClose={() => setShowHistoricalModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.historicalModalContent,
              {
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                borderColor: isDark ? "#374151" : "#e5e7eb",
              },
            ]}
          >
            <View style={styles.historicalModalHeader}>
              <Text
                style={[
                  styles.historicalModalTitle,
                  { color: isDark ? "#f3f4f6" : "#111827" },
                ]}
              >
                🔍 ค้นหารถตามเวลาเหตุการณ์
              </Text>
              <TouchableOpacity
                onPress={() => setShowHistoricalModal(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.historicalModalBody}>
              <View style={styles.filterContainer}>
                <Text
                  style={[
                    styles.filterDescription,
                    { color: isDark ? "#9ca3af" : "#6b7280" },
                  ]}
                >
                  💡 ระบุวันที่และเวลาที่เกิดเหตุการณ์
                  เพื่อค้นหารถที่วิ่งอยู่ในช่วงเวลานั้น
                </Text>

                <View style={styles.filterRow}>
                  <View style={styles.filterInput}>
                    <Text
                      style={[
                        styles.filterLabel,
                        { color: isDark ? "#d1d5db" : "#374151" },
                      ]}
                    >
                      📅 วันที่เกิดเหตุการณ์
                    </Text>
                    <TextInput
                      style={[
                        styles.filterTextInput,
                        {
                          backgroundColor: isDark ? "#111827" : "#f9fafb",
                          borderColor: isDark ? "#374151" : "#d1d5db",
                          color: isDark ? "#f3f4f6" : "#111827",
                        },
                      ]}
                      value={filterDate}
                      onChangeText={setFilterDate}
                      placeholder="YYYY-MM-DD"
                      placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                    />
                  </View>
                </View>

                <View style={styles.filterRow}>
                  <View style={styles.filterInput}>
                    <Text
                      style={[
                        styles.filterLabel,
                        { color: isDark ? "#d1d5db" : "#374151" },
                      ]}
                    >
                      ⏰ เวลาที่เกิดเหตุการณ์
                    </Text>
                    <TextInput
                      style={[
                        styles.filterTextInput,
                        {
                          backgroundColor: isDark ? "#111827" : "#f9fafb",
                          borderColor: isDark ? "#374151" : "#d1d5db",
                          color: isDark ? "#f3f4f6" : "#111827",
                        },
                      ]}
                      value={incidentTime}
                      onChangeText={setIncidentTime}
                      placeholder="HH:MM (เช่น 14:30)"
                      placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                    />
                  </View>
                </View>

                <View style={styles.filterButtons}>
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={clearFilters}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.clearButtonText}>🗑 ล้างตัวกรอง</Text>
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.resultsText,
                      { color: isDark ? "#9ca3af" : "#6b7280" },
                    ]}
                  >
                    {incidentTime
                      ? `พบรถที่วิ่งในเวลา ${incidentTime}:`
                      : `รถทั้งหมดในวันที่:`}{" "}
                    {filteredBuses.length} คัน
                  </Text>
                </View>
              </View>

              {filteredBuses.length > 0 && (
                <View
                  style={[
                    styles.tableContainer,
                    {
                      backgroundColor: isDark ? "#111827" : "#f9fafb",
                      borderColor: isDark ? "#374151" : "#e5e7eb",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.tableHeader,
                      { backgroundColor: isDark ? "#374151" : "#f3f4f6" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.headerText,
                        styles.busNumberColumn,
                        { color: isDark ? "#f3f4f6" : "#374151" },
                      ]}
                    >
                      หมายเลขรถ
                    </Text>
                    <Text
                      style={[
                        styles.headerText,
                        styles.routeColumn,
                        { color: isDark ? "#f3f4f6" : "#374151" },
                      ]}
                    >
                      เส้นทาง
                    </Text>
                    <Text
                      style={[
                        styles.headerText,
                        styles.timeColumn,
                        { color: isDark ? "#f3f4f6" : "#374151" },
                      ]}
                    >
                      เวลาวิ่ง
                    </Text>
                    <Text
                      style={[
                        styles.headerText,
                        styles.actionColumn,
                        { color: isDark ? "#f3f4f6" : "#374151" },
                      ]}
                    >
                      เลือก
                    </Text>
                  </View>

                  <FlatList
                    data={filteredBuses}
                    renderItem={({ item }) => (
                      <View
                        style={[
                          styles.tableRow,
                          {
                            backgroundColor: isDark ? "#1f2937" : "#ffffff",
                            borderBottomColor: isDark ? "#374151" : "#e5e7eb",
                          },
                        ]}
                      >
                        <View style={styles.busNumberColumn}>
                          <Text
                            style={[
                              styles.busNumber,
                              { color: isDark ? "#f3f4f6" : "#111827" },
                            ]}
                          >
                            {item.busNumber}
                          </Text>
                          <View style={styles.statusContainer}>
                            <View
                              style={[
                                styles.onlineStatus,
                                {
                                  backgroundColor:
                                    incidentTime &&
                                    isTimeWithinBusOperation(incidentTime, item)
                                      ? "#10b981"
                                      : "#6b7280",
                                },
                              ]}
                            />
                            <Text
                              style={[
                                styles.statusText,
                                {
                                  color:
                                    incidentTime &&
                                    isTimeWithinBusOperation(incidentTime, item)
                                      ? "#10b981"
                                      : "#6b7280",
                                },
                              ]}
                            >
                              {incidentTime &&
                              isTimeWithinBusOperation(incidentTime, item)
                                ? "วิ่งในเวลานั้น"
                                : "ไม่ได้วิ่ง"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.routeColumn}>
                          <Text
                            style={[
                              styles.routeText,
                              { color: isDark ? "#d1d5db" : "#6b7280" },
                            ]}
                          >
                            {item.route}
                          </Text>
                        </View>
                        <View style={styles.timeColumn}>
                          <Text
                            style={[
                              styles.timeText,
                              { color: isDark ? "#f3f4f6" : "#111827" },
                            ]}
                          >
                            {item.startTime} - {item.endTime || "ปัจจุบัน"}
                          </Text>
                        </View>
                        <View style={styles.actionColumn}>
                          <TouchableOpacity
                            style={[
                              styles.selectButton,
                              {
                                backgroundColor:
                                  incidentTime &&
                                  isTimeWithinBusOperation(incidentTime, item)
                                    ? isDark
                                      ? "#10b981"
                                      : "#059669"
                                    : isDark
                                    ? "#6b7280"
                                    : "#9ca3af",
                              },
                            ]}
                            onPress={() => handleSelectHistoricalBus(item)}
                            activeOpacity={0.8}
                          >
                            <Text style={styles.selectButtonText}>
                              {incidentTime &&
                              isTimeWithinBusOperation(incidentTime, item)
                                ? "รายงาน"
                                : "เลือก"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    style={{ maxHeight: 300 }}
                  />
                </View>
              )}

              {filterDate && filteredBuses.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>🔍</Text>
                  <Text
                    style={[
                      styles.emptyText,
                      { color: isDark ? "#9ca3af" : "#6b7280" },
                    ]}
                  >
                    {incidentTime
                      ? `ไม่พบรถที่วิ่งในเวลา ${incidentTime} วันที่ ${filterDate}`
                      : `ไม่พบรถในวันที่ ${filterDate}`}
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Report Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                borderColor: isDark ? "#374151" : "#e5e7eb",
              },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: isDark ? "#f3f4f6" : "#111827" },
              ]}
            >
              📋 รายงานรถหมายเลข {selectedBus?.busNumber}
            </Text>

            <ScrollView style={styles.modalBody}>
              {/* Category Selection */}
              <View style={styles.inputContainer}>
                <Text
                  style={[
                    styles.inputLabel,
                    { color: isDark ? "#d1d5db" : "#374151" },
                  ]}
                >
                  📂 หมวดหมู่การรายงาน
                </Text>
                <TouchableOpacity
                  style={[
                    styles.categorySelector,
                    {
                      backgroundColor: isDark ? "#111827" : "#f9fafb",
                      borderColor: isDark ? "#374151" : "#d1d5db",
                    },
                  ]}
                  onPress={() => setShowCategoryModal(true)}
                  activeOpacity={0.7}
                >
                  <View style={styles.categoryDisplay}>
                    <Text style={styles.categoryDisplayIcon}>
                      {getCategoryInfo(reportData.category).icon}
                    </Text>
                    <Text
                      style={[
                        styles.categoryDisplayText,
                        { color: isDark ? "#f3f4f6" : "#111827" },
                      ]}
                    >
                      {getCategoryInfo(reportData.category).name}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.dropdownArrow,
                      { color: isDark ? "#9ca3af" : "#6b7280" },
                    ]}
                  >
                    ▼
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Title Input */}
              <View style={styles.inputContainer}>
                <Text
                  style={[
                    styles.inputLabel,
                    { color: isDark ? "#d1d5db" : "#374151" },
                  ]}
                >
                  📝 หัวข้อรายงาน
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: isDark ? "#111827" : "#f9fafb",
                      borderColor: isDark ? "#374151" : "#d1d5db",
                      color: isDark ? "#f3f4f6" : "#111827",
                    },
                  ]}
                  value={reportData.title}
                  onChangeText={(text) =>
                    setReportData({ ...reportData, title: text })
                  }
                  placeholder="สรุปปัญหาในหัวข้อสั้นๆ"
                  placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                />
              </View>

              {/* Time Input */}
              <View style={styles.inputContainer}>
                <Text
                  style={[
                    styles.inputLabel,
                    { color: isDark ? "#d1d5db" : "#374151" },
                  ]}
                >
                  ⏰ เวลาที่เกิดเหตุ
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: isDark ? "#111827" : "#f9fafb",
                      borderColor: isDark ? "#374151" : "#d1d5db",
                      color: isDark ? "#f3f4f6" : "#111827",
                    },
                  ]}
                  value={reportData.accidentTime}
                  onChangeText={(text) =>
                    setReportData({ ...reportData, accidentTime: text })
                  }
                  placeholder="เช่น 14:30"
                  placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                />
              </View>

              {/* Details Input */}
              <View style={styles.inputContainer}>
                <Text
                  style={[
                    styles.inputLabel,
                    { color: isDark ? "#d1d5db" : "#374151" },
                  ]}
                >
                  📄 รายละเอียด
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    styles.multilineInput,
                    {
                      backgroundColor: isDark ? "#111827" : "#f9fafb",
                      borderColor: isDark ? "#374151" : "#d1d5db",
                      color: isDark ? "#f3f4f6" : "#111827",
                    },
                  ]}
                  value={reportData.reason}
                  onChangeText={(text) =>
                    setReportData({ ...reportData, reason: text })
                  }
                  placeholder="อธิบายรายละเอียดของปัญหาที่เกิดขึ้น"
                  placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCloseModal}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>❌ ยกเลิก</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  { backgroundColor: isDark ? "#10b981" : "#059669" },
                ]}
                onPress={handleSendReport}
                activeOpacity={0.8}
              >
                <Text style={styles.sendButtonText}>📤 ส่งรายงาน</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <CategoryModal />
    </View>
  );
}
