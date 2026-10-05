import { Router } from 'express';
import {
  login,
  logout,
  me
} from '../controllers/authControllers';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get("/me", authMiddleware, me);


export default router;