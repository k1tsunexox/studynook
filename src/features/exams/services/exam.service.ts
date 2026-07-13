import { getCurrentAcademicProfile } from "@/features/academic/services/academic.service";
import { getSubjectsByAcademicProfile } from "@/features/subjects/repositories/subject.repository";

import { createExam, getExamsBySubject } from "../repositories/exam.repository";
import type { ExamInput } from "../schemas/exam-schema";

export async function getCurrentExams() {
  const academicProfile = await getCurrentAcademicProfile();

  if (!academicProfile) {
    throw new Error("Academic profile not found.");
  }

  const subjects = await getSubjectsByAcademicProfile(academicProfile.id);

  const exams = await Promise.all(
    subjects.map((subject) => getExamsBySubject(subject.id)),
  );

  return exams.flat();
}

export async function createCurrentExam(input: ExamInput) {
  return createExam(input);
}

export async function getCurrentSubjects() {
  const academicProfile = await getCurrentAcademicProfile();

  if (!academicProfile) {
    throw new Error("Academic profile not found.");
  }

  return getSubjectsByAcademicProfile(academicProfile.id);
}
