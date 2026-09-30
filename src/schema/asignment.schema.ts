import z from "zod";

//  Logic cek validasi by Zod
export const addAsignmentSchema = z.object({
  body: z.object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),
    status: z.enum(["pending", "in_progress", "completed"], {
      message: "Status is required",
    }),
    priority: z.enum(["high", "medium", "low"], {
      message: "Priority is required",
    }),
    deadline: z
      .string()
      .min(10, "Deadline must be at least 10 characters long"),
    location: z.string().min(5, "Location must be at least 5 characters long"),
    checklist: z.array(
      z.object({
        title_checklist: z.string().min(1, "Title checklist is required"),
        isCompleted: z.boolean().default(false),
      }),
    ),
    references: z.array(
      z.object({
        title_references: z.string().min(1, "Title references is required"),
        url: z.url("URL is required"),
      }),
    ),
  }),
});

//  Logic cek validasi update by Zod
export const updateAsignmentSchema = z.object({
  body: z.object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),
    status: z.enum(["pending", "in_progress", "completed"], {
      message: "Status is required",
    }),
    priority: z.enum(["high", "medium", "low"], {
      message: "Priority is required",
    }),
    deadline: z
      .string()
      .min(10, "Deadline must be at least 10 characters long"),
    location: z.string().min(5, "Location must be at least 5 characters long"),
    checklist: z.array(
      z.object({
        title_checklist: z.string().min(1, "Title checklist is required"),
        isCompleted: z.boolean().default(false),
      }),
    ),
    references: z.array(
      z.object({
        title_references: z.string().min(1, "Title references is required"),
        url: z.url("URL is required"),
      }),
    ),
  }),
});