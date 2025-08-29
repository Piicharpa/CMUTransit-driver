import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../../theme/admin_theme/driver_dashboard";

interface DriverData {
  driverID: string;
  driverName: string;
  status: "driving" | "waiting" | "not work time";
  busNumber: string | null;
}

const driverData: DriverData[] = [
  {
    driverID: "D-001",
    driverName: "สมชาย วงศ์ใหญ่",
    status: "driving",
    busNumber: "1",
  },
  {
    driverID: "D-002",
    driverName: "สุปราณี จันทร์เพ็ญ",
    status: "waiting",
    busNumber: null,
  },
  {
    driverID: "D-003",
    driverName: "สมศักดิ์ แสงทอง",
    status: "driving",
    busNumber: "2",
  },
  {
    driverID: "D-004",
    driverName: "สุกัญญา ทองดี",
    status: "not work time",
    busNumber: null,
  },
  {
    driverID: "D-005",
    driverName: "วิชัย ศรีสวัสดิ์",
    status: "waiting",
    busNumber: null,
  },
  {
    driverID: "D-006",
    driverName: "นิรมล เจริญสุข",
    status: "driving",
    busNumber: "32",
  },
  {
    driverID: "D-007",
    driverName: "ประวิทย์ มงคลชัย",
    status: "not work time",
    busNumber: null,
  },
  {
    driverID: "D-008",
    driverName: "สมหญิง ใจดี",
    status: "driving",
    busNumber: "40",
  },
  {
    driverID: "D-009",
    driverName: "รุ่งโรจน์ พรหมมี",
    status: "waiting",
    busNumber: null,
  },
  {
    driverID: "D-010",
    driverName: "สุมลลี ดาวเด่น",
    status: "driving",
    busNumber: "41",
  },
  {
    driverID: "D-011",
    driverName: "อนุชิต บุญเรือง",
    status: "driving",
    busNumber: "3",
  },
  {
    driverID: "D-012",
    driverName: "จินดา รัตนพงษ์",
    status: "waiting",
    busNumber: null,
  },
  {
    driverID: "D-013",
    driverName: "ธนวัฒน์ สุขใส",
    status: "driving",
    busNumber: "8",
  },
  {
    driverID: "D-014",
    driverName: "พิมพ์ใจ มณีรัตน์",
    status: "not work time",
    busNumber: null,
  },
  {
    driverID: "D-015",
    driverName: "กฤษณะ ทองคำ",
    status: "driving",
    busNumber: "12",
  },
  {
    driverID: "D-016",
    driverName: "มาลัย ดอกไม้",
    status: "waiting",
    busNumber: null,
  },
  {
    driverID: "D-017",
    driverName: "สิทธิชัย รุ่งเรือง",
    status: "driving",
    busNumber: "50",
  },
  {
    driverID: "D-018",
    driverName: "วันทนา สายทอง",
    status: "driving",
    busNumber: "30",
  },
  {
    driverID: "D-019",
    driverName: "บัณฑิต ขจรศักดิ์",
    status: "not work time",
    busNumber: null,
  },
  {
    driverID: "D-020",
    driverName: "ณัฐชา บุญมี",
    status: "waiting",
    busNumber: null,
  },
];

