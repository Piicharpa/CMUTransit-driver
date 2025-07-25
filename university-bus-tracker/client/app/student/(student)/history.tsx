import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

interface ReportHistory {
  id: string;
  busNumber: string;
  route: string;
  accidentDate: string;
  accidentTime: string;
  reportDate: string;
  reportTime: string;
  reason: string;
}

const reportHistoryData: ReportHistory[] = [
  {
    id: "1",
    busNumber: "B-101",
    route: "Downtown - Airport",
    accidentDate: "2025-01-15",
    accidentTime: "14:30",
    reportDate: "2025-01-15",
    reportTime: "14:35",
    reason: "Engine malfunction caused sudden stop",
  },
  {
    id: "2",
    busNumber: "B-205",
    route: "University - Mall",
    accidentDate: "2025-01-14",
    accidentTime: "09:15",
    reportDate: "2025-01-14",
    reportTime: "09:20",
    reason: "Minor collision with parked vehicle at bus stop",
  },
  {
    id: "3",
    busNumber: "B-312",
    route: "Station - Beach",
    accidentDate: "2025-01-14",
    accidentTime: "16:45",
    reportDate: "2025-01-14",
    reportTime: "16:50",
    reason: "Passenger injury due to sudden braking",
  },
  {
    id: "4",
    busNumber: "B-458",
    route: "City Center - Suburbs",
    accidentDate: "2025-01-13",
    accidentTime: "11:20",
    reportDate: "2025-01-13",
    reportTime: "11:25",
    reason: "Tire puncture during regular service",
  },
  {
    id: "5",
    busNumber: "B-567",
    route: "North Side - South Side",
    accidentDate: "2025-01-12",
    accidentTime: "13:50",
    reportDate: "2025-01-12",
    reportTime: "13:55",
    reason: "Door malfunction trapping passengers",
  },
  {
    id: "6",
    busNumber: "B-101",
    route: "Downtown - Airport",
    accidentDate: "2025-01-12",
    accidentTime: "08:30",
    reportDate: "2025-01-12",
    reportTime: "08:35",
    reason: "Late arrival due to traffic accident blocking route",
  },
  {
    id: "7",
    busNumber: "B-789",
    route: "Industrial Area - Downtown",
    accidentDate: "2025-01-11",
    accidentTime: "17:15",
    reportDate: "2025-01-11",
    reportTime: "17:20",
    reason: "Air conditioning system failure during peak hours",
  },
  {
    id: "8",
    busNumber: "B-312",
    route: "Station - Beach",
    accidentDate: "2025-01-10",
    accidentTime: "12:40",
    reportDate: "2025-01-10",
    reportTime: "12:45",
    reason: "Broken window due to vandalism",
  },
];

export default function Report_History() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const renderReportItem = ({ item }: { item: ReportHistory }) => {
    const isExpanded = expandedItem === item.id;

    return (
      <TouchableOpacity
        style={styles.reportCard}
        onPress={() => toggleExpanded(item.id)}
        activeOpacity={0.7}
      >
        {/* Header Section - Always Visible */}
        <View style={styles.cardHeader}>
          <View style={styles.busInfo}>
            <Text style={styles.busNumber}>{item.busNumber}</Text>
          </View>
          <Text style={styles.route}>{item.route}</Text>
          <Text style={styles.dateTime}>
            วัน/เวลาที่เกิดเหตุ: {item.accidentDate}, {item.accidentTime}
          </Text>
        </View>

        {/* Expanded Details */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.separator} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>วันที่รายงาน:</Text>
              <Text style={styles.detailValue}>{item.reportDate}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>เวลาที่ส่งรายงาน:</Text>
              <Text style={styles.detailValue}>{item.reportTime}</Text>
            </View>

            <View style={styles.reasonContainer}>
              <Text style={styles.detailLabel}>เนื้อหา:</Text>
              <Text style={styles.reasonText}>{item.reason}</Text>
            </View>
          </View>
        )}

        {/* Expand/Collapse Indicator */}
        <View style={styles.expandIndicator}>
          <Text style={styles.expandText}>
            {isExpanded ? "กดเพื่อปิด" : "กดเพื่อดูเนื้อหาทั้งหมด"}
          </Text>
          <Text style={styles.expandArrow}>{isExpanded ? "▲" : "▼"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>ประวัติการรายงาน</Text>
      <Text style={styles.subtitle}>
        รายงานทั้งหมด: {reportHistoryData.length}
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>ยังไม่เคยรายงาน</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reportHistoryData}
        renderItem={renderReportItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
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
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    color: "#B0B0B0",
    fontSize: 14,
  },
  reportCard: {
    backgroundColor: "#333842",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  cardHeader: {
    padding: 16,
  },
  busInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  busNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  route: {
    color: "#B0B0B0",
    fontSize: 14,
    marginBottom: 8,
  },
  dateTime: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  separator: {
    height: 1,
    backgroundColor: "#404855",
    marginBottom: 12,
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  detailLabel: {
    color: "#B0B0B0",
    fontSize: 12,
    fontWeight: "500",
    flex: 1,
  },
  detailValue: {
    color: "#fff",
    fontSize: 12,
    flex: 1,
    textAlign: "right",
  },
  reasonContainer: {
    marginTop: 8,
  },
  reasonText: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
    fontStyle: "italic",
  },
  expandIndicator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#404855",
  },
  expandText: {
    color: "#B0B0B0",
    fontSize: 10,
  },
  expandArrow: {
    color: "#B0B0B0",
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: "#B0B0B0",
    fontSize: 16,
  },
});
