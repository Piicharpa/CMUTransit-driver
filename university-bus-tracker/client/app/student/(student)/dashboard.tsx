import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";

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

const busData: BusData[] = [
  // Original buses (id 1-2)
  {
    id: "1",
    busNumber: "1",
    route: "1 - Purple Line",
    startTime: "07:20",
    endTime: "09:30",
    status: "online",
    operatingDate: "2025-07-23",
    lastUpdate: "14:30",
  },
  {
    id: "2",
    busNumber: "30",
    route: "1 - Purple Line",
    startTime: "07:30",
    endTime: "21:30",
    status: "online",
    operatingDate: "2025-07-23",
    lastUpdate: "14:25",
  },
  
  // Purple Line buses (based on id 1-2 pattern)
  {
    id: "3",
    busNumber: "2",
    route: "1 - Purple Line",
    startTime: "07:00",
    endTime: "09:45",
    status: "online",
    operatingDate: "2025-07-23",
    lastUpdate: "14:15",
  },
  {
    id: "4",
    busNumber: "31",
    route: "1 - Purple Line",
    startTime: "07:45",
    endTime: "21:15",
    status: "online",
    operatingDate: "2025-07-23",
    lastUpdate: "14:35",
  },
  {
    id: "5",
    busNumber: "3",
    route: "1 - Purple Line",
    startTime: "07:10",
    endTime: "09:20",
    status: "online",
    operatingDate: "2025-07-23",
    lastUpdate: "14:20",
  },
  {
    id: "6",
    busNumber: "32",
    route: "1 - Purple Line",
    startTime: "08:00",
    endTime: "21:45",
    status: "online",
    operatingDate: "2025-07-23",
    lastUpdate: "14:40",
  },
  
  // Red Line buses (similar pattern)
  {
    id: "7",
    busNumber: "5",
    route: "2 - Red Line",
    startTime: "06:30",
    endTime: "10:00",
    status: "online",
    operatingDate: "2025-07-23",
    lastUpdate: "13:45",
  },
  {
    id: "8",
    busNumber: "40",
    route: "2 - Red Line",
    startTime: "06:45",
    endTime: "22:00",
    status: "online",
    operatingDate: "2025-07-23",
    lastUpdate: "13:50",
  },
  {
    id: "9",
    busNumber: "6",
    route: "2 - Red Line",
    startTime: "06:20",
    endTime: "10:15",
    status: "online",
    operatingDate: "2025-07-23",
    lastUpdate: "13:30",
  },
  {
    id: "10",
    busNumber: "41",
    route: "2 - Red Line",
    startTime: "07:00",
    endTime: "22:15",
    status: "online",
    operatingDate: "2025-07-23",
    lastUpdate: "14:00",
  },
  
  // Blue Line buses
  {
    id: "11",
    busNumber: "8",
    route: "3 - Blue Line",
    startTime: "06:00",
    endTime: "09:30",
    status: "online",
    operatingDate: "2025-07-23",
    lastUpdate: "15:10",
  },
  {
    id: "12",
    busNumber: "50",
    route: "3 - Blue Line",
    startTime: "06:15",
    endTime: "21:30",
    status: "online",
    operatingDate: "2025-07-23",
    lastUpdate: "15:05",
  },
  {
    id: "13",
    busNumber: "9",
    route: "3 - Blue Line",
    startTime: "06:45",
    endTime: "09:45",
    status: "online",
    operatingDate: "2025-07-23",
    lastUpdate: "15:15",
  },
  
  // Green Line buses
  {
    id: "14",
    busNumber: "12",
    route: "4 - Green Line",
    startTime: "05:45",
    endTime: "08:30",
    status: "online",
    operatingDate: "2025-07-23",
    lastUpdate: "16:20",
  },
  {
    id: "15",
    busNumber: "60",
    route: "4 - Green Line",
    startTime: "06:00",
    endTime: "20:45",
    status: "online",
    operatingDate: "2025-07-23",
    lastUpdate: "16:25",
  },
  
  // Some buses from previous day
  {
    id: "16",
    busNumber: "4",
    route: "1 - Purple Line",
    startTime: "07:15",
    endTime: "09:30",
    status: "online",
    operatingDate: "2025-07-22",
    lastUpdate: "18:30",
  },
  {
    id: "17",
    busNumber: "33",
    route: "1 - Purple Line",
    startTime: "07:50",
    endTime: "21:20",
    status: "online",
    operatingDate: "2025-07-22",
    lastUpdate: "18:45",
  },
  {
    id: "18",
    busNumber: "7",
    route: "2 - Red Line",
    startTime: "06:30",
    endTime: "10:00",
    status: "online",
    operatingDate: "2025-07-22",
    lastUpdate: "17:15",
  },
  {
    id: "19",
    busNumber: "7",
    route: "2 - Red Line",
    startTime: "06:30",
    endTime: null,
    status: "online",
    operatingDate: "2025-07-22",
    lastUpdate: "17:15",
  },
];

