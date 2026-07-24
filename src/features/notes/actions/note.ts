"use server";

import { revalidatePath } from "next/cache";

import { noteSchema, type NoteInput } from "../schemas/note-schema";
import { createNote, removeNote } from "../services/note.service";

export async function saveNote(values: NoteInput) {
  const parsed = noteSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid form data.",
    };
  }

  try {
    await createNote(parsed.data);
    revalidatePath("/notes");

    return {
      success: true,
      message: "Note saved successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Failed to save note. Please try again.",
    };
  }
}

export async function deleteNoteAction(id: string) {
  try {
    await removeNote(id);
    revalidatePath("/notes");

    return {
      success: true,
      message: "Note deleted successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Failed to delete note.",
    };
  }
}
