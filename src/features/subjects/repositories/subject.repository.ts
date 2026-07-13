import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { subjects } from "@/db/schema";

export async function getSubjectsByAcademicProfile(academicProfileId: string) {
  return await db
    .select()
    .from(subjects)
    .where(eq(subjects.academicProfileId, academicProfileId))
    .orderBy(asc(subjects.code));
}

export async function getSubjectById(id: string) {
  const [subject] = await db
    .select()
    .from(subjects)
    .where(eq(subjects.id, id))
    .limit(1);

  return subject ?? null;
}

export async function createSubject(data: {
  academicProfileId: string;
  code: string;
  title: string;
  units: number;
  section: string;
}) {
  const [subject] = await db
    .insert(subjects)
    .values({
      academicProfileId: data.academicProfileId,
      code: data.code,
      title: data.title,
      units: data.units,
      section: data.section,
    })
    .returning();

  return subject;
}

export async function updateSubject(
  id: string,
  data: {
    code: string;
    title: string;
    units: number;
    section: string;
  },
) {
  const [subject] = await db
    .update(subjects)
    .set({
      code: data.code,
      title: data.title,
      units: data.units,
      section: data.section,
      updatedAt: new Date(),
    })
    .where(eq(subjects.id, id))
    .returning();

  return subject ?? null;
}

export async function deleteSubject(id: string) {
  await db.delete(subjects).where(eq(subjects.id, id));
}
