import { Router } from "express";
import { addSchedule, deleteSchedule, getAllSchedule } from "../controllers/scheduleControllers";
import { validate } from "../middleware/validate";
import { addScheduleSchema } from "../schema/schedule.schema";

const router = Router();

router.post("/", validate(addScheduleSchema), addSchedule);
router.get("/", getAllSchedule);
router.delete("/:id_schedule", deleteSchedule);

export default router;
