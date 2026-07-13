"use server";

import { revalidatePath } from "next/cache";

import { documentSchema, type DocumentInput } from "../schemas/document-schema";
import { createDocument, removeDocument } from "../services/document.service";

export async function saveDocumentAction(values: DocumentInput) {
  const parsed = documentSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid document data." };
  }

  try {
    await createDocument(parsed.data);
    revalidatePath("/documents");
    return { success: true, message: "Document saved successfully." };
  } catch {
    return { success: false, message: "Failed to save document." };
  }
}

export async function deleteDocumentAction(id: string) {
  try {
    await removeDocument(id);
    revalidatePath("/documents");
    return { success: true, message: "Document deleted successfully." };
  } catch {
    return { success: false, message: "Failed to delete document." };
  }
}
