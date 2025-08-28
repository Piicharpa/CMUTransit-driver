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
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const students_1 = __importDefault(require("./routes/students"));
const admins_1 = __importDefault(require("./routes/admins"));
const buses_1 = __importDefault(require("./routes/buses"));
const drivers_1 = __importDefault(require("./routes/drivers"));
const categories_1 = __importDefault(require("./routes/categories")); // This line is crucial
const scans_1 = __importDefault(require("./routes/scans"));
const report_1 = __importDefault(require("./routes/report"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = 5001;
// Code for debugging
app.get('/test-db', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.pool.query('SELECT NOW()');
    res.json(result.rows[0]);
}));
app.use('/students', students_1.default);
app.use('/admins', admins_1.default);
app.use('/buses', buses_1.default);
app.use('/drivers', drivers_1.default);
app.use('/categories', categories_1.default); // This line is correct
app.use("/scans", scans_1.default);
app.use("/reports", report_1.default);
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });
// io.on("connection", (socket) => {
//   console.log("a user connected:", socket.id);
//   socket.on("disconnect", () => {
//     console.log("user disconnected:", socket.id);
//   });
// });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
