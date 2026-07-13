import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { documents } from "@/db/schema/documents";

import type { DocumentInput } from "../schemas/document-schema";

export async function insertDocument(data: DocumentInput) {
  const [doc] = await db.insert(documents).values(data).returning();
  return doc;
}

export async function findAllDocuments() {
  return await db.query.documents.findMany({
    orderBy: [desc(documents.createdAt)],
    with: {
      subject: true,
    },
  });
}

export async function deleteDocumentById(id: string) {
  const [deleted] = await db
    .delete(documents)
    .where(eq(documents.id, id))
    .returning();
  return deleted;
}
