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
function isPrismaKnownRequestError(error) {
    return (error instanceof client_1.Prisma.PrismaClientKnownRequestError);
}
//POST /buses
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fname, lname, email } = req.body;
        if (!fname || !lname || !email) {
            return res.status(400).json({ error: "Missing required fields." });
        }
        const newDriver = yield prisma.driver.create({
            data: {
                fname,
                lname,
                email,
            },
        });
        res.status(201).json(newDriver);
    }
    catch (error) {
        if (isPrismaKnownRequestError(error) && error.code === "P2002") {
            return res.status(409).json({ error: "Driver with this email already exists." });
        }
        console.error("Error creating driver:", error);
        res.status(500).json({ error: "Could not create driver." });
    }
}));
//GET /buses
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buses = yield prisma.bus.findMany();
        res.json(buses);
    }
    catch (error) {
        res.status(500).json({ error: "Could not fetch buses." });
    }
}));
//GET /buses/:id
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bus = yield prisma.bus.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (bus) {
            res.json(bus);
        }
        else {
            res.status(404).json({ error: "Bus not found." });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Could not fetch bus." });
    }
}));
//PUT /buses/:id
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBus = yield prisma.bus.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
        });
        res.json(updatedBus);
    }
    catch (error) {
        res.status(500).json({ error: "Could not update bus." });
    }
}));
//DELETE /buses/:id
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBus = yield prisma.bus.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.json(deletedBus);
    }
    catch (error) {
        res.status(500).json({ error: "Could not delete bus." });
    }
}));
exports.default = router;
