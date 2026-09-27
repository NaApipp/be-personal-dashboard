// src/app.ts
import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoutes";
import asignmentRoutes from "./routes/asignmentRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server API Porto berhasil jalan!" });
});

app.use("/api/auth", authRoutes);
app.use("/api", messageRoutes);
app.use("/api/asignment", asignmentRoutes);
app.use("/api/schedule", scheduleRoutes);

export default app;