import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { notes } from "@/db/schema/notes";

import type { NoteInput } from "../schemas/note-schema";

export async function insertNote(data: NoteInput) {
  const [note] = await db
    .insert(notes)
    .values({
      subjectId: data.subjectId,
      title: data.title,
      content: data.content,
    })
    .returning();

  return note;
}

export async function findNotesBySubjectId(subjectId: string) {
  return await db.query.notes.findMany({
    where: eq(notes.subjectId, subjectId),
    orderBy: [desc(notes.createdAt)],
  });
}

export async function findAllNotes() {
  return await db.query.notes.findMany({
    orderBy: [desc(notes.createdAt)],
    with: {
      subject: true,
    },
  });
}

export async function deleteNoteById(id: string) {
  const [deletedNote] = await db
    .delete(notes)
    .where(eq(notes.id, id))
    .returning();

  return deletedNote;
}
