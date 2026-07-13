import { z } from "zod";

export const assignmentSchema = z.object({
  subjectId: z.string().uuid(),

  title: z.string().trim().min(1, "Title is required."),

  description: z.string().trim().optional(),

  dueAt: z.string().min(1, "Due date is required."),
});

export type AssignmentInput = z.infer<typeof assignmentSchema>;
