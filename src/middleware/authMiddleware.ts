import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token tidak ditemukan. Gunakan header: Authorization: Bearer <token>" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = { id_user: decoded.id_user, name: decoded.name };
    next();
  } catch {
    return res.status(401).json({ message: "Token tidak valid atau kadaluarsa" });
  }
};