import { 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  useColorScheme 
} from 'react-native';
import { useState } from 'react';
import { styles } from '..//theme/student_theme/howToUse';

interface GuideSection {
  id: string;
  title: string;
  icon: string;
  content: string[];
  tips?: string[];
}

const guideData: GuideSection[] = [
  {
    id: '1',
    title: 'แดชบอร์ดรถประจำทาง',
    icon: '🚌',
    content: [
      '• ดูรถที่กำลังวิ่งอยู่ในปัจจุบัน',
      '• กดปุ่ม "รายงาน" เพื่อรายงานปัญหาของรถที่กำลังวิ่ง',
      '• กดปุ่ม "ค้นหารถตามเวลาเหตุการณ์" เพื่อรายงานรถที่เคยวิ่ง',
      '• ระบุวันที่และเวลาที่เกิดเหตุการณ์เพื่อค้นหารถ'
    ],
    tips: [
      'ระบบจะแสดงเฉพาะรถที่วิ่งในช่วงเวลาที่เกิดเหตุการณ์',
      'รถที่วิ่งในเวลานั้นจะแสดงเป็นสีเขียว'
    ]
  },
  {
    id: '2',
    title: 'การรายงานปัญหา',
    icon: '📋',
    content: [
      '• เลือกหมวดหมู่การรายงาน (ปัญหารถ, เส้นทาง, ผู้โดยสาร, ฯลฯ)',
      '• กรอกหัวข้อรายงานให้กระชับ',
      '• ระบุเวลาที่เกิดเหตุการณ์',
      '• อธิบายรายละเอียดปัญหาที่เกิดขึ้น',
      '• กดส่งรายงานเพื่อบันทึกข้อมูล'
    ],
    tips: [
      'กรอกข้อมูลให้ครบถ้วนเพื่อการติดตามที่มีประสิทธิภาพ',
      'ระบุเวลาให้แม่นยำเพื่อความถูกต้อง'
    ]
  },
  {
    id: '3',
    title: 'ประวัติการขับรถ',
    icon: '📊',
    content: [
      '• ดูประวัติการขับรถทั้งหมดของคุณ',
      '• กรองข้อมูลตามหมายเลขรถ',
      '• ดูสถิติจำนวนเที่ยว, รถที่เคยขับ, และชั่วโมงทั้งหมด',
      '• ตรวจสอบรายละเอียดแต่ละเที่ยว'
    ],
    tips: [
      'ใช้ตัวกรองเพื่อค้นหาข้อมูลเฉพาะรถที่ต้องการ',
      'ข้อมูลจะอัพเดทอัตโนมัติเมื่อเสร็จสิ้นการขับรถ'
    ]
  },
  {
    id: '4',
    title: 'รายงานปัญหา',
    icon: '🔍',
    content: [
      '• ดูรายงานปัญหาทั้งหมดที่เคยส่ง',
      '• กรองตามสถานะ (รอดำเนินการ, กำลังดำเนินการ, ดำเนินการแล้ว)',
      '• กดที่รายงานเพื่อดูรายละเอียดเพิ่มเติม',
      '• ติดตามสถานะการแก้ไข'
    ],
    tips: [
      'สถานะจะอัพเดทตามการดำเนินการของหน่วยงานที่เกี่ยวข้อง',
      'สามารถส่งรายงานใหม่ได้ตลอดเวลา'
    ]
  },
  {
    id: '5',
    title: 'ประวัติการรายงาน',
    icon: '📄',
    content: [
      '• ดูประวัติการรายงานทั้งหมด',
      '• แสดงหมวดหมู่และหัวข้อการรายงาน',
      '• ดูสถานะการดำเนินการ',
      '• กดเพื่อดูรายละเอียดเพิ่มเติม'
    ],
    tips: [
      'ประวัติจะเก็บไว้เพื่อการอ้างอิงในอนาคต',
      'สามารถดูรายละเอียดการแก้ไขปัญหาได้'
    ]
  },
  {
    id: '6',
    title: 'โปรไฟล์คนขับ',
    icon: '👤',
    content: [
      '• จัดการข้อมูลส่วนตัว',
      '• แก้ไขชื่อ-นามสกุล',
      '• เปลี่ยนรูปโปรไฟล์',
      '• ดูข้อมูลการสร้างและอัพเดทโปรไฟล์'
    ],
    tips: [
      'ข้อมูลโปรไฟล์จะใช้ในการระบุตัวตนในรายงาน',
      'แนะนำให้อัพเดทข้อมูลให้เป็นปัจจุบัน'
    ]
  }
];

