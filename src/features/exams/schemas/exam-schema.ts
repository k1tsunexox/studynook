import { z } from "zod";

export const examSchema = z.object({
  subjectId: z.string().uuid(),

  title: z.string().trim().min(1),

  location: z.string().trim().optional(),

  startsAt: z.string().min(1),

  endsAt: z.string().min(1),
});

export type ExamInput = z.infer<typeof examSchema>;
