import { Request, Response, NextFunction } from "express";
import { isAllowedOrigin } from "../utils/origin";

const UNSAFE = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export const originCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!UNSAFE.has(req.method)) {
    return next();
  }

  const origin = req.headers.origin;

  if (!origin && process.env.NODE_ENV === "production") {
    return res.status(403).json({ message: "Forbidden origin" });
  }

  if (origin && !isAllowedOrigin(origin)) {
    return res.status(403).json({ message: "Forbidden origin" });
  }

  next();
};