export default function Bus_Dashboard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBus, setSelectedBus] = useState("");
  const [accidentTime, setAccidentTime] = useState("");
  const [reason, setReason] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterTime, setFilterTime] = useState("");
  const [filteredBuses, setFilteredBuses] = useState<BusData[]>(busData);

  useEffect(() => {
    let filtered = busData;
    if (filterDate.trim())
      filtered = filtered.filter((bus) => bus.operatingDate === filterDate);
    if (filterTime.trim())
      filtered = filtered.filter((bus) => bus.lastUpdate === filterTime);
    setFilteredBuses(filtered);
  }, [filterDate, filterTime]);

  const clearFilters = () => {
    setFilterDate("");
    setFilterTime("");
  };

  const handleReport = (busNumber: string) => {
    setSelectedBus(busNumber);
    setModalVisible(true);
  };

  const handleSendReport = () => {
    if (!accidentTime.trim() || !reason.trim()) {
      Alert.alert("Error", "Please fill in both accident time and reason");
      return;
    }
    Alert.alert(
      "Report Sent",
      `Report for bus ${selectedBus} has been submitted successfully.\nTime: ${accidentTime}\nReason: ${reason}`,
      [
        {
          text: "OK",
          onPress: () => {
            setModalVisible(false);
            setAccidentTime("");
            setReason("");
            setSelectedBus("");
          },
        },
      ]
    );
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setAccidentTime("");
    setReason("");
    setSelectedBus("");
  };

  const renderBusRow = ({ item }: { item: BusData }) => (
    <View style={styles.tableRow}>
      <View style={styles.busNumberColumn}>
        <Text style={styles.busNumber}>{item.busNumber}</Text>
        <View style={styles.statusContainer}>
          <View style={styles.onlineStatus} />
          <Text style={styles.statusText}>Online</Text>
        </View>
      </View>
      <View style={styles.routeColumn}>
        <Text style={styles.routeText}>{item.route}</Text>
      </View>
      <View style={styles.dateColumn}>
        <Text style={styles.routeText}>{item.operatingDate}</Text>
      </View>
      <View style={styles.timeColumn}>
        <Text style={styles.timeText}>
          {item.startTime} - {item.endTime == null ? "Now" : item.endTime}
        </Text>
      </View>
      <View style={styles.actionColumn}>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => handleReport(item.busNumber)}
        >
          <Text style={styles.reportButtonText}>Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Online Bus Dashboard</Text>

      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filters</Text>
        <View style={styles.filterRow}>
          <View style={styles.filterInput}>
            <Text style={styles.filterLabel}>Date</Text>
            <TextInput
              style={styles.filterTextInput}
              value={filterDate}
              onChangeText={setFilterDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.filterInput}>
            <Text style={styles.filterLabel}>Last Update Time</Text>
            <TextInput
              style={styles.filterTextInput}
              value={filterTime}
              onChangeText={setFilterTime}
              placeholder="HH:MM"
              placeholderTextColor="#888"
            />
          </View>
        </View>
        <View style={styles.filterButtons}>
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearButtonText}>Clear Filters</Text>
          </TouchableOpacity>
          <Text style={styles.resultsText}>
            Showing {filteredBuses.length} of {busData.length} buses
          </Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.busNumberColumn]}>Bus #</Text>
          <Text style={[styles.headerText, styles.routeColumn]}>Route</Text>
          <Text style={[styles.headerText, styles.dateColumn]}>Date</Text>
          <Text style={[styles.headerText, styles.timeColumn]}>Time</Text>
          <Text style={[styles.headerText, styles.actionColumn]}>Action</Text>
        </View>
        <FlatList
          data={filteredBuses}
          renderItem={renderBusRow}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Report Accident - {selectedBus}
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Accident Time</Text>
              <TextInput
                style={styles.textInput}
                value={accidentTime}
                onChangeText={setAccidentTime}
                placeholder="Enter accident time (e.g., 14:30)"
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Reason</Text>
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                value={reason}
                onChangeText={setReason}
                placeholder="Describe the accident or issue..."
                placeholderTextColor="#888"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendReport}
              >
                <Text style={styles.sendButtonText}>Send Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  tableContainer: {
    flex: 1,
    backgroundColor: "#333842",
    borderRadius: 12,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#404855",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  headerText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#404855",
    alignItems: "center",
  },
  busNumberColumn: { flex: 1.5, alignItems: "center" },
  routeColumn: { flex: 3, alignItems: "center" },
  timeColumn: { flex: 2, alignItems: "center" },
  dateColumn: { flex: 2, alignItems: "center" },
  actionColumn: { flex: 1.5, alignItems: "center" },
  busNumber: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statusContainer: { flexDirection: "row", alignItems: "center" },
  onlineStatus: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4CAF50",
    marginRight: 4,
  },
  statusText: { color: "#4CAF50", fontSize: 10, fontWeight: "500" },
  routeText: { color: "#B0B0B0", fontSize: 14 },
  timeText: { color: "#fff", fontSize: 14, textAlign: "center" },
  reportButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  reportButtonText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#333842",
    borderRadius: 12,
    padding: 20,
    width: "85%",
    maxWidth: 400,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: { marginBottom: 16 },
  inputLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#25292e",
    borderWidth: 1,
    borderColor: "#404855",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#fff",
    fontSize: 14,
  },
  multilineInput: { height: 80, textAlignVertical: "top" },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#666",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginLeft: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  filterContainer: {
    backgroundColor: "#333842",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  filterTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  filterInput: { flex: 1, marginHorizontal: 4 },
  filterLabel: { color: "#B0B0B0", fontSize: 12, marginBottom: 4 },
  filterTextInput: {
    backgroundColor: "#25292e",
    borderWidth: 1,
    borderColor: "#404855",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    color: "#fff",
    fontSize: 12,
  },
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#666",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  clearButtonText: { color: "#fff", fontSize: 12, fontWeight: "500" },
  resultsText: { color: "#B0B0B0", fontSize: 12 },
});
