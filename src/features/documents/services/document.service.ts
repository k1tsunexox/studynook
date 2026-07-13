import {
  deleteDocumentById,
  findAllDocuments,
  insertDocument,
} from "../repositories/document.repository";
import type { DocumentInput } from "../schemas/document-schema";

export async function createDocument(data: DocumentInput) {
  return await insertDocument(data);
}

export async function getCurrentUserDocuments() {
  return await findAllDocuments();
}

export async function removeDocument(id: string) {
  return await deleteDocumentById(id);
}
