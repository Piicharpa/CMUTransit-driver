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
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// POST /checkin  { busId, driverId }
app.post("/checkin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { busId, driverId } = req.body;
    if (!busId || !driverId) {
        return res.status(400).json({ error: "busId and driverId are required" });
    }
    try {
        // Find active session of this bus
        const active = yield prisma.history.findFirst({
            where: { busId, endTime: null },
            orderBy: { startTime: "desc" },
        });
        // Close it if exists
        if (active) {
            yield prisma.history.update({
                where: {
                    // FIX: Use the composite primary key syntax
                    id_startTime: {
                        id: active.id,
                        startTime: active.startTime,
                    },
                },
                data: {
                    endTime: new Date(),
                    duration: Math.floor((Date.now() - active.startTime.getTime()) / 1000),
                },
            });
        }
        // Start a new session for this driver
        const session = yield prisma.history.create({
            data: { busId, driverId, startTime: new Date() },
        });
        res.json({ success: true, session });
    }
    catch (e) {
        // if two checkins race, the partial unique index will protect you
        if (e.code === "P2002") {
            return res.status(409).json({ error: "Active session already exists for this bus" });
        }
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// GET /drivers/total-time  → total duration per driver (seconds)
app.get("/drivers/total-time", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grouped = yield prisma.history.groupBy({
            by: ["driverId"],
            _sum: { duration: true },
        });
        res.json(grouped);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// GET /bus/:busId/sessions → all sessions for a bus (latest first)
app.get("/bus/:busId/sessions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busId = Number(req.params.busId);
    try {
        const sessions = yield prisma.history.findMany({
            where: { busId },
            orderBy: { startTime: "desc" },
        });
        res.json(sessions);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Example Timescale time-bucket analytics: total driven seconds by hour (last 24h)
// GET /analytics/hourly?busId=123 (busId optional)
app.get("/analytics/hourly", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busId = req.query.busId ? Number(req.query.busId) : null;
    try {
        const rows = busId
            ? yield prisma.$queryRawUnsafe(`
            SELECT time_bucket('1 hour', start_time) AS bucket,
                   SUM(COALESCE(duration, EXTRACT(EPOCH FROM (COALESCE(end_time, NOW()) - start_time))::int)) AS total_seconds
            FROM histories
            WHERE start_time > NOW() - INTERVAL '24 hours'
              AND bus_id = $1
            GROUP BY bucket
            ORDER BY bucket;
            `, busId)
            : yield prisma.$queryRawUnsafe(`
            SELECT time_bucket('1 hour', start_time) AS bucket,
                   SUM(COALESCE(duration, EXTRACT(EPOCH FROM (COALESCE(end_time, NOW()) - start_time))::int)) AS total_seconds
            FROM histories
            WHERE start_time > NOW() - INTERVAL '24 hours'
            GROUP BY bucket
            ORDER BY bucket;
            `);
        res.json(rows);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`api running on http://localhost:${PORT}`);
});
