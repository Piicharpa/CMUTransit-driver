import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

function isPrismaKnownRequestError(e: any): e is PrismaClientKnownRequestError {
  return typeof e === "object" && e !== null && "code" in e;
}

const router = express.Router();
const prisma = new PrismaClient();

// POST /drivers
router.post("/", async (req, res) => {
  try {
    const { fname, lname, email, role } = req.body;
    if (!fname || !lname || !email) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const newDriver = await prisma.driver.create({
      data: {
        fname,
        lname,
        email,
        role,
      },
    });

    res.status(201).json(newDriver);
  } catch (error) {
    if (isPrismaKnownRequestError(error) && error.code === "P2002") {
      return res.status(409).json({ error: "Driver with this email already exists." });
    }
    console.error("Error creating driver:", error);
    res.status(500).json({ error: "Could not create driver." });
  }
});

// GET /drivers
router.get("/", async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch drivers." });
  }
});

// GET /drivers/:id
router.get("/:id", async (req, res) => {
  try {
    const driver = await prisma.driver.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (driver) {
      res.json(driver);
    } else {
      res.status(404).json({ error: "Driver not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Could not fetch driver." });
  }
});

// PUT /drivers/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedDriver = await prisma.driver.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedDriver);
  } catch (error) {
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
});

// DELETE /drivers/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedDriver = await prisma.driver.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(deletedDriver);
  } catch (error) {
    // Corrected error check for not found
    if (isPrismaKnownRequestError(error) && error.code === "P2025") {
      return res.status(404).json({ error: `Driver with ID ${req.params.id} not found.` });
    }
    console.error("Error deleting driver:", error);
    res.status(500).json({ error: "Could not delete driver." });
  }
});

export default router;