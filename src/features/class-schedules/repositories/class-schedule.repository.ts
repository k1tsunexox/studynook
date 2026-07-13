import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { classSchedules, subjects } from "@/db/schema";

export async function getSchedulesByAcademicProfile(academicProfileId: string) {
  return db
    .select({
      schedule: classSchedules,
      subject: subjects,
    })
    .from(classSchedules)
    .innerJoin(subjects, eq(classSchedules.subjectId, subjects.id))
    .where(eq(subjects.academicProfileId, academicProfileId))
    .orderBy(asc(classSchedules.day), asc(classSchedules.startTime));
}

export async function createClassSchedule(data: {
  subjectId: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  faculty?: string;
}) {
  const [schedule] = await db.insert(classSchedules).values(data).returning();

  return schedule;
}
