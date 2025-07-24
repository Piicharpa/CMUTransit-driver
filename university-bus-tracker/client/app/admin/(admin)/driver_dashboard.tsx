import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

interface DriverData {
  driverID: string;
  driverName: string;
  status: 'driving' | 'waiting' | 'not work time';
  busNumber: string | null; // Changed to allow null values
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
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'driving':
        return '#4CAF50'; // Green
      case 'waiting':
        return '#FF9800'; // Orange
      case 'not work time':
        return '#F44336'; // Red
      default:
        return '#757575';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'driving':
        return 'กำลังขับ';
      case 'waiting':
        return 'รอขับ';
      case 'not work time':
        return 'นอกเวลางาน';
      default:
        return status;
    }
  };

  const filteredDrivers = selectedStatus === 'all' 
    ? driverData 
    : driverData.filter(driver => driver.status === selectedStatus);

  const getStatusCounts = () => {
    return {
      driving: driverData.filter(d => d.status === 'driving').length,
      waiting: driverData.filter(d => d.status === 'waiting').length,
      notWorkTime: driverData.filter(d => d.status === 'not work time').length,
      total: driverData.length
    };
  };

  const statusCounts = getStatusCounts();

  const renderFilterButton = (status: string, label: string) => (
    <TouchableOpacity
      key={status}
      style={[
        styles.filterButton,
        selectedStatus === status && styles.activeFilterButton
      ]}
      onPress={() => setSelectedStatus(status)}
    >
      <Text style={[
        styles.filterButtonText,
        selectedStatus === status && styles.activeFilterButtonText
      ]}>
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
        
        {/* Only show bus number if driver has one (i.e., is driving) */}
        {item.busNumber ? (
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
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
        <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
          {getStatusText(item.status)}
        </Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Driver Dashboard</Text>
      
      {/* Status Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{statusCounts.total}</Text>
          <Text style={styles.summaryLabel}>คนขับทั้งหมด</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: '#4CAF50' }]}>{statusCounts.driving}</Text>
          <Text style={styles.summaryLabel}>กำลังขับ</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: '#FF9800' }]}>{statusCounts.waiting}</Text>
          <Text style={styles.summaryLabel}>รอขับ</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: '#F44336' }]}>{statusCounts.notWorkTime}</Text>
          <Text style={styles.summaryLabel}>นอกเวลางาน</Text>
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {renderFilterButton('all', 'All')}
        {renderFilterButton('driving', 'กำลังขับ')}
        {renderFilterButton('waiting', 'รอขับ')}
        {renderFilterButton('not work time', 'นอกเวลางาน')}
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
    backgroundColor: '#25292e',
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
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333842',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryLabel: {
    color: '#B0B0B0',
    fontSize: 12,
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#404855',
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    color: '#B0B0B0',
    fontSize: 12,
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  driverCard: {
    backgroundColor: '#333842',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  driverID: {
    color: '#B0B0B0',
    fontSize: 12,
  },
  busNumberContainer: {
    alignItems: 'center',
    backgroundColor: '#404855',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  busNumberLabel: {
    color: '#B0B0B0',
    fontSize: 10,
    marginBottom: 2,
  },
  busNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // New styles for no bus assignment
  noBusContainer: {
    alignItems: 'center',
    backgroundColor: '#404855',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    opacity: 0.6,
  },
  noBusText: {
    color: '#B0B0B0',
    fontSize: 12,
    fontWeight: '500',
  },
  noBusSubtext: {
    color: '#888',
    fontSize: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
