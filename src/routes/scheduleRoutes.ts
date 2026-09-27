import { Router } from "express";
import { addSchedule, deleteSchedule, getAllSchedule } from "../controllers/scheduleControllers";

const router = Router();

router.post("/", addSchedule);
router.get("/", getAllSchedule);
router.delete("/:id_schedule", deleteSchedule);

export default router;
