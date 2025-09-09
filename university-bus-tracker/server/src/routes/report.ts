import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

//POST /reports
router.post("/", async (req, res) => {
  try {
    const { studentId, busId, categoryId, report } = req.body;
    if (!studentId || !busId || !categoryId || !report) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Validate that the student, bus, and category exist before creating the report.
    // The foreign key for 'Report' references the internal 'id' of 'Student',
    // but we use the unique 'studentId' from the request to find it.
    const existingStudent = await prisma.student.findUnique({
      where: { studentId: studentId },
    });

    const existingBus = await prisma.bus.findUnique({
      where: { id: busId },
    });

    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingStudent) {
      return res.status(404).json({ error: `Student with ID ${studentId} not found.` });
    }
    if (!existingBus) {
      return res.status(404).json({ error: `Bus with ID ${busId} not found.` });
    }
    if (!existingCategory) {
      return res.status(404).json({ error: `Category with ID ${categoryId} not found.` });
    }

    // Now that all foreign keys are validated, create the report.
    const newReport = await prisma.report.create({
      data: {
        studentId: existingStudent.id, // Use the internal student ID for the foreign key
        busId,
        categoryId,
        report,
      },
    });

    res.status(201).json(newReport);
  } catch (error) {
    console.error("Error creating report:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma errors, though our checks should prevent them.
      res.status(400).json({ error: "Invalid data provided for report creation." });
    } else {
      res.status(500).json({ error: "Could not create report due to an internal server error." });
    }
  }
});

// GET /reports
router.get("/", async (req, res) => {
  try {
    // Find all reports and include the related student, bus, and category data
    // to provide more useful information.
    const reports = await prisma.report.findMany({
      include: {
        Student: {
          select: {
            studentId: true,
            name: true,
          },
        },
        Bus: {
          select: {
            routeNumber: true,
            busNumber: true,
          },
        },
        Category: {
          select: {
            name: true,
          },
        },
      },
      // You can also add orderBy here to sort the results.
      // orderBy: {
      //   createdAt: "desc"
      // }
    });
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Could not fetch reports due to an internal server error." });
  }
});


//GET /reports/:studentId
router.get("/:studentId", async (req, res) => {
  try {
    // Parse the unique student ID from the URL parameter.
    const studentId = parseInt(req.params.studentId);
    if (isNaN(studentId)) {
      return res.status(400).json({ error: "Invalid student ID format." });
    }

    // Step 1: Find the student's internal database 'id' using the unique 'studentId'.
    const existingStudent = await prisma.student.findUnique({
      where: { studentId: studentId },
      select: { id: true },
    });

    if (!existingStudent) {
      return res.status(404).json({ message: `No student found with ID ${studentId}.` });
    }

    const reports = await prisma.report.findMany({
      where: {
        studentId: existingStudent.id,
      },
      include: {
        Bus: { select: { id: true, busNumber: true } },
        Category: { select: { id: true, name: true } },
      },
    });

    if (reports.length === 0) {
      return res.status(404).json({ message: "No reports found for this student." });
    }

    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports by studentId:", error);
    res.status(500).json({ error: "Could not fetch reports for this student." });
  }
});

// PUT /reports/:id
router.put("/:id", async (req, res) => {
  try {
    const reportId = parseInt(req.params.id);
    const { studentId, busId, categoryId, report } = req.body;

    // Optional: Validate foreign keys if they are part of the update request
    if (studentId) {
      const existingStudent = await prisma.student.findUnique({
        where: { studentId: studentId },
      });
      if (!existingStudent) {
        return res.status(404).json({ error: `Student with ID ${studentId} not found.` });
      }
      req.body.studentId = existingStudent.id; // Convert to internal ID
    }
    if (busId) {
      const existingBus = await prisma.bus.findUnique({
        where: { id: busId },
      });
      if (!existingBus) {
        return res.status(404).json({ error: `Bus with ID ${busId} not found.` });
      }
    }
    if (categoryId) {
      const existingCategory = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!existingCategory) {
        return res.status(404).json({ error: `Category with ID ${categoryId} not found.` });
      }
    }

    const updatedReport = await prisma.report.update({
      where: { id: reportId },
      data: req.body,
    });

    res.json(updatedReport);
  } catch (error) {
    console.error("Error updating report:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ error: "Report not found with the provided ID." });
    } else {
      res.status(500).json({ error: "Could not update report due to an internal server error." });
    }
  }
});

// DELETE /reports/:id
router.delete("/:id", async (req, res) => {
  try {
    const reportId = parseInt(req.params.id);

    const deletedReport = await prisma.report.delete({
      where: { id: reportId },
    });

    res.json(deletedReport);
  } catch (error) {
    console.error("Error deleting report:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ error: "Report not found with the provided ID." });
    } else {
      res.status(500).json({ error: "Could not delete report due to an internal server error." });
    }
  }
});

export default router;