export default function Driver_Managing() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [editableDrivers, setEditableDrivers] =
    useState<DriverData[]>(driverData);

  // ตัวแปรเก็บ driver ที่กำลังแก้ไข busNumber
  const [editingDriverID, setEditingDriverID] = useState<string | null>(null);
  const [busNumberInput, setBusNumberInput] = useState("");

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "driving":
        return "#10b981"; // Green
      case "waiting":
        return "#f59e0b"; // Orange
      case "not work time":
        return "#ef4444"; // Red
      default:
        return isDark ? "#6b7280" : "#9ca3af";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "driving":
        return "กำลังขับ";
      case "waiting":
        return "รอขับ";
      case "not work time":
        return "นอกเวลางาน";
      default:
        return status;
    }
  };

  // เริ่มแก้ไข เลขรถ
  const startEditingBusNumber = (
    driverID: string,
    currentBusNumber: string | null
  ) => {
    setEditingDriverID(driverID);
    setBusNumberInput(currentBusNumber ?? "");
  };

  // ยกเลิกแก้ไข
  const cancelEditing = () => {
    setEditingDriverID(null);
    setBusNumberInput("");
  };

  // บันทึกเลขรถใหม่
  const saveBusNumber = () => {
    if (!busNumberInput.trim()) {
      return;
    }
    setEditableDrivers((prev) =>
      prev.map((driver) =>
        driver.driverID === editingDriverID
          ? { ...driver, busNumber: busNumberInput.trim(), status: "driving" }
          : driver
      )
    );
    cancelEditing();
  };

  const handleStatusChange = (
    driverID: string,
    newStatus: DriverData["status"]
  ) => {
    setEditableDrivers((prev) =>
      prev.map((driver) =>
        driver.driverID === driverID
          ? {
              ...driver,
              status: newStatus,
              busNumber:
                newStatus === "driving" ? driver.busNumber ?? "1" : null,
            }
          : driver
      )
    );
  };

  // Filter logic - รวมทั้งชื่อและสถานะ
  const filteredDrivers = editableDrivers.filter((driver) => {
    const matchesStatus =
      selectedStatus === "all" || driver.status === selectedStatus;
    const matchesName =
      nameFilter === "" ||
      driver.driverName.toLowerCase().includes(nameFilter.toLowerCase()) ||
      driver.driverID.toLowerCase().includes(nameFilter.toLowerCase());

    return matchesStatus && matchesName;
  });

  const getStatusCounts = () => {
    return {
      driving: editableDrivers.filter((d) => d.status === "driving").length,
      waiting: editableDrivers.filter((d) => d.status === "waiting").length,
      notWorkTime: editableDrivers.filter((d) => d.status === "not work time")
        .length,
      total: editableDrivers.length,
    };
  };

  const statusCounts = getStatusCounts();

  const renderStatusFilterButton = (status: string, label: string) => (
    <TouchableOpacity
      key={status}
      style={[
        styles.filterButton,
        {
          backgroundColor:
            selectedStatus === status
              ? isDark
                ? "#3b82f6"
                : "#2196F3"
              : isDark
              ? "#374151"
              : "#E0E0E0",
          borderColor: isDark ? "#4b5563" : "#d1d5db",
        },
      ]}
      onPress={() => setSelectedStatus(status)}
    >
      <Text
        style={[
          styles.filterButtonText,
          {
            color:
              selectedStatus === status
                ? "#ffffff"
                : isDark
                ? "#d1d5db"
                : "#666",
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderDriverCard = ({ item }: { item: DriverData }) => (
    <View
      style={[
        styles.driverCard,
        {
          backgroundColor: isDark ? "#1f2937" : "#1976D2",
          shadowColor: isDark ? "#000000" : "#1976D2",
        },
      ]}
    >
      <View style={styles.driverHeader}>
        <View style={styles.driverInfo}>
          <Text style={[styles.driverName, { color: "#FFFFFF" }]}>
            {item.driverName}
          </Text>
          <Text
            style={[styles.driverID, { color: isDark ? "#cbd5e1" : "#BBDEFB" }]}
          >
            ID: {item.driverID}
          </Text>
        </View>

        {editingDriverID === item.driverID ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={[
                styles.busNumberInput,
                {
                  backgroundColor: "#FFFFFF",
                  borderColor: isDark ? "#6b7280" : "#BBDEFB",
                  color: isDark ? "#1f2937" : "#333",
                },
              ]}
              value={busNumberInput}
              onChangeText={setBusNumberInput}
              placeholder="เลขรถ"
              placeholderTextColor={isDark ? "#6b7280" : "#A0A0A0"}
              keyboardType="numeric"
              maxLength={4}
              autoFocus
            />
            <TouchableOpacity
              onPress={saveBusNumber}
              style={[styles.saveButton, { backgroundColor: "#10b981" }]}
            >
              <Text style={{ color: "#fff", fontSize: 12 }}>บันทึก</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={cancelEditing}
              style={[styles.cancelButton, { backgroundColor: "#ef4444" }]}
            >
              <Text style={{ color: "#fff", fontSize: 12 }}>ยกเลิก</Text>
            </TouchableOpacity>
          </View>
        ) : item.busNumber ? (
          <View
            style={[styles.busNumberContainer, { backgroundColor: "#FFFFFF" }]}
          >
            <Text
              style={[
                styles.busNumberLabel,
                { color: isDark ? "#1f2937" : "#1976D2" },
              ]}
            >
              Bus
            </Text>
            <Text
              style={[
                styles.busNumber,
                { color: isDark ? "#1f2937" : "#1976D2" },
              ]}
            >
              {item.busNumber}
            </Text>
          </View>
        ) : (
          <View style={[styles.noBusContainer, { backgroundColor: "#FFFFFF" }]}>
            <Text
              style={[styles.noBusText, { color: isDark ? "#6b7280" : "#666" }]}
            >
              No Bus
            </Text>
            <Text
              style={[
                styles.noBusSubtext,
                { color: isDark ? "#9ca3af" : "#999" },
              ]}
            >
              Assigned
            </Text>
          </View>
        )}
      </View>

      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        />
        <Text
          style={[styles.statusText, { color: getStatusColor(item.status) }]}
        >
          {getStatusText(item.status)}
        </Text>
      </View>

      <View style={styles.controlContainer}>
        {(item.status === "driving" || item.status === "waiting") &&
          editingDriverID !== item.driverID && (
            <TouchableOpacity
              onPress={() =>
                startEditingBusNumber(item.driverID, item.busNumber)
              }
            >
              <Text
                style={[
                  styles.editButton,
                  { backgroundColor: isDark ? "#3b82f6" : "#1565C0" },
                ]}
              >
                แก้ไขรถ
              </Text>
            </TouchableOpacity>
          )}
        <View style={[styles.pickerContainer, { backgroundColor: "#FFFFFF" }]}>
          <Picker
            selectedValue={item.status}
            onValueChange={(value) =>
              handleStatusChange(item.driverID, value as DriverData["status"])
            }
            style={[styles.picker, { color: isDark ? "#1f2937" : "#1976D2" }]}
            dropdownIconColor={isDark ? "#1f2937" : "#333"}
          >
            <Picker.Item label="กำลังขับ" value="driving" />
            <Picker.Item label="รอขับ" value="waiting" />
            <Picker.Item label="นอกเวลางาน" value="not work time" />
          </Picker>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={[styles.title, { color: isDark ? "#60a5fa" : "#1565C0" }]}>
        🚗 จัดการคนขับ
      </Text>

      {/* Summary Cards */}
      <View
        style={[
          styles.summaryContainer,
          {
            backgroundColor: isDark ? "#1f2937" : "#E3F2FD",
            borderColor: isDark ? "#374151" : "#BBDEFB",
          },
        ]}
      >
        <View style={styles.summaryItem}>
          <Text
            style={[
              styles.summaryNumber,
              { color: isDark ? "#60a5fa" : "#1565C0" },
            ]}
          >
            {statusCounts.total}
          </Text>
          <Text
            style={[
              styles.summaryLabel,
              { color: isDark ? "#94a3b8" : "#1976D2" },
            ]}
          >
            คนขับทั้งหมด
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: "#10b981" }]}>
            {statusCounts.driving}
          </Text>
          <Text
            style={[
              styles.summaryLabel,
              { color: isDark ? "#94a3b8" : "#1976D2" },
            ]}
          >
            กำลังขับ
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: "#f59e0b" }]}>
            {statusCounts.waiting}
          </Text>
          <Text
            style={[
              styles.summaryLabel,
              { color: isDark ? "#94a3b8" : "#1976D2" },
            ]}
          >
            รอขับ
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: "#ef4444" }]}>
            {statusCounts.notWorkTime}
          </Text>
          <Text
            style={[
              styles.summaryLabel,
              { color: isDark ? "#94a3b8" : "#1976D2" },
            ]}
          >
            นอกเวลางาน
          </Text>
        </View>
      </View>

      {/* Filter Toggle Button */}
      <TouchableOpacity
        style={[
          styles.filterToggleButton,
          {
            backgroundColor: showFilters
              ? isDark
                ? "#3b82f6"
                : "#2196F3"
              : isDark
              ? "#374151"
              : "#64748b",
          },
        ]}
        onPress={() => setShowFilters(!showFilters)}
      >
        <Text style={styles.filterToggleText}>
          {showFilters ? "🔼 ซ่อนตัวกรอง" : "🔽 แสดงตัวกรอง"}
        </Text>
      </TouchableOpacity>

      {/* Filter Section */}
      {showFilters && (
        <View
          style={[
            styles.filtersSection,
            {
              backgroundColor: isDark ? "#1f2937" : "#F5F5F5",
              borderColor: isDark ? "#374151" : "#E0E0E0",
            },
          ]}
        >
          {/* Name Filter */}
          <View style={styles.nameFilterContainer}>
            <Text
              style={[
                styles.filterLabel,
                { color: isDark ? "#60a5fa" : "#1565C0" },
              ]}
            >
              🔍 ค้นหาชื่อ/ID:
            </Text>
            <TextInput
              style={[
                styles.nameFilterInput,
                {
                  backgroundColor: isDark ? "#111827" : "#FFFFFF",
                  borderColor: isDark ? "#374151" : "#BBDEFB",
                  color: isDark ? "#f3f4f6" : "#333",
                },
              ]}
              placeholder="ใส่ชื่อหรือ ID คนขับ..."
              placeholderTextColor={isDark ? "#6b7280" : "#999"}
              value={nameFilter}
              onChangeText={setNameFilter}
            />
            {nameFilter.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setNameFilter("")}
              >
                <Text style={styles.clearButtonText}>✖️</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Status Filter */}
          <View style={styles.statusFilterContainer}>
            <Text
              style={[
                styles.filterLabel,
                { color: isDark ? "#60a5fa" : "#1565C0" },
              ]}
            >
              📊 กรองตามสถานะ:
            </Text>
            <View style={styles.statusFilterButtons}>
              {renderStatusFilterButton("all", "ทั้งหมด")}
              {renderStatusFilterButton("driving", "กำลังขับ")}
              {renderStatusFilterButton("waiting", "รอขับ")}
              {renderStatusFilterButton("not work time", "นอกเวลางาน")}
            </View>
          </View>
        </View>
      )}

      {/* Results Counter */}
      <View
        style={[
          styles.resultsContainer,
          {
            backgroundColor: isDark ? "#1e3a8a" : "#E8F4FD",
            borderColor: isDark ? "#3b82f6" : "#BBDEFB",
          },
        ]}
      >
        <Text
          style={[
            styles.resultsText,
            { color: isDark ? "#bfdbfe" : "#1565C0" },
          ]}
        >
          แสดงผล {filteredDrivers.length} จาก {editableDrivers.length} คน
        </Text>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0f172a" : "#FFFFFF" },
      ]}
    >
      <FlatList
        data={filteredDrivers}
        renderItem={renderDriverCard}
        keyExtractor={(item) => item.driverID}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}
