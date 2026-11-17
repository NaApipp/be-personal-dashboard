import { Router } from "express";
import { addSchedule, deleteSchedule, getAllSchedule } from "../controllers/scheduleControllers";
import { validate } from "../middleware/validate";
import { addScheduleSchema } from "../schema/schedule.schema";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Semua route schedule dilindungi authMiddleware (Bearer Token)
router.use(authMiddleware);

router.post("/", validate(addScheduleSchema), addSchedule);
router.get("/", getAllSchedule);
router.delete("/:id_schedule", deleteSchedule);

export default router;
