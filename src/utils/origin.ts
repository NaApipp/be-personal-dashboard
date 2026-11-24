export const allowedOrigins = [
  "https://dashboard.appsporto.my.id",
  "https://appsporto.my.id",
  "https://api.appsporto.my.id",
  "http://127.0.0.1:5173"
];

export const isAllowedOrigin = (origin?: string) => {
  if (!origin) return true;

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  return /^https?:\/\/(localhost|127\.0\.0\.1)(?::\d+)?$/.test(origin);
};