import { z } from "zod";

export const addScheduleSchema = z.object({
  body: z.object({
    title: z
      .string({ message: "Title is required" })
      .min(5, "Title must be at least 5 characters long"),
    description: z
      .string({ message: "Description is required" })
      .min(10, "Description must be at least 10 characters long"),
    date: z.string({ message: "Date is required" }),
    start_time: z.string({ message: "Start time is required" }),
    location: z
      .string({ message: "Location is required" })
      .min(5, "Location must be at least 5 characters long"),
    priority: z.enum(["high", "medium", "low"], {
      message: "Priority is required",
    }),
    isRecurring: z.boolean({ message: "Is Recurring is required" }),
    recurrence: z.enum(["daily", "weekly", "monthly", "none"], {
      message: "Recurrence is required",
    }),
  }),
});
