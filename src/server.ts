// src/server.ts (tetap dipakai untuk dev lokal)
import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});