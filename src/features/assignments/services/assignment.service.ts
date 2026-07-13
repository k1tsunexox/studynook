import { getCurrentAcademicProfile } from "@/features/academic/services/academic.service";
import { getSubjectsByAcademicProfile } from "@/features/subjects/repositories/subject.repository";

import {
  createAssignment,
  getAssignmentsBySubject,
  toggleAssignment,
} from "../repositories/assignment.repository";
import type { AssignmentInput } from "../schemas/assignment-schema";

export async function getCurrentSubjects() {
  const academicProfile = await getCurrentAcademicProfile();

  if (!academicProfile) {
    throw new Error("Academic profile not found.");
  }

  return getSubjectsByAcademicProfile(academicProfile.id);
}

export async function getCurrentAssignments() {
  const subjects = await getCurrentSubjects();

  const assignments = await Promise.all(
    subjects.map((subject) => getAssignmentsBySubject(subject.id)),
  );

  return assignments.flat();
}

export async function createCurrentAssignment(input: AssignmentInput) {
  return createAssignment(input);
}

export async function completeAssignment(id: string, completed: boolean) {
  return toggleAssignment(id, completed);
}
