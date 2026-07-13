import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { academicProfiles } from "@/db/schema";

export async function getAcademicProfile(userId: string) {
  return (
    (await db.query.academicProfiles.findFirst({
      where: eq(academicProfiles.userId, userId),
    })) ?? null
  );
}

export async function createAcademicProfile(data: {
  userId: string;
  university: string;
  campus: string;
  college: string;
  degreeProgram: string;
  yearLevel: number;
  semester: string;
  academicYear: string;
}) {
  const [profile] = await db.insert(academicProfiles).values(data).returning();

  return profile;
}
