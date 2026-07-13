import { z } from "zod";

export const subjectSchema = z.object({
  code: z.string().trim().min(1),
  title: z.string().trim().min(1),
  units: z.number().int().min(1),
  section: z.string().trim().min(1),
});

export type SubjectInput = z.infer<typeof subjectSchema>;
