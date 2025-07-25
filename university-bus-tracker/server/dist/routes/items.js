"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let items = [];
router.get('/', (req, res) => {
    res.json(items);
});
router.post('/', express_1.default.json(), (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem);
});
exports.default = router;
