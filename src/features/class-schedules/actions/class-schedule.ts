"use server";

import { revalidatePath } from "next/cache";

import {
  classScheduleSchema,
  type ClassScheduleInput,
} from "../schemas/class-schedule-schema";
import { createSubjectSchedule } from "../services/class-schedule.service";

export async function createClassScheduleAction(values: ClassScheduleInput) {
  const parsed = classScheduleSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid form.",
    };
  }

  await createSubjectSchedule(parsed.data);

  revalidatePath("/schedule");

  return {
    success: true,
    message: "Schedule created.",
  };
}
