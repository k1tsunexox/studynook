import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { exams } from "@/db/schema";

export async function getExamsBySubject(subjectId: string) {
  return db.query.exams.findMany({
    where: eq(exams.subjectId, subjectId),
    orderBy: asc(exams.startsAt),
  });
}

export async function createExam(data: {
  subjectId: string;
  title: string;
  location?: string;
  startsAt: string;
  endsAt: string;
}) {
  const [exam] = await db
    .insert(exams)
    .values({
      ...data,
      startsAt: new Date(data.startsAt),
      endsAt: new Date(data.endsAt),
    })
    .returning();

  return exam;
}
