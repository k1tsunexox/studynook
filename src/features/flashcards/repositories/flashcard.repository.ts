import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { flashcards } from "@/db/schema/flashcards";

import type { FlashcardInput } from "../schemas/flashcard-schema";

export async function insertFlashcard(data: FlashcardInput) {
  return await db.insert(flashcards).values(data).returning();
}

export async function findAllFlashcards() {
  return await db.query.flashcards.findMany({
    orderBy: [desc(flashcards.createdAt)],
    with: { note: true },
  });
}

export async function deleteFlashcardById(id: string) {
  return await db.delete(flashcards).where(eq(flashcards.id, id)).returning();
}
