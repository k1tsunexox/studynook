import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { assignments } from "@/db/schema";

export async function getAssignmentsBySubject(subjectId: string) {
  return db.query.assignments.findMany({
    where: eq(assignments.subjectId, subjectId),
    orderBy: asc(assignments.dueAt),
  });
}

export async function createAssignment(data: {
  subjectId: string;
  title: string;
  description?: string;
  dueAt: string;
}) {
  const [assignment] = await db
    .insert(assignments)
    .values({
      ...data,
      dueAt: new Date(data.dueAt),
    })
    .returning();

  return assignment;
}

export async function toggleAssignment(id: string, completed: boolean) {
  const [assignment] = await db
    .update(assignments)
    .set({
      completed,
      updatedAt: new Date(),
    })
    .where(eq(assignments.id, id))
    .returning();

  return assignment;
}