export default function HowToUse() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  
  const [expandedSection, setExpandedSection] = useState<string>('1');

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? '' : sectionId);
  };

  const renderGuideSection = (section: GuideSection) => {
    const isExpanded = expandedSection === section.id;
    
    return (
      <View
        key={section.id}
        style={[
          styles.sectionCard,
          {
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            shadowColor: isDark ? "#000000" : "#007AFF",
          },
        ]}
      >
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(section.id)}
          activeOpacity={0.8}
        >
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIcon}>{section.icon}</Text>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDark ? "#f3f4f6" : "#111827" },
              ]}
            >
              {section.title}
            </Text>
          </View>
          <Text
            style={[
              styles.expandArrow,
              { color: isDark ? "#60a5fa" : "#3b82f6" },
            ]}
          >
            {isExpanded ? "▼" : "▶"}
          </Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.sectionContent}>
            <View
              style={[
                styles.separator,
                { backgroundColor: isDark ? "#374151" : "#e5e7eb" },
              ]}
            />
            
            <View style={styles.contentSection}>
              <Text
                style={[
                  styles.contentTitle,
                  { color: isDark ? "#d1d5db" : "#374151" },
                ]}
              >
                📖 วิธีใช้งาน
              </Text>
              
              {section.content.map((item, index) => (
                <Text
                  key={index}
                  style={[
                    styles.contentItem,
                    { color: isDark ? "#9ca3af" : "#6b7280" },
                  ]}
                >
                  {item}
                </Text>
              ))}
            </View>

            {section.tips && (
              <View style={styles.tipsSection}>
                <Text
                  style={[
                    styles.tipsTitle,
                    { color: isDark ? "#60a5fa" : "#3b82f6" },
                  ]}
                >
                  💡 เทคนิคและคำแนะนำ
                </Text>
                
                <View
                  style={[
                    styles.tipsContainer,
                    {
                      backgroundColor: isDark ? "#1e3a8a15" : "#dbeafe",
                      borderColor: isDark ? "#3b82f6" : "#93c5fd",
                    },
                  ]}
                >
                  {section.tips.map((tip, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.tipItem,
                        { color: isDark ? "#93c5fd" : "#1e40af" },
                      ]}
                    >
                      • {tip}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0f172a" : "#f9fafb" },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: isDark ? "#60a5fa" : "#007AFF" },
          ]}
        >
          📚 วิธีใช้งานแอพฯ
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? "#9ca3af" : "#6b7280" },
          ]}
        >
          คู่มือการใช้งานแอพพลิเคชันสำหรับคนขับรถประจำทาง
        </Text>
      </View>

      {/* Quick Stats */}
      <View
        style={[
          styles.quickStats,
          {
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            shadowColor: isDark ? "#000000" : "#007AFF",
          },
        ]}
      >
        <View style={styles.statItem}>
          <Text style={styles.statValue}>6</Text>
          <Text
            style={[
              styles.statLabel,
              { color: isDark ? "#9ca3af" : "#6b7280" },
            ]}
          >
            ฟีเจอร์หลัก
          </Text>
        </View>
        <View
          style={[
            styles.statDivider,
            { backgroundColor: isDark ? "#374151" : "#e5e7eb" },
          ]}
        />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>✓</Text>
          <Text
            style={[
              styles.statLabel,
              { color: isDark ? "#9ca3af" : "#6b7280" },
            ]}
          >
            ใช้งานง่าย
          </Text>
        </View>
        <View
          style={[
            styles.statDivider,
            { backgroundColor: isDark ? "#374151" : "#e5e7eb" },
          ]}
        />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>24/7</Text>
          <Text
            style={[
              styles.statLabel,
              { color: isDark ? "#9ca3af" : "#6b7280" },
            ]}
          >
            พร้อมใช้งาน
          </Text>
        </View>
      </View>

      {/* Guide Sections */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {guideData.map((section) => renderGuideSection(section))}

        {/* Footer */}
        <View
          style={[
            styles.footer,
            {
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              borderColor: isDark ? "#374151" : "#e5e7eb",
            },
          ]}
        >
          <Text
            style={[
              styles.footerTitle,
              { color: isDark ? "#60a5fa" : "#3b82f6" },
            ]}
          >
            🎯 เริ่มต้นใช้งาน
          </Text>
          <Text
            style={[
              styles.footerText,
              { color: isDark ? "#9ca3af" : "#6b7280" },
            ]}
          >
            หากมีคำถามหรือต้องการความช่วยเหลือ{"\n"}
            กรุณาติดต่อเจ้าหน้าที่ของบริษัท
          </Text>
          
          <View
            style={[
              styles.contactInfo,
              {
                backgroundColor: isDark ? "#111827" : "#f9fafb",
                borderColor: isDark ? "#374151" : "#e5e7eb",
              },
            ]}
          >
            <Text
              style={[
                styles.contactTitle,
                { color: isDark ? "#f3f4f6" : "#111827" },
              ]}
            >
              📞 ช่องทางติดต่อ
            </Text>
            <Text
              style={[
                styles.contactDetail,
                { color: isDark ? "#d1d5db" : "#374151" },
              ]}
            >
              📧 อีเมล: support@busapp.com{"\n"}
              📱 โทรศัพท์: 02-xxx-xxxx{"\n"}
              🕒 เวลาทำการ: 24 ชั่วโมง
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}