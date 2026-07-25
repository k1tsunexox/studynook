"use server";

import { revalidatePath } from "next/cache";

import { examSchema, type ExamInput } from "../schemas/exam-schema";
import { createCurrentExam, deleteCurrentExam } from "../services/exam.service";

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
  revalidatePath("/dashboard");
  revalidatePath("/calendar");
  return { success: true, message: "Exam created." };
}

export async function deleteExamAction(id: string) {
  await deleteCurrentExam(id);
  revalidatePath("/exams");
  revalidatePath("/dashboard");
  revalidatePath("/calendar");
  return { success: true };
}
