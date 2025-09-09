import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

//POST /categories
router.post("/", async (req, res) => {
  try {
    const newCategory = await prisma.category.create({
      data: req.body,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Could not create category." });
  }
});

//GET /categories
router.get("/", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch categories." });
  }
});

//GET /categories/:id
router.get("/:id", async (req, res) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "Category not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Could not fetch category." });
  }
});

//PUT /categories/:id 
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Could not update category." });
  }
});

//DELETE /categories/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await prisma.category.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(deletedCategory);
  } catch (error) {
    res.status(500).json({ error: "Could not delete category." });
  }
});

export default router;