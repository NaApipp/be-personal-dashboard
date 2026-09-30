import { Router } from "express";
import {
  addAsignment,
  deleteAsignment,
  getAllAsignment,
  getAsignmentById,
  updateAsignment,
} from "../controllers/asignmentController";

import { validate } from "../middleware/validate";
import {
  addAsignmentSchema,
  updateAsignmentSchema,
} from "../schema/asignment.schema";

const router = Router();

// asignment routes
router.post("/", validate(addAsignmentSchema), addAsignment);
router.get("/", getAllAsignment);
router.get("/:id_task", getAsignmentById);
router.put("/:id_task", validate(updateAsignmentSchema), updateAsignment);
router.delete("/:id_task", deleteAsignment);

export default router;