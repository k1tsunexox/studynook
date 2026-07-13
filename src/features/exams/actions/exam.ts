"use server";

import { revalidatePath } from "next/cache";

import { examSchema, type ExamInput } from "../schemas/exam-schema";
import { createCurrentExam } from "../services/exam.service";

export async function createExamAction(values: ExamInput) {
  const parsed = examSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  await createCurrentExam(parsed.data);

  revalidatePath("/exams");

  return {
    success: true,
    message: "Exam created.",
  };
}
