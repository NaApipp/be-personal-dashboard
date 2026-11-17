import { Router } from 'express';
import {
  addMessage,
  getMessage,
} from "../controllers/messageControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
// message routes
router.post("/message", addMessage); // public - form kontak
router.get("/message", authMiddleware, getMessage); // protected - perlu Bearer token

export default router;
