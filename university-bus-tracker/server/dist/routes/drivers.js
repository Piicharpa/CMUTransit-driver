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
function isPrismaKnownRequestError(e) {
    return typeof e === "object" && e !== null && "code" in e;
}
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// POST /drivers
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fname, lname, email, role } = req.body;
        if (!fname || !lname || !email) {
            return res.status(400).json({ error: "Missing required fields." });
        }
        const newDriver = yield prisma.driver.create({
            data: {
                fname,
                lname,
                email,
                role,
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
// GET /drivers
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drivers = yield prisma.driver.findMany();
        res.json(drivers);
    }
    catch (error) {
        res.status(500).json({ error: "Could not fetch drivers." });
    }
}));
// GET /drivers/:id
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driver = yield prisma.driver.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (driver) {
            res.json(driver);
        }
        else {
            res.status(404).json({ error: "Driver not found." });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Could not fetch driver." });
    }
}));
// PUT /drivers/:id
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDriver = yield prisma.driver.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
        });
        res.json(updatedDriver);
    }
    catch (error) {
        if (isPrismaKnownRequestError(error) && error.code === "P2025") {
            return res.status(404).json({ error: `Driver with ID ${req.params.id} not found.` });
        }
        // Corrected error check for unique constraint violation
        if (isPrismaKnownRequestError(error) && error.code === "P2002") {
            return res.status(409).json({ error: "A driver with this email already exists." });
        }
        console.error("Error updating driver:", error);
        res.status(500).json({ error: "Could not update driver." });
    }
}));
// DELETE /drivers/:id
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDriver = yield prisma.driver.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.json(deletedDriver);
    }
    catch (error) {
        // Corrected error check for not found
        if (isPrismaKnownRequestError(error) && error.code === "P2025") {
            return res.status(404).json({ error: `Driver with ID ${req.params.id} not found.` });
        }
        console.error("Error deleting driver:", error);
        res.status(500).json({ error: "Could not delete driver." });
    }
}));
exports.default = router;
