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
//POST /admins
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAdmin = yield prisma.admin.create({
            data: req.body,
        });
        res.status(201).json(newAdmin);
    }
    catch (error) {
        res.status(500).json({ error: "Could not create admin." });
    }
}));
//GET /admins
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield prisma.admin.findMany();
        res.json(admins);
    }
    catch (error) {
        res.status(500).json({ error: "Could not fetch admins." });
    }
}));
//GET /admins/:id
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield prisma.admin.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (admin) {
            res.json(admin);
        }
        else {
            res.status(404).json({ error: "Admin not found." });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Could not fetch admin." });
    }
}));
//PUT /admins/:id
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAdmin = yield prisma.admin.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
        });
        res.json(updatedAdmin);
    }
    catch (error) {
        res.status(500).json({ error: "Could not update admin." });
    }
}));
//DELETE /admins/:id
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedAdmin = yield prisma.admin.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.json(deletedAdmin);
    }
    catch (error) {
        res.status(500).json({ error: "Could not delete admin." });
    }
}));
exports.default = router;
