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
  driverName: string; // Added driver name
}

const reportHistoryData: ReportHistory[] = [
  {
    id: "1",
    busNumber: "B-101",
    route: "สยาม - สุวรรณภูมิ",
    accidentDate: "2025-01-15",
    accidentTime: "14:30",
    reportDate: "2025-01-15",
    reportTime: "14:35",
    reason: "เครื่องยนต์มีปัญหาทำให้รถหยุดกะทันหัน",
    driverName: "สมชาย วงศ์ใหญ่"
  },
  {
    id: "2",
    busNumber: "B-205",
    route: "มหาวิทยาลัย - เซ็นทรัลลาดพร้าว",
    accidentDate: "2025-01-14",
    accidentTime: "09:15",
    reportDate: "2025-01-14",
    reportTime: "09:20",
    reason: "ชนรถที่จอดอยู่ที่ป้ายรถเมล์เล็กน้อย",
    driverName: "สุปราณี จันทร์เพ็ญ"
  },
  {
    id: "3",
    busNumber: "B-312",
    route: "สถานีรถไฟ - พัทยา",
    accidentDate: "2025-01-14",
    accidentTime: "16:45",
    reportDate: "2025-01-14",
    reportTime: "16:50",
    reason: "ผู้โดยสารได้รับบาดเจ็บจากการเบรกกะทันหัน",
    driverName: "สมศักดิ์ แสงทอง"
  },
  {
    id: "4",
    busNumber: "B-458",
    route: "ศูนย์เมือง - ชานเมือง",
    accidentDate: "2025-01-13",
    accidentTime: "11:20",
    reportDate: "2025-01-13",
    reportTime: "11:25",
    reason: "ยางรถแตกขณะให้บริการปกติ",
    driverName: "สุกัญญา ทองดี"
  },
  {
    id: "5",
    busNumber: "B-567",
    route: "หมอชิต - บางแค",
    accidentDate: "2025-01-12",
    accidentTime: "13:50",
    reportDate: "2025-01-12",
    reportTime: "13:55",
    reason: "ประตูรถเสียทำให้ผู้โดยสารติดอยู่",
    driverName: "วิชัย ศรีสวัสดิ์"
  },
  {
    id: "6",
    busNumber: "B-101",
    route: "สยาม - สุวรรณภูมิ",
    accidentDate: "2025-01-12",
    accidentTime: "08:30",
    reportDate: "2025-01-12",
    reportTime: "08:35",
    reason: "เดินทางล่าช้าเนื่องจากอุบัติเหตุบนเส้นทาง",
    driverName: "นิรมล เจริญสุข"
  },
  {
    id: "7",
    busNumber: "B-789",
    route: "ลาดกระบัง - อโศก",
    accidentDate: "2025-01-11",
    accidentTime: "17:15",
    reportDate: "2025-01-11",
    reportTime: "17:20",
    reason: "เครื่องปรับอากาศเสียในช่วงเวลาเร่งด่วน",
    driverName: "ประวิทย์ มงคลชัย"
  },
  {
    id: "8",
    busNumber: "B-312",
    route: "สถานีรถไฟ - พัทยา",
    accidentDate: "2025-01-10",
    accidentTime: "12:40",
    reportDate: "2025-01-10",
    reportTime: "12:45",
    reason: "กระจกหน้าต่างแตกจากการทำลาย",
    driverName: "สมหญิง ใจดี"
  },
  {
    id: "9",
    busNumber: "1",
    route: "1 - สายสีม่วง",
    accidentDate: "2025-01-09",
    accidentTime: "07:45",
    reportDate: "2025-01-09",
    reportTime: "07:50",
    reason: "ออกเดินทางล่าช้าจากปัญหาระบบเครื่องยนต์",
    driverName: "รุ่งโรจน์ พรหมมี"
  },
  {
    id: "10",
    busNumber: "30",
    route: "1 - สายสีม่วง",
    accidentDate: "2025-01-08",
    accidentTime: "15:20",
    reportDate: "2025-01-08",
    reportTime: "15:25",
    reason: "ชนกันเล็กน้อยที่แยกไฟแดง",
    driverName: "สุมลลี ดาวเด่น"
  },
  {
    id: "11",
    busNumber: "2",
    route: "2 - สายสีแดง",
    accidentDate: "2025-01-07",
    accidentTime: "10:15",
    reportDate: "2025-01-07",
    reportTime: "10:20",
    reason: "ผู้โดยสารล้มขณะรถเบรก",
    driverName: "อนุชิต บุญเรือง"
  },
  {
    id: "12",
    busNumber: "40",
    route: "2 - สายสีแดง",
    accidentDate: "2025-01-06",
    accidentTime: "16:30",
    reportDate: "2025-01-06",
    reportTime: "16:35",
    reason: "เครื่องยนต์ร้อนเกินไปในช่วงรถติด",
    driverName: "จินดา รัตนพงษ์"
  },
  {
    id: "13",
    busNumber: "8",
    route: "3 - สายสีฟ้า",
    accidentDate: "2025-01-05",
    accidentTime: "13:20",
    reportDate: "2025-01-05",
    reportTime: "13:25",
    reason: "ระบบเบรกมีปัญหาขณะจอดรถ",
    driverName: "ธนวัฒน์ สุขใส"
  },
  {
    id: "14",
    busNumber: "50",
    route: "3 - สายสีฟ้า",
    accidentDate: "2025-01-04",
    accidentTime: "11:45",
    reportDate: "2025-01-04",
    reportTime: "11:50",
    reason: "ระบ บไฟฟ้าในรถขัดข้อง",
    driverName: "พิมพ์ใจ มณีรัตน์"
  },
  {
    id: "15",
    busNumber: "12",
    route: "4 - สายสีเขียว",
    accidentDate: "2025-01-03",
    accidentTime: "08:10",
    reportDate: "2025-01-03",
    reportTime: "08:15",
    reason: "ชนรถมอเตอร์ไซค์เล็กน้อยที่สี่แยก",
    driverName: "กฤษณะ ทองคำ"
  }
];

export default function All_Report() {
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
            <View style={styles.driverInfo}>
              <Text style={styles.driverLabel}>Driver:</Text>
              <Text style={styles.driverName}>{item.driverName}</Text>
            </View>
          </View>
          <Text style={styles.route}>{item.route}</Text>
          <Text style={styles.dateTime}>
            Accident: {item.accidentDate} at {item.accidentTime}
          </Text>
        </View>

        {/* Expanded Details */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.separator} />
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Report Date:</Text>
              <Text style={styles.detailValue}>{item.reportDate}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Report Time:</Text>
              <Text style={styles.detailValue}>{item.reportTime}</Text>
            </View>
            
            <View style={styles.reasonContainer}>
              <Text style={styles.detailLabel}>Reason:</Text>
              <Text style={styles.reasonText}>{item.reason}</Text>
            </View>
          </View>
        )}

        {/* Expand/Collapse Indicator */}
        <View style={styles.expandIndicator}>
          <Text style={styles.expandText}>
            {isExpanded ? "Tap to collapse" : "Tap for details"}
          </Text>
          <Text style={styles.expandArrow}>{isExpanded ? "▲" : "▼"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>All Reports</Text>
      <Text style={styles.subtitle}>
        Total Reports: {reportHistoryData.length}
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No reports found</Text>
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
  // New driver info styles
  driverInfo: {
    alignItems: "flex-end",
  },
  driverLabel: {
    color: "#B0B0B0",
    fontSize: 10,
    marginBottom: 2,
  },
  driverName: {
    color: "#4CAF50",
    fontSize: 12,
    fontWeight: "600",
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