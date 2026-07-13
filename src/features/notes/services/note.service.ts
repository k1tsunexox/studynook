import {
  deleteNoteById,
  findAllNotes,
  findNotesBySubjectId,
  insertNote,
} from "../repositories/note.repository";
import type { NoteInput } from "../schemas/note-schema";

export async function createNote(data: NoteInput) {
  // Add any specific business logic or ownership verification here if needed
  return await insertNote(data);
}

export async function getCurrentUserNotes() {
  // Assuming the user's subjects are pre-filtered or you want a global list for the dashboard
  return await findAllNotes();
}

export async function getSubjectNotes(subjectId: string) {
  return await findNotesBySubjectId(subjectId);
}

export async function removeNote(id: string) {
  return await deleteNoteById(id);
}
