import { z } from "zod";

export const studySessionSchema = z.object({
  subjectId: z.string().uuid().optional().nullable(),
  duration: z.number(),
  sessionType: z.enum(["pomodoro", "short_break", "long_break"]),
});
export type StudySessionInput = z.infer<typeof studySessionSchema>;
