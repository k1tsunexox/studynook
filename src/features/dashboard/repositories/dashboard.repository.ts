import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { academicProfiles, profiles, subjects } from "@/db/schema";

export async function getDashboard(userId: string) {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, userId),
  });

  const academicProfile = await db.query.academicProfiles.findFirst({
    where: eq(academicProfiles.userId, userId),
  });

  if (!academicProfile) {
    return null;
  }

  const subjectList = await db.query.subjects.findMany({
    where: eq(subjects.academicProfileId, academicProfile.id),
  });

  const subjectIds = subjectList.map((s) => s.id);

  const schedule = await db.query.classSchedules.findMany();

  const assignmentList = await db.query.assignments.findMany();

  const examList = await db.query.exams.findMany();

  return {
    profile,
    academicProfile,
    subjects: subjectList,
    schedule: schedule.filter((s) => subjectIds.includes(s.subjectId)),
    assignments: assignmentList.filter((a) => subjectIds.includes(a.subjectId)),
    exams: examList.filter((e) => subjectIds.includes(e.subjectId)),
  };
}
