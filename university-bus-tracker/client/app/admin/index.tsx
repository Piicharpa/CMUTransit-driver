import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import styles from "../theme/admin_theme/index";

interface TutorialSection {
  id: string;
  title: string;
  icon: string;
  content: string[];
  steps?: { step: string; description: string }[];
}

const tutorialData: TutorialSection[] = [
  {
    id: "1",
    title: "ภาพรวมของระบบ",
    icon: "🏠",
    content: [
      "ยินดีต้อนรับสู่ระบบจัดการรถโดยสาร",
      "ระบบนี้ออกแบบมาเพื่อช่วยให้คุณสามารถจัดการข้อมูลรถโดยสาร ติดตามเส้นทาง และจัดการรายงานอุบัติเหตุได้อย่างมีประสิทธิภาพ",
      "ระบบประกอบด้วยหน้าหลัก 3 ส่วนที่สำคัญ",
    ],
  },
  {
    id: "2",
    title: "การจัดการเส้นทาง",
    icon: "🚌",
    content: [
      "หน้าจัดการเส้นทางจะช่วยให้คุณสามารถควบคุมข้อมูลรถโดยสารทั้งหมดได้",
    ],
    steps: [
      {
        step: "1. ดูข้อมูลรถ",
        description:
          "คุณจะเห็นรายการรถโดยสารทั้งหมด พร้อมข้อมูลหมายเลขรถ, MAC Address, ชื่อผู้ขับ และเส้นทาง",
      },
      {
        step: "2. แก้ไขเส้นทาง",
        description:
          'คลิกปุ่ม "Edit" เพื่อแก้ไขเส้นทางของรถแต่ละคัน สามารถเปลี่ยนแปลงเส้นทางได้ตามความต้องการ',
      },
      {
        step: "3. บันทึกการเปลี่ยนแปลง",
        description:
          'กดปุ่ม "Save" เพื่อบันทึกการเปลี่ยนแปลง หรือ "Cancel" เพื่อยกเลิก',
      },
      {
        step: "4. ลบข้อมูล",
        description:
          'คลิกปุ่ม "Delete" เพื่อลบรถออกจากระบบ ระบบจะขอยืนยันก่อนลบ',
      },
    ],
  },
  {
    id: "3",
    title: "การดูรายงานทั้งหมด",
    icon: "📋",
    content: [
      "หน้ารายงานทั้งหมดจะแสดงประวัติอุบัติเหตุและการรายงานทั้งหมดในระบบ",
    ],
    steps: [
      {
        step: "1. ดูรายการรายงาน",
        description:
          "รายงานจะแสดงในรูปแบบการ์ด พร้อมข้อมูลสำคัญ เช่น หมายเลขรถ, เส้นทาง, วันเวลาที่เกิดเหตุ",
      },
      {
        step: "2. ค้นหาและกรอง",
        description:
          "ใช้ช่องค้นหาเพื่อหารายงานที่ต้องการ สามารถกรองตามหมายเลขรถ, เส้นทาง, ชื่อผู้ขับ, วันที่ หรือสถานะ",
      },
      {
        step: "3. ดูรายละเอียด",
        description:
          "คลิกที่รายงานเพื่อดูรายละเอียดเพิ่มเติม รวมถึงสาเหตุของอุบัติเหตุ",
      },
      {
        step: "4. อัพเดทสถานะ",
        description:
          "เปลี่ยนสถานะการดำเนินการ: รอดำเนินการ, กำลังดำเนินการ, หรือเสร็จสิ้น",
      },
    ],
  },
  {
    id: "4",
    title: "เคล็ดลับการใช้งาน",
    icon: "💡",
    content: ["เคล็ดลับที่จะช่วยให้คุณใช้งานระบบได้อย่างมีประสิทธิภาพมากขึ้น"],
    steps: [
      {
        step: "🔍 การค้นหาอย่างรวดเร็ว",
        description:
          "ใช้คำสำคัญที่เฉพาะเจาะจงในการค้นหา เช่น หมายเลขรถหรือวันที่แบบ YYYY-MM-DD",
      },
      {
        step: "📊 การติดตามสถิติ",
        description:
          "ดูสรุปข้อมูลในส่วนบนของหน้ารายงาน เพื่อเข้าใจภาพรวมของสถานการณ์",
      },
      {
        step: "🎯 การจัดการเส้นทาง",
        description:
          "อัพเดทเส้นทางให้เป็นปัจจุบันเสมอ เพื่อความถูกต้องของข้อมูล",
      },
      {
        step: "⚡ การทำงานที่รวดเร็ว",
        description: "ใช้ฟิลเตอร์สถานะเพื่อแสดงเฉพาะรายงานที่ต้องการดำเนินการ",
      },
    ],
  },
  {
    id: "5",
    title: "การแก้ไขปัญหาเบื้องต้น",
    icon: "🛠️",
    content: ["วิธีแก้ไขปัญหาที่อาจพบในการใช้งาน"],
    steps: [
      {
        step: "❌ ไม่สามารถแก้ไขข้อมูลได้",
        description:
          'ตรวจสอบว่าได้คลิกปุ่ม "Edit" แล้ว และมั่นใจว่าไม่มีการแก้ไขรายการอื่นอยู่',
      },
      {
        step: "🔄 ข้อมูลไม่อัพเดท",
        description: "รีเฟรชหน้าจอ หรือกลับไปหน้าหลักแล้วเข้ามาใหม่",
      },
      {
        step: "🚫 ไม่พบรายงาน",
        description: "ล้างข้อมูลในช่องค้นหาและฟิลเตอร์ทั้งหมด แล้วลองใหม่",
      },
      {
        step: "💾 การบันทึกไม่สำเร็จ",
        description: 'ตรวจสอบให้แน่ใจว่ากรอกข้อมูลครบถ้วนแล้วคลิก "Save"',
      },
    ],
  },
  {
    id: "6",
    title: "คำถามที่พบบ่อย (FAQ)",
    icon: "❓",
    content: ["คำตอบสำหรับคำถามที่ผู้ใช้งานมักจะสงสัย"],
    steps: [
      {
        step: "💻 ระบบใช้งานบนอุปกรณ์ไหนได้บ้าง?",
        description:
          "ระบบรองรับการใช้งานบนมือถือ แท็บเล็ต และคอมพิวเตอร์ ผ่านเว็บเบราว์เซอร์",
      },
      {
        step: "🔐 ข้อมูลปลอดภัยแค่ไหน?",
        description:
          "ข้อมูลทั้งหมดถูกเก็บในระบบที่ปลอดภัย และมีการสำรองข้อมูลอย่างสม่ำเสมอ",
      },
      {
        step: "📱 มีแอปมือถือไหม?",
        description:
          "ปัจจุบันใช้งานผ่านเว็บเบราว์เซอร์ แต่สามารถเพิ่มหน้าเว็บเป็นแอปได้",
      },
      {
        step: "👥 ใครสามารถเข้าถึงข้อมูลได้?",
        description:
          "เฉพาะผู้ที่ได้รับสิทธิ์เท่านั้นที่สามารถเข้าถึงและแก้ไขข้อมูลได้",
      },
    ],
  },
];

