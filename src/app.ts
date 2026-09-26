// src/app.ts
import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server API Porto berhasil jalan!" });
});

app.use("/api/auth", authRoutes);
app.use("/api", messageRoutes);

export default app;