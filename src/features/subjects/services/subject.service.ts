import "server-only";

import { getCurrentAcademicProfile } from "@/features/academic/services/academic.service";

import {
  createSubject,
  deleteSubject,
  getSubjectById,
  getSubjectsByAcademicProfile,
  updateSubject,
} from "../repositories/subject.repository";
import type { SubjectInput } from "../schemas/subject-schema";

export async function getCurrentSubjects() {
  const academicProfile = await getCurrentAcademicProfile();

  if (!academicProfile) {
    throw new Error("Academic profile not found.");
  }

  return getSubjectsByAcademicProfile(academicProfile.id);
}

export async function getCurrentSubject(id: string) {
  const subject = await getSubjectById(id);

  if (!subject) {
    throw new Error("Subject not found.");
  }

  return subject;
}

export async function createCurrentSubject(input: SubjectInput) {
  const academicProfile = await getCurrentAcademicProfile();

  if (!academicProfile) {
    throw new Error("Academic profile not found.");
  }

  return createSubject({
    academicProfileId: academicProfile.id,
    code: input.code,
    title: input.title,
    units: input.units,
    section: input.section,
  });
}

export async function updateCurrentSubject(id: string, input: SubjectInput) {
  return updateSubject(id, {
    code: input.code,
    title: input.title,
    units: input.units,
    section: input.section,
  });
}

export async function deleteCurrentSubject(id: string) {
  return deleteSubject(id);
}
