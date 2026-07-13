import { z } from "zod";

export const noteSchema = z.object({
  subjectId: z.string().uuid({ message: "Please select a valid subject." }),
  title: z.string().min(1, { message: "Title is required." }),
  content: z.string().min(1, { message: "Content is required." }),
});

export type NoteInput = z.infer<typeof noteSchema>;
