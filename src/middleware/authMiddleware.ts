import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { COOKIE_NAME } from "../utils/cookie";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.[COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = { id_user: decoded.id_user, name: decoded.name };
    next();
  } catch {
    return res.status(401).json({ message: "Token tidak valid atau kadaluarsa" });
  }
};