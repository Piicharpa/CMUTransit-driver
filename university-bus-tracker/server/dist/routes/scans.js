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
router.post("/checkin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { busId, driverId } = req.body;
        if (!busId || !driverId) {
            return res.status(400).json({ error: "busId and driverId are required" });
        }
        // Find active session
        const activeSession = yield prisma.history.findFirst({
            where: { busId, endTime: null },
            orderBy: { startTime: "desc" },
        });
        // If old session exists, close it
        if (activeSession) {
            yield prisma.history.update({
                where: { id: activeSession.id },
                data: {
                    endTime: new Date(),
                    duration: Math.floor((Date.now() - activeSession.startTime.getTime()) / 1000),
                },
            });
        }
        // Start new session
        yield prisma.history.create({
            data: {
                busId,
                driverId,
                startTime: new Date(),
            },
        });
        res.status(200).json({ message: "Check-in successful" });
    }
    catch (err) {
        console.error("Check-in error:", err); // <--- Log the real error
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.default = router;
