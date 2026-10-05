import { CookieOptions } from "express";

export const COOKIE_NAME = "token";
export const TOKEN_TTL_MS = 60 * 60 * 1000; // samakan dengan expiresIn di jwt.ts

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};