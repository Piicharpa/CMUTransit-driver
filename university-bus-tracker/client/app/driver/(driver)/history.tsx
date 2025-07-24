import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

interface BusHistory {
  id: string;
  busNumber: string;
  route: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function Drive_History() {
  const [history, ] = useState<BusHistory[]>([
    {
      id: '1',
      busNumber: 'B001',
      route: 'สายใต้ใหม่ - อนุสาวรีย์',
      date: '2024-01-15',
      startTime: '08:00',
      endTime: '16:30'
    },
    {
      id: '2',
      busNumber: 'B003',
      route: 'สนามหลวง - สยาม',
      date: '2024-01-14',
      startTime: '14:00',
      endTime: '22:15'
    },
    {
      id: '3',
      busNumber: 'B002',
      route: 'หมอชิต - พระราม 9',
      date: '2024-01-14',
      startTime: '07:30',
      endTime: '15:45'
    },
    {
      id: '4',
      busNumber: 'B001',
      route: 'สายใต้ใหม่ - อนุสาวรีย์',
      date: '2024-01-13',
      startTime: '09:00',
      endTime: '17:30'
    },
    {
      id: '5',
      busNumber: 'B005',
      route: 'บางนา - ปากน้ำ',
      date: '2024-01-13',
      startTime: '15:00',
      endTime: '23:20'
    },
    {
      id: '6',
      busNumber: 'B002',
      route: 'หมอชิต - พระราม 9',
      date: '2024-01-12',
      startTime: '08:15',
      endTime: '16:45'
    },
    {
      id: '7',
      busNumber: 'B004',
      route: 'แฮปปี้แลนด์ - สะพานพุทธ',
      date: '2024-01-11',
      startTime: '07:00',
      endTime: '15:30'
    },
    {
      id: '8',
      busNumber: 'B003',
      route: 'สนามหลวง - สยาม',
      date: '2024-01-10',
      startTime: '14:30',
      endTime: '22:45'
    }
  ]);

  const [filterBus, setFilterBus] = useState<string | 'all'>('all');

  const uniqueBusNumbers = ['all', ...Array.from(new Set(history.map(item => item.busNumber)))];

  const filteredHistory = filterBus === 'all' 
    ? history 
    : history.filter(entry => entry.busNumber === filterBus);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear() + 543; // พ.ศ.
    
    return `${day}/${month}/${year}`;
  };

  const renderHistoryItem = ({ item }: { item: BusHistory }) => (
    <View style={styles.historyCard}>
      <View style={styles.busNumberCircle}>
        <Text style={styles.busNumber}>{item.busNumber}</Text>
      </View>

      <View style={styles.historyInfo}>
        <View style={styles.routeRow}>
          <Text style={styles.routeText}>{item.route}</Text>
        </View>
        
        <View style={styles.detailsRow}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>วันที่:</Text>
            <Text style={styles.dateValue}>{formatDate(item.date)}</Text>
          </View>
          
          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>เวลา:</Text>
            <Text style={styles.timeValue}>{item.startTime} - {item.endTime} น.</Text>
          </View>
        </View>

        <View style={styles.workingHours}>
          <Text style={styles.hoursText}>
            {calculateHours(item.startTime, item.endTime)} ชั่วโมง
          </Text>
        </View>
      </View>
    </View>
  );

  const calculateHours = (startTime: string, endTime: string) => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    let hours = endHour - startHour;
    let mins = endMin - startMin;
    
    if (mins < 0) {
      hours -= 1;
      mins += 60;
    }
    
    // Format decimal hours
    return (hours + mins/60).toFixed(1);
  };

  const renderBusFilterButton = (busNumber: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filterBus === busNumber && styles.activeFilterButton
      ]}
      onPress={() => setFilterBus(busNumber)}
    >
      <Text style={[
        styles.filterButtonText,
        filterBus === busNumber && styles.activeFilterButtonText
      ]}>
        {busNumber === 'all' ? 'ทั้งหมด' : busNumber}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ประวัติการขับรถ</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{history.length}</Text>
          <Text style={styles.statLabel}>จำนวนเที่ยว</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{uniqueBusNumbers.length - 1}</Text>
          <Text style={styles.statLabel}>รถที่เคยขับ</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {history.reduce((total, item) => 
              total + parseFloat(calculateHours(item.startTime, item.endTime)), 0
            ).toFixed(1)}
          </Text>
          <Text style={styles.statLabel}>ชั่วโมงทั้งหมด</Text>
        </View>
      </View>
      
      <Text style={styles.filterTitle}>กรองตามหมายเลขรถ</Text>
      <View style={styles.filterContainer}>
        <FlatList
          data={uniqueBusNumbers}
          renderItem={({ item }) => renderBusFilterButton(item)}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
      <FlatList
        data={filteredHistory}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#3a3f47',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4a5058',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
  },
  filterTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#3a3f47',
    borderWidth: 1,
    borderColor: '#4a5058',
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '600',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  historyCard: {
    backgroundColor: '#3a3f47',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4a5058',
    flexDirection: 'row',
  },
  busNumberCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  busNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyInfo: {
    flex: 1,
  },
  routeRow: {
    marginBottom: 8,
  },
  routeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
  },
  dateLabel: {
    color: '#999',
    fontSize: 14,
    marginRight: 4,
  },
  dateValue: {
    color: '#fff',
    fontSize: 14,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  timeLabel: {
    color: '#999',
    fontSize: 14,
    marginRight: 4,
  },
  timeValue: {
    color: '#fff',
    fontSize: 14,
  },
  workingHours: {
    marginTop: 4,
  },
  hoursText: {
    color: '#FF9500',
    fontSize: 14,
    fontWeight: '600',
  }
});