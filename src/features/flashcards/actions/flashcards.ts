"use server";

import { revalidatePath } from "next/cache";

import {
  flashcardSchema,
  type FlashcardInput,
} from "../schemas/flashcard-schema";
import {
  createFlashcard,
  removeFlashcard,
} from "../services/flashcard.service";

export async function saveFlashcard(values: FlashcardInput) {
  const parsed = flashcardSchema.safeParse(values);
  if (!parsed.success) return { success: false };
  await createFlashcard(parsed.data);
  revalidatePath("/flashcards");
  return { success: true };
}

export async function deleteFlashcardAction(id: string) {
  await removeFlashcard(id);
  revalidatePath("/flashcards");
}
