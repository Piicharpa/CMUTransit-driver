import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";

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
      "Delete Bus",
      `Are you sure you want to delete bus ${busNumber}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => setBuses(buses.filter((bus) => bus.id !== id)),
        },
      ]
    );
  };

  const renderBusItem = ({ item }: { item: Bus }) => (
    <View style={styles.busCard}>
      <View style={styles.busRow}>
        <Text style={styles.busNumber}>{item.busNumber}</Text>
        <Text style={styles.infoText}>{item.mac}</Text>
        <Text style={styles.infoText}>{item.driverName}</Text>

        {editingId === item.id ? (
          <TextInput
            style={styles.routeInput}
            value={editRoute}
            onChangeText={setEditRoute}
            placeholder="Enter route"
            placeholderTextColor="#999"
          />
        ) : (
          <Text style={styles.routeText}>{item.route}</Text>
        )}

        <View style={styles.buttonContainer}>
          {editingId === item.id ? (
            <View style={styles.editButtons}>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={() => handleSave(item.id)}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => handleEdit(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(item.id, item.busNumber)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Routes</Text>

      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Bus #</Text>
        <Text style={styles.headerText}>MAC</Text>
        <Text style={styles.headerText}>Driver</Text>
        <Text style={styles.headerText}>Route</Text>
        <Text style={styles.headerText}>Actions</Text>
      </View>

      <FlatList
        data={buses}
        renderItem={renderBusItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#1a1d21",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  busCard: {
    backgroundColor: "#3a3f47",
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#4a5058",
  },
  busRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  busNumber: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  infoText: {
    color: "#ccc",
    fontSize: 12,
    flex: 1,
    textAlign: "center",
  },
  routeText: {
    color: "#fff",
    fontSize: 12,
    flex: 1,
    textAlign: "center",
  },
  routeInput: {
    color: "#fff",
    fontSize: 12,
    backgroundColor: "#25292e",
    borderWidth: 1,
    borderColor: "#5a6068",
    borderRadius: 4,
    padding: 6,
    flex: 1,
    marginHorizontal: 4,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 4,
  },
  editButtons: {
    flexDirection: "row",
    gap: 4,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 40,
  },
  editButton: {
    backgroundColor: "#007AFF",
    width: 64,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    width: 64,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#34C759",
    width: 64,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#8E8E93",
    width: 64,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
  },
});
