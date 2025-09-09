import {
  Text,
  View,
  Platform,
  Alert,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import styles from "../../theme/driver_theme/scanner";

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    Alert.alert("QR Code สแกนแล้ว! 🎉", `ข้อมูล: ${data}`, [
      {
        text: "สแกนอีกครั้ง",
        onPress: () => setScanned(false),
      },
    ]);
  };

  // ถ้าเป็น Web
  if (Platform.OS === "web") {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#0f172a" : "#ffffff" },
        ]}
      >
        <View style={styles.messageContainer}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isDark ? "#1f2937" : "#f1f5f9" },
            ]}
          >
            <Text style={styles.mobileIcon}>📱</Text>
          </View>
          <Text
            style={[
              styles.messageTitle,
              { color: isDark ? "#60a5fa" : "#1e40af" },
            ]}
          >
            เปิดหน้านี้จากมือถือ
          </Text>
          <Text
            style={[
              styles.messageSubtitle,
              { color: isDark ? "#9ca3af" : "#64748b" },
            ]}
          >
            QR Code Scanner ใช้งานได้เฉพาะบนมือถือเท่านั้น
          </Text>
          <View
            style={[
              styles.featureList,
              {
                backgroundColor: isDark ? "#1f2937" : "#f8fafc",
                borderColor: isDark ? "#374151" : "#e2e8f0",
              },
            ]}
          >
            <Text
              style={[
                styles.featureTitle,
                { color: isDark ? "#f3f4f6" : "#1e293b" },
              ]}
            >
              ฟีเจอร์ที่รองรับ:
            </Text>
            <Text
              style={[
                styles.featureItem,
                { color: isDark ? "#d1d5db" : "#475569" },
              ]}
            >
              ✓ สแกน QR Code รวดเร็ว
            </Text>
            <Text
              style={[
                styles.featureItem,
                { color: isDark ? "#d1d5db" : "#475569" },
              ]}
            >
              ✓ สแกน Barcode หลายรูปแบบ
            </Text>
            <Text
              style={[
                styles.featureItem,
                { color: isDark ? "#d1d5db" : "#475569" },
              ]}
            >
              ✓ การแจ้งเตือนแบบ Real-time
            </Text>
          </View>
        </View>
      </View>
    );
  }

  // รออนุญาตกล้อง
  if (!permission) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#0f172a" : "#ffffff" },
        ]}
      >
        <View style={styles.messageContainer}>
          <View
            style={[
              styles.loadingContainer,
              { backgroundColor: isDark ? "#1f2937" : "#f1f5f9" },
            ]}
          >
            <Text style={styles.loadingIcon}>🔄</Text>
            <Text
              style={[
                styles.loadingText,
                { color: isDark ? "#60a5fa" : "#1e40af" },
              ]}
            >
              กำลังโหลดสิทธิ์กล้อง...
            </Text>
            <Text
              style={[
                styles.loadingSubtext,
                { color: isDark ? "#9ca3af" : "#64748b" },
              ]}
            >
              กรุณารอสักครู่
            </Text>
          </View>
        </View>
      </View>
    );
  }

  // ยังไม่ได้รับสิทธิ์กล้อง
  if (!permission.granted) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#0f172a" : "#ffffff" },
        ]}
      >
        <View style={styles.messageContainer}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isDark ? "#1f2937" : "#fef2f2" },
            ]}
          >
            <Text style={styles.errorIcon}>📷</Text>
          </View>
          <Text
            style={[
              styles.messageTitle,
              { color: isDark ? "#fca5a5" : "#dc2626" },
            ]}
          >
            จำเป็นต้องใช้กล้อง
          </Text>
          <Text
            style={[
              styles.messageSubtitle,
              { color: isDark ? "#9ca3af" : "#64748b" },
            ]}
          >
            กรุณาอนุญาตการเข้าถึงกล้องเพื่อสแกน QR Code
          </Text>

          <TouchableOpacity
            style={[
              styles.permissionButton,
              { backgroundColor: isDark ? "#3b82f6" : "#1e40af" },
            ]}
            onPress={requestPermission}
            activeOpacity={0.8}
          >
            <Text style={styles.permissionButtonIcon}>🔐</Text>
            <Text style={styles.permissionButtonText}>
              อนุญาตการเข้าถึงกล้อง
            </Text>
          </TouchableOpacity>

          <View
            style={[
              styles.instructionCard,
              {
                backgroundColor: isDark ? "#1f2937" : "#f8fafc",
                borderColor: isDark ? "#374151" : "#e2e8f0",
              },
            ]}
          >
            <Text
              style={[
                styles.instructionTitle,
                { color: isDark ? "#f3f4f6" : "#1e293b" },
              ]}
            >
              หากไม่สามารถอนุญาตได้:
            </Text>
            <Text
              style={[
                styles.instructionStep,
                { color: isDark ? "#d1d5db" : "#475569" },
              ]}
            >
              1. เข้าไปที่การตั้งค่าของแอป
            </Text>
            <Text
              style={[
                styles.instructionStep,
                { color: isDark ? "#d1d5db" : "#475569" },
              ]}
            >
              2. เลือก &quot;สิทธิ์&quot; หรือ &quot;Permissions&quot;
            </Text>
            <Text
              style={[
                styles.instructionStep,
                { color: isDark ? "#d1d5db" : "#475569" },
              ]}
            >
              3. เปิดสิทธิ์การใช้กล้อง
            </Text>
            <Text
              style={[
                styles.instructionStep,
                { color: isDark ? "#d1d5db" : "#475569" },
              ]}
            >
              4. กลับมาที่แอปและรีเฟรช
            </Text>
          </View>
        </View>
      </View>
    );
  }

  // แสดง Scanner
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0f172a" : "#ffffff" },
      ]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: isDark ? "#1e3a8a" : "#1e40af" },
        ]}
      >
        <Text style={styles.headerTitle}>📱 สแกน QR Code</Text>
        <Text
          style={[
            styles.headerSubtitle,
            { color: isDark ? "#dbeafe" : "#bfdbfe" },
          ]}
        >
          วาง QR Code ภายในกรอบเพื่อสแกน
        </Text>
        <View style={styles.headerStats}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>⚡</Text>
            <Text style={styles.statLabel}>รวดเร็ว</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🎯</Text>
            <Text style={styles.statLabel}>แม่นยำ</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🔒</Text>
            <Text style={styles.statLabel}>ปลอดภัย</Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.cameraContainer,
          { backgroundColor: isDark ? "#1f2937" : "#f1f5f9" },
        ]}
      >
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: [
              "qr",
              "pdf417",
              "aztec",
              "ean13",
              "ean8",
              "upc_e",
              "code128",
              "code39",
            ],
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.scanArea}>
              <View
                style={[
                  styles.corner,
                  styles.topLeft,
                  { borderColor: isDark ? "#60a5fa" : "#3b82f6" },
                ]}
              />
              <View
                style={[
                  styles.corner,
                  styles.topRight,
                  { borderColor: isDark ? "#60a5fa" : "#3b82f6" },
                ]}
              />
              <View
                style={[
                  styles.corner,
                  styles.bottomLeft,
                  { borderColor: isDark ? "#60a5fa" : "#3b82f6" },
                ]}
              />
              <View
                style={[
                  styles.corner,
                  styles.bottomRight,
                  { borderColor: isDark ? "#60a5fa" : "#3b82f6" },
                ]}
              />

              {/* Scanning Line Animation */}
              <View
                style={[
                  styles.scanLine,
                  { backgroundColor: isDark ? "#60a5fa" : "#3b82f6" },
                ]}
              />
            </View>

            {/* Instructions */}
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionText}>
                📋 วางรหัส QR ภายในกรอบสี่เหลี่ยม
              </Text>
            </View>
          </View>
        </CameraView>
      </View>

      {scanned ? (
        <TouchableOpacity
          style={[
            styles.scanButton,
            { backgroundColor: isDark ? "#3b82f6" : "#1e40af" },
          ]}
          onPress={() => setScanned(false)}
          activeOpacity={0.8}
        >
          <Text style={styles.scanButtonIcon}>🔄</Text>
          <Text style={styles.scanButtonText}>แตะเพื่อสแกนอีกครั้ง</Text>
        </TouchableOpacity>
      ) : (
        <View
          style={[
            styles.statusBar,
            {
              backgroundColor: isDark ? "#1f2937" : "#f8fafc",
              borderTopColor: isDark ? "#374151" : "#e2e8f0",
            },
          ]}
        >
          <View style={styles.statusItem}>
            <Text
              style={[
                styles.statusDot,
                { color: "#10b981" }, // Green for active
              ]}
            >
              ●
            </Text>
            <Text
              style={[
                styles.statusText,
                { color: isDark ? "#f3f4f6" : "#1e293b" },
              ]}
            >
              พร้อมสแกน
            </Text>
          </View>
          <Text
            style={[
              styles.statusHint,
              { color: isDark ? "#9ca3af" : "#64748b" },
            ]}
          >
            ชี้กล้องไปที่ QR Code
          </Text>
        </View>
      )}
    </View>
  );
}
