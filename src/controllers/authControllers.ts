import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../types/user";
import { generateToken } from "../utils/jwt";

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

    // Response Login Success - return Bearer token
    res.json({
      success: true,
      message: "Login berhasil",
      user: { id_user: user.id_user, name: user.name },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// Logout (client-side: hapus token dari storage)
export const logout = async (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      message: "Logout berhasil. Silakan hapus token dari client.",
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server saat logout" });
  }
};

// GET PROFILE (protected route)
export const me = (req: Request, res: Response) => {
  res.json({ user: req.user });
};
