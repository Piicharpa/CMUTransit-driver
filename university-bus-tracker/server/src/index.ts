import express from "express";
import http from "http";
import cors from "cors";
import { pool } from "./db";
import studentRouter from "./routes/students";
import adminRouter from "./routes/admins";
import busRouter from "./routes/buses";
import driverRouter from "./routes/drivers";
import categoryRouter from "./routes/categories"; // This line is crucial
import scanRoutes from "./routes/scans";


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5001;

// Code for debugging
app.get('/test-db', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json(result.rows[0]);
});

app.use('/students', studentRouter);
app.use('/admins', adminRouter);
app.use('/buses', busRouter);
app.use('/drivers', driverRouter);
app.use('/categories', categoryRouter); // This line is correct
app.use("/scans", scanRoutes);


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