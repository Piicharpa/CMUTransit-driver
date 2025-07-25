import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface DriverData {
  driverID: string;
  driverName: string;
  status: "driving" | "waiting" | "not work time";
  busNumber: string | null;
}

const driverData: DriverData[] = [
  {
    driverID: 'D-001',
    driverName: 'สมชาย วงศ์ใหญ่',
    status: 'driving',
    busNumber: '1'
  },
  {
    driverID: 'D-002',
    driverName: 'สุปราณี จันทร์เพ็ญ',
    status: 'waiting',
    busNumber: null // No bus when waiting
  },
  {
    driverID: 'D-003',
    driverName: 'สมศักดิ์ แสงทอง',
    status: 'driving',
    busNumber: '2'
  },
  {
    driverID: 'D-004',
    driverName: 'สุกัญญา ทองดี',
    status: 'not work time',
    busNumber: null // No bus when off duty
  },
  {
    driverID: 'D-005',
    driverName: 'วิชัย ศรีสวัสดิ์',
    status: 'waiting',
    busNumber: null // No bus when waiting
  },
  {
    driverID: 'D-006',
    driverName: 'นิรมล เจริญสุข',
    status: 'driving',
    busNumber: '32'
  },
  {
    driverID: 'D-007',
    driverName: 'ประวิทย์ มงคลชัย',
    status: 'not work time',
    busNumber: null // No bus when off duty
  },
  {
    driverID: 'D-008',
    driverName: 'สมหญิง ใจดี',
    status: 'driving',
    busNumber: '40'
  },
  {
    driverID: 'D-009',
    driverName: 'รุ่งโรจน์ พรหมมี',
    status: 'waiting',
    busNumber: null // No bus when waiting
  },
  {
    driverID: 'D-010',
    driverName: 'สุมลลี ดาวเด่น',
    status: 'driving',
    busNumber: '41'
  },
  {
    driverID: 'D-011',
    driverName: 'อนุชิต บุญเรือง',
    status: 'driving',
    busNumber: '3'
  },
  {
    driverID: 'D-012',
    driverName: 'จินดา รัตนพงษ์',
    status: 'waiting',
    busNumber: null // No bus when waiting
  },
  {
    driverID: 'D-013',
    driverName: 'ธนวัฒน์ สุขใส',
    status: 'driving',
    busNumber: '8'
  },
  {
    driverID: 'D-014',
    driverName: 'พิมพ์ใจ มณีรัตน์',
    status: 'not work time',
    busNumber: null // No bus when off duty
  },
  {
    driverID: 'D-015',
    driverName: 'กฤษณะ ทองคำ',
    status: 'driving',
    busNumber: '12'
  },
  {
    driverID: 'D-016',
    driverName: 'มาลัย ดอกไม้',
    status: 'waiting',
    busNumber: null // No bus when waiting
  },
  {
    driverID: 'D-017',
    driverName: 'สิทธิชัย รุ่งเรือง',
    status: 'driving',
    busNumber: '50'
  },
  {
    driverID: 'D-018',
    driverName: 'วันทนา สายทอง',
    status: 'driving',
    busNumber: '30'
  },
  {
    driverID: 'D-019',
    driverName: 'บัณฑิต ขจรศักดิ์',
    status: 'not work time',
    busNumber: null // No bus when off duty
  },
  {
    driverID: 'D-020',
    driverName: 'ณัฐชา บุญมี',
    status: 'waiting',
    busNumber: null // No bus when waiting
  }
];

