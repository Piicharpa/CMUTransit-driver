import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import styles from "../../theme/driver_theme/history";

interface BusHistory {
  id: string;
  busNumber: string;
  route: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function Drive_History() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const [history] = useState<BusHistory[]>([
    {
      id: "1",
      busNumber: "B001",
      route: "สายใต้ใหม่ - อนุสาวรีย์",
      date: "2024-01-15",
      startTime: "08:00",
      endTime: "16:30",
    },
    {
      id: "2",
      busNumber: "B003",
      route: "สนามหลวง - สยาม",
      date: "2024-01-14",
      startTime: "14:00",
      endTime: "22:15",
    },
    {
      id: "3",
      busNumber: "B002",
      route: "หมอชิต - พระราม 9",
      date: "2024-01-14",
      startTime: "07:30",
      endTime: "15:45",
    },
    {
      id: "4",
      busNumber: "B001",
      route: "สายใต้ใหม่ - อนุสาวรีย์",
      date: "2024-01-13",
      startTime: "09:00",
      endTime: "17:30",
    },
    {
      id: "5",
      busNumber: "B005",
      route: "บางนา - ปากน้ำ",
      date: "2024-01-13",
      startTime: "15:00",
      endTime: "23:20",
    },
    {
      id: "6",
      busNumber: "B002",
      route: "หมอชิต - พระราม 9",
      date: "2024-01-12",
      startTime: "08:15",
      endTime: "16:45",
    },
    {
      id: "7",
      busNumber: "B004",
      route: "แฮปปี้แลนด์ - สะพานพุทธ",
      date: "2024-01-11",
      startTime: "07:00",
      endTime: "15:30",
    },
    {
      id: "8",
      busNumber: "B003",
      route: "สนามหลวง - สยาม",
      date: "2024-01-10",
      startTime: "14:30",
      endTime: "22:45",
    },
  ]);

