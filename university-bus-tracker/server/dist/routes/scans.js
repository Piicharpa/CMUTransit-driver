"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// ช่วงเวลาทำงานสมมติ: 06:00 - 18:00
function isWorkingTime() {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 6 && hour < 18;
}
router.post("/checkin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { busId, driverId } = req.body;
        if (!busId || !driverId)
            return res.status(400).json({ error: "busId and driverId are required" });
        // if (!isWorkingTime()) 
        // return res.status(400).json({ error: "Driver is not in working time" });
        // หาคนที่กำลังขับอยู่
        const activeSession = yield prisma.history.findFirst({
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
            const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            yield prisma.history.update({
                where: { id: activeSession.id },
                data: {
                    endTime: new Date(),
                    duration: formattedDuration,
                },
            });
            yield prisma.driverStatus.upsert({
                where: { driverId: activeSession.driverId },
                update: { status: "waiting" },
                create: { driverId: activeSession.driverId, status: "waiting" },
            });
        }
        // เปิด session ใหม่ให้ driverId ที่กำลัง scan
        yield prisma.history.create({
            data: {
                busId,
                driverId,
                startTime: new Date(),
            },
        });
        yield prisma.driverStatus.upsert({
            where: { driverId },
            update: { status: "driving" },
            create: { driverId, status: "driving" },
        });
        res.status(200).json({ message: "Driver started driving" });
    }
    catch (err) {
        console.error("Check-in error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// อัปเดต status เป็น not_working นอกเวลางาน
router.post("/update-status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nowWorking = isWorkingTime();
        yield prisma.driverStatus.updateMany({
            where: {},
            data: {
                status: nowWorking ? "waiting" : "not_working",
            },
        });
        res.status(200).json({ message: "Driver statuses updated" });
    }
    catch (err) {
        console.error("Update status error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// ดึง driver status ทั้งหมด
router.get("/driver-status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statuses = yield prisma.driverStatus.findMany({
            include: {
                Driver: {
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
    }
    catch (err) {
        console.error("Fetch driver status error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.default = router;
