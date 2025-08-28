import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

function isPrismaKnownRequestError(e: any): e is PrismaClientKnownRequestError {
  return typeof e === "object" && e !== null && "code" in e;
}

const router = express.Router();
const prisma = new PrismaClient();

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Could not fetch students." });
  }
});

//GET /students/:id (use studentId)
router.get('/:id', async (req, res) => {
  const studentId = parseInt(req.params.id);

  if (isNaN(studentId)) {
    return res.status(400).json({ error: "Invalid student ID." });
  }

  try {
    const student = await prisma.student.findUnique({
      where: {
        studentId: studentId,
      }
    });

    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: "Student not found." });
    }
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Could not fetch student." });
  }
});



// CREATE student
router.post("/", async (req, res) => {
  const { name, studentId, email, role } = req.body;

  if (!name || !studentId || !email) {
    return res.status(400).json({ error: "Missing required fields: name, studentId, or email." });
  }

  try {
    const newStudent = await prisma.student.create({
      data: { name, studentId, email, role },
    });
    res.status(201).json(newStudent);
  } catch (error) {
    if (isPrismaKnownRequestError(error) && error.code === "P2002") {
      res.status(409).json({ error: `A student with studentId ${studentId} already exists.` });
    } else {
      console.error("Error creating student:", error);
      res.status(500).json({ error: "Could not create student." });
    }
  }
});

// UPDATE student by ID
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, role } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid student ID." });
  }

  try {
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: { name, email, role },
    });
    res.json(updatedStudent);
  } catch (error) {
    if (isPrismaKnownRequestError(error) && error.code === "P2025") {
      return res.status(404).json({ error: `Student with ID ${id} not found.` });
    }
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Could not update student." });
  }
});

// DELETE student by ID
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid student ID." });
  }

  try {
    const deletedStudent = await prisma.student.delete({ where: { id } });
    res.json(deletedStudent);
  } catch (error) {
    if (isPrismaKnownRequestError(error) && error.code === "P2025") {
      return res.status(404).json({ error: `Student with ID ${id} not found.` });
    }
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Could not delete student." });
  }
});

export default router;
