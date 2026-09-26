import { Router } from 'express';
import {
  addMessage,
  getMessage,
} from "../controllers/messageControllers";

const router = Router();
// message routes
router.post("/message", addMessage);
router.get("/message", getMessage);

export default router;