export default function Driver_Managing() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [editableDrivers, setEditableDrivers] =
    useState<DriverData[]>(driverData);

  // ตัวแปรเก็บ driver ที่กำลังแก้ไข busNumber
  const [editingDriverID, setEditingDriverID] = useState<string | null>(null);
  const [busNumberInput, setBusNumberInput] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "driving":
        return "#4CAF50";
      case "waiting":
        return "#FF9800";
      case "not work time":
        return "#F44336";
      default:
        return "#757575";
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

  // เริ่มแก้ไข เลขรถ (เปิด input พร้อมค่าเดิม)
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
      // ไม่อนุญาตให้เป็นค่าว่าง
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

  const filteredDrivers =
    selectedStatus === "all"
      ? editableDrivers
      : editableDrivers.filter((driver) => driver.status === selectedStatus);

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

  const renderFilterButton = (status: string, label: string) => (
    <TouchableOpacity
      key={status}
      style={[
        styles.filterButton,
        selectedStatus === status && styles.activeFilterButton,
      ]}
      onPress={() => setSelectedStatus(status)}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedStatus === status && styles.activeFilterButtonText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderDriverCard = ({ item }: { item: DriverData }) => (
    <View style={styles.driverCard}>
      <View style={styles.driverHeader}>
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{item.driverName}</Text>
          <Text style={styles.driverID}>ID: {item.driverID}</Text>
        </View>

        {/* แสดง input หรือ bus number ตามสถานะแก้ไข */}
        {editingDriverID === item.driverID ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={[styles.busNumberInput]}
              value={busNumberInput}
              onChangeText={setBusNumberInput}
              placeholder="เลขรถ"
              keyboardType="numeric"
              maxLength={4}
              autoFocus
            />
            <TouchableOpacity onPress={saveBusNumber} style={styles.saveButton}>
              <Text style={{ color: "#fff" }}>บันทึก</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={cancelEditing}
              style={styles.cancelButton}
            >
              <Text style={{ color: "#fff" }}>ยกเลิก</Text>
            </TouchableOpacity>
          </View>
        ) : item.busNumber ? (
          <View style={styles.busNumberContainer}>
            <Text style={styles.busNumberLabel}>Bus</Text>
            <Text style={styles.busNumber}>{item.busNumber}</Text>
          </View>
        ) : (
          <View style={styles.noBusContainer}>
            <Text style={styles.noBusText}>No Bus</Text>
            <Text style={styles.noBusSubtext}>Assigned</Text>
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

      {/* Control area */}
      <View style={styles.controlContainer}>
        {(item.status === "driving" || item.status === "waiting") &&
          editingDriverID !== item.driverID && (
            <TouchableOpacity
              onPress={() =>
                startEditingBusNumber(item.driverID, item.busNumber)
              }
            >
              <Text style={styles.editButton}>แก้ไขรถ</Text>
            </TouchableOpacity>
          )}

        <Picker
          selectedValue={item.status}
          onValueChange={(value) =>
            handleStatusChange(item.driverID, value as DriverData["status"])
          }
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="กำลังขับ" value="driving" />
          <Picker.Item label="รอขับ" value="waiting" />
          <Picker.Item label="นอกเวลางาน" value="not work time" />
        </Picker>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Driver Dashboard</Text>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{statusCounts.total}</Text>
          <Text style={styles.summaryLabel}>คนขับทั้งหมด</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: "#4CAF50" }]}>
            {statusCounts.driving}
          </Text>
          <Text style={styles.summaryLabel}>กำลังขับ</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: "#FF9800" }]}>
            {statusCounts.waiting}
          </Text>
          <Text style={styles.summaryLabel}>รอขับ</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: "#F44336" }]}>
            {statusCounts.notWorkTime}
          </Text>
          <Text style={styles.summaryLabel}>นอกเวลางาน</Text>
        </View>
      </View>
      <View style={styles.filterContainer}>
        {renderFilterButton("all", "All")}
        {renderFilterButton("driving", "กำลังขับ")}
        {renderFilterButton("waiting", "รอขับ")}
        {renderFilterButton("not work time", "นอกเวลางาน")}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    paddingTop: 50,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#333842",
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryNumber: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  summaryLabel: {
    color: "#B0B0B0",
    fontSize: 12,
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#404855",
  },
  activeFilterButton: {
    backgroundColor: "#007AFF",
  },
  filterButtonText: {
    color: "#B0B0B0",
    fontSize: 12,
    fontWeight: "500",
  },
  activeFilterButtonText: {
    color: "#fff",
  },
  driverCard: {
    backgroundColor: "#333842",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  driverHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  driverID: {
    color: "#B0B0B0",
    fontSize: 12,
  },
  busNumberContainer: {
    alignItems: "center",
    backgroundColor: "#404855",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  busNumberLabel: {
    color: "#B0B0B0",
    fontSize: 10,
    marginBottom: 2,
  },
  busNumber: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  busNumberInput: {
    backgroundColor: "#404855",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 80,
    marginRight: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: "#F44336",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  noBusContainer: {
    alignItems: "center",
    backgroundColor: "#404855",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    opacity: 0.6,
  },
  noBusText: {
    color: "#B0B0B0",
    fontSize: 12,
    fontWeight: "500",
  },
  noBusSubtext: {
    color: "#888",
    fontSize: 10,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButton: {
    color: "#007AFF",
    fontSize: 12,
    marginTop: 4,
  },
  picker: {
    height: 40,
    width: 160,
    color: "#fff",
    backgroundColor: "#404855",
    borderRadius: 8,
  },
});
