import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

//POST /admins
router.post("/", async (req, res) => {
  try {
    const newAdmin = await prisma.admin.create({
      data: req.body,
    });
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: "Could not create admin." });
  }
});

//GET /admins
router.get("/", async (req, res) => {
  try {
    const admins = await prisma.admin.findMany();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch admins." });
  }
});

//GET /admins/:id
router.get("/:id", async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ error: "Admin not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Could not fetch admin." });
  }
});

//PUT /admins/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedAdmin = await prisma.admin.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: "Could not update admin." });
  }
});

//DELETE /admins/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedAdmin = await prisma.admin.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(deletedAdmin);
  } catch (error) {
    res.status(500).json({ error: "Could not delete admin." });
  }
});

export default router;