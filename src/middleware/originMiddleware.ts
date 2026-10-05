import { Request, Response, NextFunction } from "express";
import { allowedOrigins } from "../utils/origin";

const UNSAFE = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export const originCheck = (req: Request, res: Response, next: NextFunction) => {
  if (UNSAFE.has(req.method)) {
    const origin = req.headers.origin;
    if (!origin || !allowedOrigins.includes(origin)) {
      return res.status(403).json({ message: "Forbidden origin" });
    }
  }
  next();
};