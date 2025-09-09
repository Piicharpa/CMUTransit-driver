// theme/reportHistory.ts
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  headerContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 6,
    borderWidth: 1,
    width: "100%",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 16,
  },
  filterContainer: {
    marginBottom: 20,
    width: "100%",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  filterButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    marginBottom: 8,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },
  reportCard: {
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    boxShadow: "0px 8px 16px rgba(59,130,246,0.3)",
    elevation: 8,
    borderWidth: 1,
    flexDirection: "row",
  },
  priorityIndicator: {
    width: 6,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    padding: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "700",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "800",
    flex: 1,
    marginRight: 12,
    lineHeight: 24,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: "800",
  },
  busInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  busNumberText: {
    fontSize: 16,
    fontWeight: "700",
  },
  routeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateTimeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  expandButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  expandText: {
    fontSize: 13,
    fontWeight: "600",
  },
  expandArrow: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expandedContent: {
    marginTop: 0,
  },
  separator: {
    height: 1,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  detailsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
  },
  detailsGrid: {
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
    textAlign: "right",
  },
  reasonSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  reasonContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  reasonText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default styles;
