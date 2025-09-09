import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 3,
    borderWidth: 1,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  summaryLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  
  // Filter Toggle Button
  filterToggleButton: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 3,
  },
  filterToggleText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  
  // Filters Section
  filtersSection: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 2,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  
  // Name Filter
  nameFilterContainer: {
    marginBottom: 16,
    position: "relative",
  },
  nameFilterInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    paddingRight: 50, // เว้นพื้นที่สำหรับปุ่ม clear
  },
  clearButton: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
  },
  clearButtonText: {
    fontSize: 16,
  },
  
  // Status Filter
  statusFilterContainer: {
    marginBottom: 8,
  },
  statusFilterButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
    minWidth: "22%",
    alignItems: "center",
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: "500",
  },
  
  // Results Counter
  resultsContainer: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: "500",
  },
  
  // Driver Cards
  driverCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 4,
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  driverID: {
    fontSize: 12,
  },
  busNumberContainer: {
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 60,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 2,
  },
  busNumberLabel: {
    fontSize: 10,
    marginBottom: 2,
    fontWeight: "500",
  },
  busNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  busNumberInput: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 80,
    marginRight: 8,
    fontSize: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 1,
  },
  saveButton: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 3,
  },
  cancelButton: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 3,
  },
  noBusContainer: {
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    opacity: 0.7,
    minWidth: 60,
  },
  noBusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  noBusSubtext: {
    fontSize: 10,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
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
    color: "#FFFFFF",
    fontSize: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 3,
  },
  pickerContainer: {
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 2,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
    width: 160,
  },
});

export default styles;