export const allowedOrigins = [
  "https://dashboard.appsporto.my.id",
  "https://appsporto.my.id",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];

export const isAllowedOrigin = (origin?: string) => {
  if (!origin) return true;

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  return /^https?:\/\/(localhost|127\.0\.0\.1)(?::\d+)?$/.test(origin);
};