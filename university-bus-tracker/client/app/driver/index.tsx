import {
  Text,
  View,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { styles } from "../theme/driver_theme/index";
export default function Index() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const features = [
    {
      id: "1",
      icon: "🚌",
      title: "การขับขี่",
      subtitle: "เริ่มต้นการให้บริการ",
      description: "เปลี่ยนสถานะเป็นออนไลน์และเริ่มรับงาน",
      steps: ["เปิดแอป", "เปลี่ยนสถานะเป็นออนไลน์", "รอรับงานจากระบบ"],
    },
    {
      id: "2",
      icon: "📱",
      title: "สแกน QR Code",
      subtitle: "ตรวจสอบผู้โดยสาร",
      description: "สแกนรหัส QR เพื่อยืนยันตัวตนผู้โดยสาร",
      steps: ["เปิดหน้าสแกน", "ชี้กล้องไปที่ QR Code", "รอระบบยืนยัน"],
    },
    {
      id: "3",
      icon: "📋",
      title: "รายงานเหตุการณ์",
      subtitle: "แจ้งปัญหาหรืออุบัติเหตุ",
      description: "รายงานเหตุการณ์ที่เกิดขึ้นระหว่างการให้บริการ",
      steps: ["เลือกประเภทเหตุการณ์", "กรอกรายละเอียด", "ส่งรายงาน"],
    },
    {
      id: "4",
      icon: "👤",
      title: "จัดการโปรไฟล์",
      subtitle: "แก้ไขข้อมูลส่วนตัว",
      description: "อัพเดทข้อมูลและรูปโปรไฟล์ของคุณ",
      steps: ["เข้าหน้าโปรไฟล์", "แก้ไขข้อมูล", "บันทึกการเปลี่ยนแปลง"],
    },
  ];

  const tips = [
    {
      icon: "💡",
      title: "เคล็ดลับความปลอดภัย",
      description: "ตรวจสอบสภาพรถก่อนออกเดินทางทุกครั้ง",
    },
    {
      icon: "⏰",
      title: "การจัดการเวลา",
      description: "เดินทางตรงเวลาเพื่อให้บริการที่ดีที่สุด",
    },
    {
      icon: "🎯",
      title: "เป้าหมายรายได้",
      description: "ติดตามสถิติการทำงานเพื่อเพิ่มประสิทธิภาพ",
    },
    {
      icon: "🤝",
      title: "การบริการลูกค้า",
      description: "ยิ้มแย้มแจ่มใสและใส่ใจความปลอดภัยผู้โดยสาร",
    },
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0f172a" : "#f8fafc" },
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text
            style={[
              styles.welcomeText,
              { color: isDark ? "#9ca3af" : "#64748b" },
            ]}
          >
            ยินดีต้อนรับสู่
          </Text>
          <Text
            style={[styles.title, { color: isDark ? "#60a5fa" : "#1e40af" }]}
          >
            🚌 Driver App
          </Text>
          <Text
            style={[styles.subtitle, { color: isDark ? "#d1d5db" : "#374151" }]}
          >
            แอปพลิเคชันสำหรับคนขับรถโดยสารประจำทาง
          </Text>
        </View>

        {/* Quick Start Guide */}
        <View
          style={[
            styles.quickStartCard,
            {
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              borderColor: isDark ? "#374151" : "#e2e8f0",
            },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? "#f3f4f6" : "#1e293b" },
            ]}
          >
            🚀 เริ่มต้นใช้งาน
          </Text>
          <Text
            style={[
              styles.sectionSubtitle,
              { color: isDark ? "#9ca3af" : "#64748b" },
            ]}
          >
            ขั้นตอนพื้นฐานในการใช้งานแอป
          </Text>

          <View style={styles.stepsContainer}>
            {[
              "เปิดแอป",
              "เข้าสู่ระบบ",
              "เปลี่ยนสถานะออนไลน์",
              "เริ่มรับงาน",
            ].map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View
                  style={[
                    styles.stepNumber,
                    { backgroundColor: isDark ? "#3b82f6" : "#1e40af" },
                  ]}
                >
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text
                  style={[
                    styles.stepText,
                    { color: isDark ? "#d1d5db" : "#374151" },
                  ]}
                >
                  {step}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? "#f3f4f6" : "#1e293b" },
            ]}
          >
            📚 คู่มือการใช้งาน
          </Text>

          <View style={styles.featuresGrid}>
            {features.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                style={[
                  styles.featureCard,
                  {
                    backgroundColor: isDark ? "#1f2937" : "#ffffff",
                    borderColor: isDark ? "#374151" : "#e2e8f0",
                  },
                ]}
                activeOpacity={0.8}
              >
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text
                  style={[
                    styles.featureTitle,
                    { color: isDark ? "#f3f4f6" : "#1e293b" },
                  ]}
                >
                  {feature.title}
                </Text>
                <Text
                  style={[
                    styles.featureSubtitle,
                    { color: isDark ? "#60a5fa" : "#3b82f6" },
                  ]}
                >
                  {feature.subtitle}
                </Text>
                <Text
                  style={[
                    styles.featureDescription,
                    { color: isDark ? "#9ca3af" : "#64748b" },
                  ]}
                >
                  {feature.description}
                </Text>

                <View style={styles.stepsPreview}>
                  {feature.steps.map((step, index) => (
                    <View key={index} style={styles.stepPreviewItem}>
                      <View
                        style={[
                          styles.stepDot,
                          { backgroundColor: isDark ? "#4b5563" : "#d1d5db" },
                        ]}
                      />
                      <Text
                        style={[
                          styles.stepPreviewText,
                          { color: isDark ? "#9ca3af" : "#6b7280" },
                        ]}
                      >
                        {step}
                      </Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tips Section */}
        <View
          style={[
            styles.tipsSection,
            {
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              borderColor: isDark ? "#374151" : "#e2e8f0",
            },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? "#f3f4f6" : "#1e293b" },
            ]}
          >
            💡 เคล็ดลับและข้อแนะนำ
          </Text>

          <View style={styles.tipsGrid}>
            {tips.map((tip, index) => (
              <View
                key={index}
                style={[
                  styles.tipCard,
                  {
                    backgroundColor: isDark ? "#111827" : "#f8fafc",
                    borderColor: isDark ? "#374151" : "#e5e7eb",
                  },
                ]}
              >
                <Text style={styles.tipIcon}>{tip.icon}</Text>
                <View style={styles.tipContent}>
                  <Text
                    style={[
                      styles.tipTitle,
                      { color: isDark ? "#f3f4f6" : "#1e293b" },
                    ]}
                  >
                    {tip.title}
                  </Text>
                  <Text
                    style={[
                      styles.tipDescription,
                      { color: isDark ? "#9ca3af" : "#64748b" },
                    ]}
                  >
                    {tip.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Section */}
        <View
          style={[
            styles.contactSection,
            {
              backgroundColor: isDark ? "#1e3a8a" : "#eff6ff",
              borderColor: isDark ? "#3b82f6" : "#dbeafe",
            },
          ]}
        >
          <Text style={styles.contactIcon}>📞</Text>
          <Text
            style={[
              styles.contactTitle,
              { color: isDark ? "#dbeafe" : "#1e40af" },
            ]}
          >
            ต้องการความช่วยเหลือ?
          </Text>
          <Text
            style={[
              styles.contactDescription,
              { color: isDark ? "#bfdbfe" : "#3b82f6" },
            ]}
          >
            ติดต่อฝ่ายสนับสนุนได้ 24/7
          </Text>
          <Text
            style={[
              styles.contactNumber,
              { color: isDark ? "#93c5fd" : "#1d4ed8" },
            ]}
          >
            📱 02-XXX-XXXX
          </Text>
        </View>

        {/* Status Indicator */}
        <View
          style={[
            styles.statusCard,
            {
              backgroundColor: isDark ? "#065f46" : "#d1fae5",
              borderColor: isDark ? "#10b981" : "#a7f3d0",
            },
          ]}
        >
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, { backgroundColor: "#10b981" }]} />
            <Text
              style={[
                styles.statusText,
                { color: isDark ? "#6ee7b7" : "#047857" },
              ]}
            >
              System Online - พร้อมให้บริการ
            </Text>
          </View>
          <Text
            style={[
              styles.statusSubtext,
              { color: isDark ? "#86efac" : "#059669" },
            ]}
          >
            อัพเดทล่าสุด: {new Date().toLocaleTimeString("th-TH")}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