  const [filterBus, setFilterBus] = useState<string | "all">("all");
  const uniqueBusNumbers = [
    "all",
    ...Array.from(new Set(history.map((item) => item.busNumber))),
  ];
  const filteredHistory =
    filterBus === "all"
      ? history
      : history.filter((item) => item.busNumber === filterBus);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear() + 543;
    return `${day}/${month}/${year}`;
  };

  const calculateHours = (startTime: string, endTime: string) => {
    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);
    let hours = endHour - startHour;
    let mins = endMin - startMin;
    if (mins < 0) {
      hours -= 1;
      mins += 60;
    }
    return (hours + mins / 60).toFixed(1);
  };

  const renderHistoryItem = ({ item }: { item: BusHistory }) => (
    <View
      style={[
        styles.historyCard,
        {
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          borderColor: isDark ? "#374151" : "#e5e7eb",
          shadowColor: isDark ? "#000" : "#007AFF",
          boxShadow: isDark
            ? "0px 2px 4px rgba(0,0,0,0.25)"
            : "0px 2px 4px rgba(30,58,138,0.25)",
        },
      ]}
    >
      <View
        style={[
          styles.busNumberCircle,
          { backgroundColor: isDark ? "#3b82f6" : "#007AFF" },
        ]}
      >
        <Text style={styles.busNumber}>{item.busNumber}</Text>
      </View>
      <View style={styles.historyInfo}>
        <Text
          style={[styles.routeText, { color: isDark ? "#f3f4f6" : "#111827" }]}
        >
          {item.route}
        </Text>
        <Text
          style={[styles.dateText, { color: isDark ? "#d1d5db" : "#374151" }]}
        >
          วันที่: {formatDate(item.date)}
        </Text>
        <Text
          style={[styles.timeText, { color: isDark ? "#d1d5db" : "#374151" }]}
        >
          เวลา: {item.startTime} - {item.endTime} น.
        </Text>
        <View
          style={[
            styles.workingHours,
            {
              backgroundColor: isDark
                ? "rgba(16,185,129,0.2)"
                : "rgba(34,197,94,0.1)",
            },
          ]}
        >
          <Text
            style={[
              styles.hoursText,
              { color: isDark ? "#10b981" : "#059669" },
            ]}
          >
            {calculateHours(item.startTime, item.endTime)} ชั่วโมง
          </Text>
        </View>
      </View>
    </View>
  );

  const renderBusFilterButton = (busNumber: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        {
          backgroundColor:
            filterBus === busNumber
              ? isDark
                ? "#3b82f6"
                : "#007AFF"
              : isDark
              ? "#1f2937"
              : "#f3f4f6",
          borderColor:
            filterBus === busNumber
              ? isDark
                ? "#3b82f6"
                : "#007AFF"
              : isDark
              ? "#374151"
              : "#e5e7eb",
        },
      ]}
      onPress={() => setFilterBus(busNumber)}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.filterButtonText,
          {
            color:
              filterBus === busNumber ? "#fff" : isDark ? "#d1d5db" : "#374151",
          },
        ]}
      >
        {busNumber === "all" ? "ทั้งหมด" : busNumber}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDark ? "#0f172a" : "#ffffff",
        }}
        edges={["top", "bottom"]}
      >
        <ScrollView
          contentContainerStyle={{
            paddingTop: insets.top + 16, // เพิ่ม insets.top
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 16,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Text
            style={[styles.title, { color: isDark ? "#60a5fa" : "#007AFF" }]}
          >
            📊 ประวัติการขับรถ
          </Text>
          <Text
            style={[styles.subtitle, { color: isDark ? "#9ca3af" : "#6b7280" }]}
          >
            ดูประวัติการขับรถทั้งหมดของคุณ
          </Text>

          {/* Stats */}
          <View
            style={[
              styles.statsContainer,
              {
                backgroundColor: isDark ? "#1f2937" : "#F9FAFB",
                borderColor: isDark ? "#374151" : "#E5E7EB",
                shadowColor: isDark ? "#000" : "#007AFF",
                boxShadow: isDark
                  ? "0px 2px 4px rgba(0,0,0,0.25)"
                  : "0px 2px 4px rgba(30,58,138,0.25)",
              },
            ]}
          >
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statValue,
                  { color: isDark ? "#60a5fa" : "#007AFF" },
                ]}
              >
                {history.length}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: isDark ? "#9ca3af" : "#6b7280" },
                ]}
              >
                จำนวนเที่ยว
              </Text>
            </View>
            <View
              style={[
                styles.statDivider,
                { backgroundColor: isDark ? "#374151" : "#e5e7eb" },
              ]}
            />
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statValue,
                  { color: isDark ? "#60a5fa" : "#007AFF" },
                ]}
              >
                {uniqueBusNumbers.length - 1}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: isDark ? "#9ca3af" : "#6b7280" },
                ]}
              >
                รถที่เคยขับ
              </Text>
            </View>
            <View
              style={[
                styles.statDivider,
                { backgroundColor: isDark ? "#374151" : "#e5e7eb" },
              ]}
            />
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statValue,
                  { color: isDark ? "#60a5fa" : "#007AFF" },
                ]}
              >
                {history
                  .reduce(
                    (total, item) =>
                      total +
                      parseFloat(calculateHours(item.startTime, item.endTime)),
                    0
                  )
                  .toFixed(1)}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: isDark ? "#9ca3af" : "#6b7280" },
                ]}
              >
                ชั่วโมงทั้งหมด
              </Text>
            </View>
          </View>

          {/* Filter */}
          <View style={styles.filterSection}>
            <Text
              style={[
                styles.filterTitle,
                { color: isDark ? "#d1d5db" : "#374151" },
              ]}
            >
              🚌 กรองตามหมายเลขรถ
            </Text>
            <FlatList
              data={uniqueBusNumbers}
              renderItem={({ item }) => renderBusFilterButton(item)}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterContent}
            />
          </View>

          {/* History */}
          <FlatList
            data={filteredHistory}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false} // FlatList ไม่ scroll เพราะ ScrollView ครอบแล้ว
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
