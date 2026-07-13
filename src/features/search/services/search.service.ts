import { ilike, or } from "drizzle-orm";

import { db } from "@/db";
import { documents } from "@/db/schema/documents";
import { flashcards } from "@/db/schema/flashcards";
import { notes } from "@/db/schema/notes";

export async function performGlobalSearch(query: string) {
  if (!query || query.trim() === "") {
    return { notes: [], flashcards: [], documents: [] };
  }

  const searchTerm = `%${query}%`;

  const [foundNotes, foundFlashcards, foundDocuments] = await Promise.all([
    db.query.notes.findMany({
      where: or(
        ilike(notes.title, searchTerm),
        ilike(notes.content, searchTerm),
      ),
      limit: 10,
      with: { subject: true },
    }),
    db.query.flashcards.findMany({
      where: or(
        ilike(flashcards.question, searchTerm),
        ilike(flashcards.answer, searchTerm),
      ),
      limit: 10,
      with: { note: true },
    }),
    db.query.documents.findMany({
      where: ilike(documents.title, searchTerm),
      limit: 10,
      with: { subject: true },
    }),
  ]);

  return {
    notes: foundNotes,
    flashcards: foundFlashcards,
    documents: foundDocuments,
  };
}
