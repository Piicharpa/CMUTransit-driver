import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
function isPrismaKnownRequestError(error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return (error instanceof Prisma.PrismaClientKnownRequestError);
}
//POST /buses
router.post("/", async (req, res) => {
  try {
    const { fname, lname, email } = req.body;
    if (!fname || !lname || !email) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const newDriver = await prisma.driver.create({
      data: {
        fname,
        lname,
        email,
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

//GET /buses
router.get("/", async (req, res) => {
  try {
    const buses = await prisma.bus.findMany();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch buses." });
  }
});

//GET /buses/:id
router.get("/:id", async (req, res) => {
  try {
    const bus = await prisma.bus.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (bus) {
      res.json(bus);
    } else {
      res.status(404).json({ error: "Bus not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Could not fetch bus." });
  }
});

//PUT /buses/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedBus = await prisma.bus.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedBus);
  } catch (error) {
    res.status(500).json({ error: "Could not update bus." });
  }
});

//DELETE /buses/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedBus = await prisma.bus.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(deletedBus);
  } catch (error) {
    res.status(500).json({ error: "Could not delete bus." });
  }
});

export default router;