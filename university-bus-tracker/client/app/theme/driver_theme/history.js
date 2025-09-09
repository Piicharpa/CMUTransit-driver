// theme/history.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: { fontSize: 14, marginBottom: 16, textAlign: "center" },
  statsContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: { alignItems: "center" },
  statValue: { fontSize: 18, fontWeight: "bold" },
  statLabel: { fontSize: 12 },
  statDivider: { width: 1, height: "100%" },
  filterSection: { marginBottom: 16 },
  filterTitle: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  filterContent: { paddingHorizontal: 4 },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  filterButtonText: { fontSize: 14, fontWeight: "500" },
  historyCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  busNumberCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  busNumber: { color: "#fff", fontWeight: "bold" },
  historyInfo: { flex: 1 },
  routeText: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  dateText: { fontSize: 12 },
  timeText: { fontSize: 12 },
  workingHours: {
    padding: 4,
    borderRadius: 8,
    marginTop: 6,
    alignSelf: "flex-start",
  },
  hoursText: { fontSize: 12, fontWeight: "600" },
});

export default styles;