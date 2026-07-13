import { getCurrentAcademicProfile } from "@/features/academic/services/academic.service";

import {
  createClassSchedule,
  getSchedulesByAcademicProfile,
} from "../repositories/class-schedule.repository";
import type { ClassScheduleInput } from "../schemas/class-schedule-schema";

export async function getCurrentSchedule() {
  const academicProfile = await getCurrentAcademicProfile();

  if (!academicProfile) {
    throw new Error("Academic profile not found.");
  }

  return getSchedulesByAcademicProfile(academicProfile.id);
}

export async function createSubjectSchedule(input: ClassScheduleInput) {
  return createClassSchedule(input);
}
