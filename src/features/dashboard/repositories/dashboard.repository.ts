import "server-only";

import { eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import {
  academicProfiles,
  assignments,
  classSchedules,
  exams,
  profiles,
  subjects,
} from "@/db/schema";

export async function getDashboard(userId: string) {
  const [profile, academicProfile] = await Promise.all([
    db.query.profiles.findFirst({
      where: eq(profiles.id, userId),
    }),
    db.query.academicProfiles.findFirst({
      where: eq(academicProfiles.userId, userId),
    }),
  ]);

  if (!academicProfile) {
    return null;
  }

  const subjectList = await db.query.subjects.findMany({
    where: eq(subjects.academicProfileId, academicProfile.id),
  });

  const subjectIds = subjectList.map((s) => s.id);

  const [schedule, assignmentList, examList] = subjectIds.length
    ? await Promise.all([
        db.query.classSchedules.findMany({
          where: inArray(classSchedules.subjectId, subjectIds),
        }),
        db.query.assignments.findMany({
          where: inArray(assignments.subjectId, subjectIds),
        }),
        db.query.exams.findMany({
          where: inArray(exams.subjectId, subjectIds),
        }),
      ])
    : [[], [], []];

  return {
    profile,
    academicProfile,
    subjects: subjectList,
    schedule: schedule.filter((s) => subjectIds.includes(s.subjectId)),
    assignments: assignmentList,
    exams: examList,
  };
}
