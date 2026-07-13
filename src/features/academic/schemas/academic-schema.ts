import { z } from "zod";

export const academicProfileSchema = z.object({
  university: z.string().trim().min(1, "University is required."),
  campus: z.string().trim().min(1, "Campus is required."),
  college: z.string().trim().min(1, "College is required."),
  degreeProgram: z.string().trim().min(1, "Degree program is required."),
  yearLevel: z.coerce
    .number()
    .int()
    .min(1, "Year level must be at least 1.")
    .max(6, "Year level must not exceed 6."),
  semester: z.string().trim().min(1, "Semester is required."),
  academicYear: z.string().trim().min(1, "Academic year is required."),
});

export type AcademicProfileInput = z.infer<typeof academicProfileSchema>;
