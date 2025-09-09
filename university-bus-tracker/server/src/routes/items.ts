import express from "express";

const router = express.Router();
let items: any[] = [];

router.get('/', (req, res) => {
  res.json(items);
});

router.post('/', express.json(), (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

export default router;
