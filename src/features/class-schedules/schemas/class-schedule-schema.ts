import { z } from "zod";

export const classScheduleSchema = z.object({
  subjectId: z.string().uuid(),

  day: z.string().min(1),

  startTime: z.string().min(1),

  endTime: z.string().min(1),

  room: z.string().min(1),

  faculty: z.string().optional(),
});

export type ClassScheduleInput = z.infer<typeof classScheduleSchema>;
