import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },

  // Category Stats Styles
  categoryStatsContainer: {
    marginBottom: 20,
  },
  categoryStatsGrid: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 3,
  },
  categoryStatsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryStatCard: {
    flex: 1,
    minWidth: "45%",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 1,
  },
  categoryStatIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryStatCount: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  categoryStatLabel: {
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
  },

  // Category Filter Styles
  categoryFilterContainer: {
    marginBottom: 16,
  },
  categoryFilterButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryFilterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 4,
  },
  categoryFilterIcon: {
    fontSize: 14,
  },
  categoryFilterText: {
    fontSize: 12,
    fontWeight: "500",
  },

  // Category Badge in Card
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  categoryIcon: {
    fontSize: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "600",
  },

  summaryCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 4,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  summaryDivider: {
    width: 1,
    height: 40,
    marginHorizontal: 15,
  },

  // Filter Toggle Styles
  filterToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  filterToggleButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 2,
  },
  filterToggleText: {
    fontSize: 16,
    fontWeight: "600",
  },
  filterToggleIcon: {
    fontSize: 14,
    fontWeight: "bold",
  },
  filterIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  filterIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  filterIndicatorText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  clearFiltersButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  clearFiltersText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },

  // Filter Container Styles
  filterContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 3,
    borderWidth: 1,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  filterGrid: {
    gap: 12,
    marginBottom: 16,
  },
  filterInput: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  statusFilterContainer: {
    marginTop: 8,
  },
  statusFilterLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  statusFilterButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterStatusButton: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  filterStatusText: {
    fontSize: 13,
    fontWeight: "600",
  },
  reportCard: {
    borderRadius: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 3,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardHeader: {
    padding: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  busInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  busNumberTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  busNumber: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  driverInfoRow: {
    marginBottom: 12,
  },
  driverLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 2,
  },
  driverName: {
    fontSize: 13,
    fontWeight: "600",
  },
  routeContainer: {
    marginBottom: 16,
  },
  routeLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  route: {
    fontSize: 15,
    fontWeight: "600",
  },
  dateTimeContainer: {
    flexDirection: "row",
    gap: 16,
  },
  dateTimeBox: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  dateTimeLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 13,
    fontWeight: "600",
  },
  expandIndicator: {
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  expandText: {
    fontSize: 13,
    fontWeight: "600",
  },
  expandedContent: {
    padding: 20,
    borderTopWidth: 1,
  },
  separator: {
    height: 1,
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "600",
  },
  reasonContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  reasonTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  reasonText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
  },
  statusSection: {
    marginTop: 8,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },
  statusButtons: {
    gap: 8,
  },
  statusButton: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  statusButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 1,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
  },
});

export default styles;