import { Router } from 'express';
import {
  addAsignment,
  deleteAsignment,
  getAllAsignment,
  getAsignmentById,
  updateAsignment
} from "../controllers/asignmentController";

const router = Router();
// message routes
router.post("/", addAsignment);
router.get("/", getAllAsignment);
router.get("/:id_task", getAsignmentById);
router.put("/:id_task", updateAsignment);
router.delete("/:id_task", deleteAsignment);

export default router;