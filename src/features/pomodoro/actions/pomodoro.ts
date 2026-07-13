"use server";

import { revalidatePath } from "next/cache";

import {
  studySessionSchema,
  type StudySessionInput,
} from "../schemas/pomodoro-schema";
import { logStudySession } from "../services/pomodoro.service";

export async function saveSessionAction(values: StudySessionInput) {
  const parsed = studySessionSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid session data." };
  }

  try {
    await logStudySession(parsed.data);
    revalidatePath("/pomodoro");
    return { success: true };
  } catch {
    return { success: false, message: "Failed to log session." };
  }
}
