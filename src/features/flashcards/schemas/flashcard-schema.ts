import { z } from "zod";

export const flashcardSchema = z.object({
  noteId: z.string().uuid(),
  question: z.string().min(1),
  answer: z.string().min(1),
});
export type FlashcardInput = z.infer<typeof flashcardSchema>;
