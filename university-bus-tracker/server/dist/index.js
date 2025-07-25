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
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const items_1 = __importDefault(require("./routes/items"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
app.use((0, cors_1.default)());
const PORT = 3001;
app.get('/test-db', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.pool.query('SELECT NOW()');
    res.json(result.rows[0]);
}));
app.use('/items', items_1.default);
io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnected:", socket.id);
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
