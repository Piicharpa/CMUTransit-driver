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
const library_1 = require("@prisma/client/runtime/library");
function isPrismaKnownRequestError(e) {
    return typeof e === 'object' && e !== null && 'code' in e;
}
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
//GET /students
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
//GET /students/:id (use studentId)
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
        return res.status(400).json({ error: "Invalid student ID." });
    }
    try {
        const student = yield prisma.student.findUnique({
            where: {
                studentId: studentId,
            }
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
//POST /students 
router.post('/', express_1.default.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, studentId, email, role } = req.body;
    if (!name || !studentId || !email) {
        return res.status(400).json({ error: "Missing required fields: name, studentId, or email." });
    }
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
        if (isPrismaKnownRequestError(error) && error.code === 'P2002') {
            res.status(409).json({ error: `A student with studentId ${studentId} already exists.` });
        }
        else {
            console.error("Error creating student:", error);
            res.status(500).json({ error: "Could not create student." });
        }
    }
}));
//PUT /students/:id 
router.put('/:id', express_1.default.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = parseInt(req.params.id);
    const { name, email, role } = req.body;
    if (isNaN(studentId)) {
        return res.status(400).json({ error: "Invalid student ID." });
    }
    try {
        const updatedStudent = yield prisma.student.update({
            where: {
                studentId: studentId,
            },
            data: {
                name,
                email,
                role,
            },
        });
        res.json(updatedStudent);
    }
    catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ error: "Could not update student." });
    }
}));
//DELETE /students/:id (use studentId)
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
        return res.status(400).json({ error: "Invalid student ID." });
    }
    try {
        const deletedStudent = yield prisma.student.delete({
            where: {
                studentId: studentId, // Use the correct field: 'studentId'
            },
        });
        res.json(deletedStudent);
    }
    catch (error) {
        if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: `Student with ID ${studentId} not found.` });
        }
        console.error("Error deleting student:", error);
        res.status(500).json({ error: "Could not delete student." });
    }
}));
exports.default = router;
