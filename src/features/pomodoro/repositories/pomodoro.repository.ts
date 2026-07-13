import { gte } from "drizzle-orm";

import { db } from "@/db";
import { studySessions } from "@/db/schema/study_sessions";

import type { StudySessionInput } from "../schemas/pomodoro-schema";

export async function insertStudySession(data: StudySessionInput) {
  const [session] = await db
    .insert(studySessions)
    .values({
      subjectId: data.subjectId || null,
      duration: data.duration,
      sessionType: data.sessionType,
    })
    .returning();

  return session;
}

export async function getTodayFocusMinutes() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sessions = await db.query.studySessions.findMany({
    where: gte(studySessions.createdAt, today),
  });

  // Calculate only the "pomodoro" (work) time, ignoring breaks
  return sessions
    .filter((s) => s.sessionType === "pomodoro")
    .reduce((total, session) => total + session.duration, 0);
}
