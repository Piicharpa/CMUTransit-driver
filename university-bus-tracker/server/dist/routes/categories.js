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
//POST /categories
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = yield prisma.category.create({
            data: req.body,
        });
        res.status(201).json(newCategory);
    }
    catch (error) {
        res.status(500).json({ error: "Could not create category." });
    }
}));
//GET /categories
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma.category.findMany();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ error: "Could not fetch categories." });
    }
}));
//GET /categories/:id
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield prisma.category.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (category) {
            res.json(category);
        }
        else {
            res.status(404).json({ error: "Category not found." });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Could not fetch category." });
    }
}));
//PUT /categories/:id 
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCategory = yield prisma.category.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
        });
        res.json(updatedCategory);
    }
    catch (error) {
        res.status(500).json({ error: "Could not update category." });
    }
}));
//DELETE /categories/:id
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCategory = yield prisma.category.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.json(deletedCategory);
    }
    catch (error) {
        res.status(500).json({ error: "Could not delete category." });
    }
}));
exports.default = router;
