import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { styles } from "../../theme/admin_theme/route";

interface Bus {
  id: string;
  busNumber: string;
  mac: string;
  driverName: string;
  route: string;
}

export default function Route_Manage() {
  const [buses, setBuses] = useState<Bus[]>([
    {
      id: "1",
      busNumber: "B001",
      mac: "00:1B:44:11:3A:B7",
      driverName: "John Smith",
      route: "Downtown - Airport",
    },
    {
      id: "2",
      busNumber: "B002",
      mac: "00:1B:44:11:3A:B8",
      driverName: "Sarah Johnson",
      route: "Mall - University",
    },
    {
      id: "3",
      busNumber: "B003",
      mac: "00:1B:44:11:3A:B9",
      driverName: "Mike Davis",
      route: "Station - Beach",
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRoute, setEditRoute] = useState("");

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleEdit = (bus: Bus) => {
    setEditingId(bus.id);
    setEditRoute(bus.route);
  };

  const handleSave = (id: string) => {
    setBuses(
      buses.map((bus) => (bus.id === id ? { ...bus, route: editRoute } : bus))
    );
    setEditingId(null);
    setEditRoute("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditRoute("");
  };

  const handleDelete = (id: string, busNumber: string) => {
    Alert.alert(
      isDark ? "ลบรถ" : "Delete Bus",
      isDark
        ? `คุณแน่ใจหรือไม่ที่จะลบรถ ${busNumber}?`
        : `Are you sure you want to delete bus ${busNumber}?`,
      [
        { text: isDark ? "ยกเลิก" : "Cancel", style: "cancel" },
        {
          text: isDark ? "ลบ" : "Delete",
          style: "destructive",
          onPress: () => setBuses(buses.filter((bus) => bus.id !== id)),
        },
      ]
    );
  };

  const renderBusItem = ({ item }: { item: Bus }) => (
    <View
      style={[
        styles.busCard,
        {
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          borderColor: isDark ? "#374151" : "#e2e8f0",
          shadowColor: isDark ? "#000000" : "#1e3a8a",
        },
      ]}
    >
      <View style={styles.busRow}>
        <View
          style={[
            styles.busNumberContainer,
            { backgroundColor: isDark ? "#3b82f6" : "#1e3a8a" },
          ]}
        >
          <Text style={styles.busNumber}>{item.busNumber}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.infoLabel,
              { color: isDark ? "#9ca3af" : "#64748b" },
            ]}
          >
            DELL MAC ADDRESS
          </Text>
          <Text
            style={[styles.infoText, { color: isDark ? "#f3f4f6" : "#1e293b" }]}
          >
            {item.mac}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.infoLabel,
              { color: isDark ? "#9ca3af" : "#64748b" },
            ]}
          >
            ชื่อคนขับ
          </Text>
          <Text
            style={[styles.infoText, { color: isDark ? "#f3f4f6" : "#1e293b" }]}
          >
            {item.driverName}
          </Text>
        </View>

        <View style={styles.routeContainer}>
          <Text
            style={[
              styles.infoLabel,
              { color: isDark ? "#9ca3af" : "#64748b" },
            ]}
          >
            สายรถ
          </Text>
          {editingId === item.id ? (
            <TextInput
              style={[
                styles.routeInput,
                {
                  backgroundColor: isDark ? "#111827" : "#ffffff",
                  borderColor: isDark ? "#60a5fa" : "#3b82f6",
                  color: isDark ? "#f3f4f6" : "#1e293b",
                },
              ]}
              value={editRoute}
              onChangeText={setEditRoute}
              placeholder="ใส่เส้นทาง"
              placeholderTextColor={isDark ? "#6b7280" : "#999"}
              multiline
            />
          ) : (
            <Text
              style={[
                styles.routeText,
                {
                  backgroundColor: isDark ? "#111827" : "#f1f5f9",
                  borderColor: isDark ? "#374151" : "#e2e8f0",
                  color: isDark ? "#f3f4f6" : "#1e293b",
                },
              ]}
            >
              {item.route}
            </Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          {editingId === item.id ? (
            <View style={styles.editButtons}>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={() => handleSave(item.id)}
              >
                <Text style={styles.buttonText}>
                  ✓ บันทึก
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.cancelButton,
                  { backgroundColor: isDark ? "#4b5563" : "#6b7280" },
                ]}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>
                  ✕ ยกเลิก
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.editButton,
                  { backgroundColor: isDark ? "#3b82f6" : "#3b82f6" },
                ]}
                onPress={() => handleEdit(item)}
              >
                <Text style={styles.buttonText}>
                  ✏️ แก้ไข
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(item.id, item.busNumber)}
              >
                <Text style={styles.buttonText}>
                  🗑️ ลบ
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0f172a" : "#f8f9fa" },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#60a5fa" : "#1e3a8a" }]}>
          🚌 จัดการเส้นทางรถ
        </Text>
        <Text
          style={[styles.subtitle, { color: isDark ? "#9ca3af" : "#64748b" }]}
        >
          จัดการเส้นทางของคุณอย่างมีประสิทธิภาพ
        </Text>
      </View>

      {/* Header Card */}
      <View
        style={[
          styles.headerCard,
          {
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e2e8f0",
            shadowColor: isDark ? "#000000" : "#1e3a8a",
          },
        ]}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statNumber,
                { color: isDark ? "#60a5fa" : "#1e3a8a" },
              ]}
            >
              {buses.length}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: isDark ? "#9ca3af" : "#64748b" },
              ]}
            >
              รถทั้งหมด
            </Text>
          </View>
          <View
            style={[
              styles.statDivider,
              { backgroundColor: isDark ? "#374151" : "#e2e8f0" },
            ]}
          />
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statNumber,
                { color: isDark ? "#60a5fa" : "#1e3a8a" },
              ]}
            >
              {new Set(buses.map((b) => b.route)).size}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: isDark ? "#9ca3af" : "#64748b" },
              ]}
            >
              เส้นทางที่ใช้งาน
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={buses}
        renderItem={renderBusItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View
            style={[
              styles.emptyContainer,
              {
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                borderColor: isDark ? "#374151" : "#e2e8f0",
              },
            ]}
          >
            <Text style={styles.emptyIcon}>🚌</Text>
            <Text
              style={[
                styles.emptyTitle,
                { color: isDark ? "#60a5fa" : "#1e3a8a" },
              ]}
            >
              ไม่มีข้อมูลรถ
            </Text>
            <Text
              style={[
                styles.emptyText,
                { color: isDark ? "#9ca3af" : "#64748b" },
              ]}
            >
              เพิ่มรถใหม่เพื่อเริ่มจัดการเส้นทาง
            </Text>
          </View>
        )}
      />
    </View>
  );
}
