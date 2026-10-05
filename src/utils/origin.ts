const prodOrigins = ["https://dashboard.appsporto.my.id"];
const devOrigins = ["http://localhost:3000", "http://localhost:3002"];

export const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? prodOrigins
    : [...prodOrigins, ...devOrigins];