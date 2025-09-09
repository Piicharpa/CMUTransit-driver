import { StyleSheet, Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    marginBottom: 16,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  // Connection status indicator styles used by dashboard component
  connectionStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    opacity: 0.8,
  },
  filterDescription: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  actionButtons: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 3,
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 4,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  tableContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    alignItems: "center",
    minHeight: 56,
  },
  busNumberColumn: {
    flex: 1.2,
    alignItems: "center",
    paddingHorizontal: 2,
  },
  routeColumn: {
    flex: 2.2,
    alignItems: "center",
    paddingHorizontal: 2,
  },
  dateColumn: {
    flex: 1.8,
    alignItems: "center",
    paddingHorizontal: 2,
  },
  timeColumn: {
    flex: 2,
    alignItems: "center",
    paddingHorizontal: 2,
  },
  actionColumn: {
    flex: 1.3,
    alignItems: "center",
    paddingHorizontal: 2,
  },
  busNumber: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 3,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  onlineStatus: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },
  speedText: {
    fontSize: 10,
    marginTop: 2,
  },
  routeText: {
    fontSize: 11,
    textAlign: "center",
    lineHeight: 14,
  },
  timeText: {
    fontSize: 11,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 14,
  },
  lastUpdateText: {
    fontSize: 10,
    marginTop: 2,
  },
  reportButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    minWidth: 50,
  },
  reportButtonText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "600",
  },
  selectButton: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    minWidth: 48,
  },
  selectButtonText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
  },
  list: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    ...Platform.select({
      ios: {
        zIndex: 999,
      },
      android: {
        elevation: 999,
      },
    }),
  },
  modalContent: {
    borderRadius: 16,
    padding: 20,
    width: width * 0.95,
    maxHeight: height * 0.85,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  modalBody: {
    maxHeight: height * 0.55,
  },
  // MQTT status row inside report modal
  mqttStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: 12,
  },
  mqttStatusLabel: {
    fontSize: 12,
  },
  mqttStatusValue: {
    fontSize: 12,
    fontWeight: "600",
  },
  inputContainer: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    minHeight: 44,
    ...Platform.select({
      ios: {
        paddingTop: 12,
        paddingBottom: 12,
      },
    }),
  },
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
    ...Platform.select({
      ios: {
        paddingTop: 12,
      },
    }),
  },
  // Real-time bus info box in report modal
  busInfoContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  busInfoTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "left",
  },
  busInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  busInfoLabel: {
    fontSize: 12,
    opacity: 0.8,
  },
  busInfoValue: {
    fontSize: 12,
    fontWeight: "600",
  },
  categorySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    minHeight: 44,
  },
  categoryDisplay: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryDisplayIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryDisplayText: {
    fontSize: 14,
    fontWeight: "500",
  },
  dropdownArrow: {
    fontSize: 12,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#6b7280",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    minHeight: 44,
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  sendButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    minHeight: 44,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  // Historical Modal Styles
  historicalModalContent: {
    borderRadius: 16,
    padding: 20,
    width: width * 0.95,
    maxHeight: height * 0.85,
    borderWidth: 1,
    minHeight: 400,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  historicalModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  historicalModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
  },
  historicalModalBody: {
    flex: 1,
    minHeight: 300,
  },
  closeButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        backgroundColor: "rgba(107, 114, 128, 0.1)",
      },
    }),
  },
  closeButtonText: {
    fontSize: 18,
    color: "#6b7280",
    fontWeight: "bold",
  },
  filterContainer: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  filterRow: {
    marginBottom: 16,
  },
  filterInput: {
    flex: 1,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  filterTextInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    minHeight: 48,
    ...Platform.select({
      ios: {
        paddingTop: 12,
        paddingBottom: 12,
      },
    }),
  },
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
  },
  clearButton: {
    backgroundColor: "#6b7280",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minHeight: 36,
    justifyContent: "center",
  },
  clearButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
  },
  resultsText: {
    fontSize: 12,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
    marginLeft: 8,
  },
  // Category Modal Styles
  categoryModalContent: {
    borderRadius: 16,
    padding: 20,
    width: width * 0.9,
    maxHeight: height * 0.6,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        zIndex: 1001, // สูงกว่า modal อื่นๆ
      },
      android: {
        elevation: 12,
      },
    }),
  },
  categoryModalTitle: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  categoryOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    minHeight: 52,
    ...Platform.select({
      ios: {
        borderRadius: 8,
        marginBottom: 2,
      },
    }),
  },
  categoryIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 32,
    textAlign: "center",
  },
  categoryOptionText: {
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
  },
  // เพิ่ม style สำหรับ selected category icon
  categorySelectedIcon: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  // เพิ่ม styles สำหรับ press states ใน iOS
  categoryOptionPressed: {
    ...Platform.select({
      ios: {
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        transform: [{ scale: 0.98 }],
      },
    }),
  },
  // เพิ่ม styles สำหรับปรับปรุง modal overlay ใน iOS
  categoryModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    ...Platform.select({
      ios: {
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // เข้มกว่าเล็กน้อยสำหรับ iOS
      },
      android: {
        elevation: 1000,
      },
    }),
  },
});

export default styles;
