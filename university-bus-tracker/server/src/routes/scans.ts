import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ช่วงเวลาทำงานสมมติ: 06:00 - 18:00
function isWorkingTime(): boolean {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 6 && hour < 18;
}

router.post("/checkin", async (req, res) => {
  try {
    const { busId, driverId } = req.body;
    if (!busId || !driverId)
      return res.status(400).json({ error: "busId and driverId are required" });

    // if (!isWorkingTime()) 
    // return res.status(400).json({ error: "Driver is not in working time" });

    // หาคนที่กำลังขับอยู่
    const activeSession = await prisma.history.findFirst({
      where: { busId, endTime: null },
      orderBy: { startTime: "desc" },
    });

    // ถ้ามีคนขับอยู่ → ปิด session ของเขา + เปลี่ยนสถานะเป็น waiting
    if (activeSession) {
      const diffMs = Date.now() - activeSession.startTime.getTime();
      const diffSec = Math.floor(diffMs / 1000);
      const hours = Math.floor(diffSec / 3600);
      const minutes = Math.floor((diffSec % 3600) / 60);
      const seconds = diffSec % 60;
      const formattedDuration = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

      await prisma.history.update({
        where: { id: activeSession.id },
        data: {
          endTime: new Date(),
          duration: formattedDuration,
        },
      });

      await prisma.driverStatus.upsert({
        where: { driverId: activeSession.driverId },
        update: { status: "waiting" },
        create: { driverId: activeSession.driverId, status: "waiting" },
      });
    }

    // เปิด session ใหม่ให้ driverId ที่กำลัง scan
    await prisma.history.create({
      data: {
        busId,
        driverId,
        startTime: new Date(),
      },
    });

    await prisma.driverStatus.upsert({
      where: { driverId },
      update: { status: "driving" },
      create: { driverId, status: "driving" },
    });

    res.status(200).json({ message: "Driver started driving" });
  } catch (err) {
    console.error("Check-in error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// อัปเดต status เป็น not_working นอกเวลางาน
router.post("/update-status", async (req, res) => {
  try {
    const nowWorking = isWorkingTime();

    await prisma.driverStatus.updateMany({
      where: {},
      data: {
        status: nowWorking ? "waiting" : "not_working",
      },
    });

    res.status(200).json({ message: "Driver statuses updated" });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// ดึง driver status ทั้งหมด
router.get("/driver-status", async (req, res) => {
  try {
    const statuses = await prisma.driverStatus.findMany({
      include: {
        Driver: { // ดึงข้อมูลคนขับด้วย
          select: {
            id: true,
            fname: true,
            lname: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json(statuses);
  } catch (err) {
    console.error("Fetch driver status error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