export default function Index() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const renderSection = (section: TutorialSection) => {
    const isExpanded = expandedSection === section.id;

    return (
      <View
        key={section.id}
        style={[
          styles.sectionCard,
          {
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e2e8f0",
            shadowColor: isDark ? "#000000" : "#1e3a8a",
            boxShadow: isDark
              ? "0px 2px 4px rgba(0,0,0,0.25)"
              : "0px 2px 4px rgba(30,58,138,0.25)",
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.sectionHeader,
            {
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
            },
          ]}
          onPress={() => toggleSection(section.id)}
          activeOpacity={0.8}
        >
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionIcon}>{section.icon}</Text>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: isDark ? "#f9fafb" : "#1e3a8a",
                },
              ]}
            >
              {section.title}
            </Text>
          </View>
          <Text
            style={[
              styles.expandIcon,
              {
                color: isDark ? "#9ca3af" : "#64748b",
              },
            ]}
          >
            {isExpanded ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {isExpanded && (
          <View
            style={[
              styles.sectionContent,
              {
                backgroundColor: isDark ? "#111827" : "#f8f9fa",
                borderTopColor: isDark ? "#374151" : "#e2e8f0",
              },
            ]}
          >
            {section.content.map((paragraph, index) => (
              <Text
                key={index}
                style={[
                  styles.contentText,
                  {
                    color: isDark ? "#d1d5db" : "#475569",
                  },
                ]}
              >
                {paragraph}
              </Text>
            ))}

            {section.steps && (
              <View style={styles.stepsContainer}>
                {section.steps.map((step, index) => (
                  <View
                    key={index}
                    style={[
                      styles.stepItem,
                      {
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        borderColor: isDark ? "#374151" : "#e2e8f0",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.stepTitle,
                        {
                          color: isDark ? "#60a5fa" : "#1e3a8a",
                        },
                      ]}
                    >
                      {step.step}
                    </Text>
                    <Text
                      style={[
                        styles.stepDescription,
                        {
                          color: isDark ? "#9ca3af" : "#64748b",
                        },
                      ]}
                    >
                      {step.description}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDark ? "#0f172a" : "#f8f9fa",
        },
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[
            styles.mainTitle,
            {
              color: isDark ? "#60a5fa" : "#1e3a8a",
            },
          ]}
        >
          📚 คู่มือการใช้งาน
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: isDark ? "#9ca3af" : "#64748b",
            },
          ]}
        >
          เรียนรู้วิธีใช้งานระบบจัดการรถโดยสาร
        </Text>
      </View>

      {/* Welcome Card */}
      <View
        style={[
          styles.welcomeCard,
          {
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e2e8f0",
            shadowColor: isDark ? "#000000" : "#1e3a8a",
            boxShadow: isDark
              ? "0px 2px 4px rgba(0,0,0,0.25)"
              : "0px 2px 4px rgba(30,58,138,0.25)",
          },
        ]}
      >
        <Text style={styles.welcomeIcon}>🎯</Text>
        <Text
          style={[
            styles.welcomeTitle,
            {
              color: isDark ? "#60a5fa" : "#1e3a8a",
            },
          ]}
        >
          ยินดีต้อนรับ!
        </Text>
        <Text
          style={[
            styles.welcomeText,
            {
              color: isDark ? "#94a3b8" : "#64748b",
            },
          ]}
        >
          คู่มือฉบับนี้จะพาคุณไปรู้จักกับฟีเจอร์ต่างๆ ของระบบ
          และเรียนรู้วิธีใช้งานอย่างมีประสิทธิภาพ
        </Text>
      </View>

      {/* Quick Stats */}
      <View
        style={[
          styles.statsCard,
          {
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e2e8f0",
            shadowColor: isDark ? "#000000" : "#1e3a8a",
            boxShadow: isDark
              ? "0px 2px 4px rgba(0,0,0,0.25)"
              : "0px 2px 4px rgba(30,58,138,0.25)",
          },
        ]}
      >
        <View style={styles.statItem}>
          <Text
            style={[
              styles.statNumber,
              {
                color: isDark ? "#60a5fa" : "#1e3a8a",
              },
            ]}
          >
            {tutorialData.length}
          </Text>
          <Text
            style={[
              styles.statLabel,
              {
                color: isDark ? "#9ca3af" : "#64748b",
              },
            ]}
          >
            หัวข้อหลัก
          </Text>
        </View>
        <View
          style={[
            styles.statDivider,
            {
              backgroundColor: isDark ? "#374151" : "#e2e8f0",
            },
          ]}
        />
        <View style={styles.statItem}>
          <Text
            style={[
              styles.statNumber,
              {
                color: isDark ? "#60a5fa" : "#1e3a8a",
              },
            ]}
          >
            {tutorialData.reduce(
              (total, section) => total + (section.steps?.length || 0),
              0
            )}
          </Text>
          <Text
            style={[
              styles.statLabel,
              {
                color: isDark ? "#9ca3af" : "#64748b",
              },
            ]}
          >
            ขั้นตอนทั้งหมด
          </Text>
        </View>
        <View
          style={[
            styles.statDivider,
            {
              backgroundColor: isDark ? "#374151" : "#e2e8f0",
            },
          ]}
        />
        <View style={styles.statItem}>
          <Text
            style={[
              styles.statNumber,
              {
                color: isDark ? "#60a5fa" : "#1e3a8a",
              },
            ]}
          >
            3
          </Text>
          <Text
            style={[
              styles.statLabel,
              {
                color: isDark ? "#9ca3af" : "#64748b",
              },
            ]}
          >
            หน้าหลัก
          </Text>
        </View>
      </View>

      {/* Navigation Tips */}
      <View
        style={[
          styles.tipsCard,
          {
            backgroundColor: isDark ? "#1e3a8a" : "#eff6ff",
            borderColor: isDark ? "#3b82f6" : "#dbeafe",
          },
        ]}
      >
        <Text
          style={[
            styles.tipsTitle,
            {
              color: isDark ? "#dbeafe" : "#1e3a8a",
            },
          ]}
        >
          💡 เคล็ดลับการอ่าน
        </Text>
        <View style={styles.tipsList}>
          <Text
            style={[
              styles.tipItem,
              {
                color: isDark ? "#bfdbfe" : "#1e40af",
              },
            ]}
          >
            • คลิกที่หัวข้อเพื่อดูรายละเอียด
          </Text>
          <Text
            style={[
              styles.tipItem,
              {
                color: isDark ? "#bfdbfe" : "#1e40af",
              },
            ]}
          >
            • อ่านตามลำดับเพื่อความเข้าใจที่ดี
          </Text>
          <Text
            style={[
              styles.tipItem,
              {
                color: isDark ? "#bfdbfe" : "#1e40af",
              },
            ]}
          >
            • ลองปฏิบัติตามขณะอ่าน
          </Text>
        </View>
      </View>

      {/* Tutorial Sections */}
      <View style={styles.sectionsContainer}>
        {tutorialData.map(renderSection)}
      </View>

      {/* Support Card */}
      <View
        style={[
          styles.supportCard,
          {
            backgroundColor: isDark ? "#0f172a" : "#f0f9ff",
            borderColor: isDark ? "#1e40af" : "#bae6fd",
          },
        ]}
      >
        <Text style={styles.supportIcon}>🤝</Text>
        <Text
          style={[
            styles.supportTitle,
            {
              color: isDark ? "#60a5fa" : "#0c4a6e",
            },
          ]}
        >
          ต้องการความช่วยเหลือเพิ่มเติม?
        </Text>
        <Text
          style={[
            styles.supportText,
            {
              color: isDark ? "#93c5fd" : "#0369a1",
            },
          ]}
        >
          หากคุณมีคำถามหรือพบปัญหาในการใช้งาน สามารถติดต่อทีมสนับสนุนได้ตลอดเวลา
        </Text>
      </View>
    </ScrollView>
  );
}
