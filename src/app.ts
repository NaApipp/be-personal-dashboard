// src/app.ts
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoutes";
import asignmentRoutes from "./routes/asignmentRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";
import { originCheck } from "./middleware/originMiddleware";
import { allowedOrigins } from "./utils/origin";

const app = express();

app.set("trust proxy", 1);
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser()); // sebelum route dan requireAuth
app.use(originCheck);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server API Porto berhasil jalan!" });
});

app.use("/api/auth", authRoutes);
app.use("/api", messageRoutes);
app.use("/api/asignment", asignmentRoutes);
app.use("/api/schedule", scheduleRoutes);

export default app;
