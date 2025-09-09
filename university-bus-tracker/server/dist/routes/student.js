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
const prisma = new client_1.PrismaClient(); // Instantiate Prisma Client
/**
 * @route GET /students
 * @description Retrieves a list of all students
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield prisma.student.findMany();
        res.json(students);
    }
    catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Could not fetch students." });
    }
}));
/**
 * @route GET /students/:studentId
 * @description Retrieves a single student by their unique studentId
 */
router.get('/:studentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = parseInt(req.params.studentId);
    if (isNaN(studentId)) {
        return res.status(400).json({ error: "Invalid student ID." });
    }
    try {
        const student = yield prisma.student.findUnique({
            where: {
                studentId: studentId,
            },
            // Optionally include related data like reports
            // include: {
            //   Report: true,
            // },
        });
        if (student) {
            res.json(student);
        }
        else {
            res.status(404).json({ error: "Student not found." });
        }
    }
    catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ error: "Could not fetch student." });
    }
}));
/**
 * @route POST /students
 * @description Creates a new student record
 */
router.post('/', express_1.default.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, studentId, email, role } = req.body;
    try {
        const newStudent = yield prisma.student.create({
            data: {
                name,
                studentId,
                email,
                role,
            },
        });
        res.status(201).json(newStudent);
    }
    catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ error: "Could not create student." });
    }
}));
exports.default = router;
