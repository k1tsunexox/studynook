import {
  getTodayFocusMinutes,
  insertStudySession,
} from "../repositories/pomodoro.repository";
import type { StudySessionInput } from "../schemas/pomodoro-schema";

export async function logStudySession(data: StudySessionInput) {
  return await insertStudySession(data);
}

export async function fetchTodayStats() {
  return await getTodayFocusMinutes();
}
