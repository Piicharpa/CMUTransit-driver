import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/checkin", async (req, res) => {
  try {
    const { busId, driverId } = req.body;

    if (!busId || !driverId) {
      return res.status(400).json({ error: "busId and driverId are required" });
    }

    // Find active session
    const activeSession = await prisma.history.findFirst({
      where: { busId, endTime: null },
      orderBy: { startTime: "desc" },
    });

    // If old session exists, close it
    if (activeSession) {
      await prisma.history.update({
        where: { id: activeSession.id },
        data: {
          endTime: new Date(),
          duration: Math.floor(
            (Date.now() - activeSession.startTime.getTime()) / 1000
          ),
        },
      });
    }

    // Start new session
    await prisma.history.create({
      data: {
        busId,
        driverId,
        startTime: new Date(),
      },
    });

    res.status(200).json({ message: "Check-in successful" });
  } catch (err) {
    console.error("Check-in error:", err); // <--- Log the real error
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
