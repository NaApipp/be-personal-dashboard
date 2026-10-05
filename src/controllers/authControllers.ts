import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../types/user";
import { generateToken } from "../utils/jwt";
import { COOKIE_NAME, TOKEN_TTL_MS, cookieOptions } from "../utils/cookie";
import { authMiddleware } from "../middleware/authMiddleware";

// sementara pakai array, ganti dengan database nanti
let users: User[] = [
  {
    id_user: 1,
    name: "n_apipppp",
    email: "nabilapipp@gmail.com",
    // Testing1#
    password: "$2a$12$379ClR9tw60yXGn7PtabtOoWHhXwjuOZCKoTKSBxrw5Gu9VC1fxiW",
  },
];

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Name dan password wajib diisi" });
    }

    // Find user by name
    // Cek User
    const user = users.find((u) => u.name === name);
    if (!user) {
      return res.status(401).json({ message: "name atau password salah" });
    }

    // Cek Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "name atau password salah" });
    }

    // Generate Token
    const token = generateToken({ id_user: user.id_user, name: user.name });

    // Set cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    // Response Login Success
    res
      .cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: TOKEN_TTL_MS })
      .json({
        success: true,
        message: "Login berhasil",
        user: { id_user: user.id_user, name: user.name },
        token,
      });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// Logout
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie(COOKIE_NAME, cookieOptions).json({
      success: true,
      message: "Logout berhasil",
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server saat logout" });
  }
};

// GET PROFILE (protected route contoh)
export const me = (req: Request, res: Response) => {
  res.json({ user: req.user });
};