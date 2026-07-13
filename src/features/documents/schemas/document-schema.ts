import { z } from "zod";

export const documentSchema = z.object({
  subjectId: z.string().uuid({ message: "Please select a valid subject." }),
  title: z.string().min(1, { message: "Document title is required." }),
  fileUrl: z.string().url({ message: "A valid file URL is required." }),
});

export type DocumentInput = z.infer<typeof documentSchema>;
