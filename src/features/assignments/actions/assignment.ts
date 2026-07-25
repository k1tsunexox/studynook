"use server";

import { revalidatePath } from "next/cache";

import {
  assignmentSchema,
  type AssignmentInput,
} from "../schemas/assignment-schema";
import {
  completeAssignment,
  createCurrentAssignment,
  deleteCurrentAssignment,
} from "../services/assignment.service";

export async function createAssignmentAction(values: AssignmentInput) {
  const parsed = assignmentSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }
  await createCurrentAssignment(parsed.data);
  revalidatePath("/assignments");
  revalidatePath("/dashboard");
  return { success: true, message: "Assignment created." };
}

export async function toggleAssignmentAction(id: string, completed: boolean) {
  await completeAssignment(id, completed);
  revalidatePath("/assignments");
  revalidatePath("/dashboard");
}

export async function deleteAssignmentAction(id: string) {
  await deleteCurrentAssignment(id);
  revalidatePath("/assignments");
  revalidatePath("/dashboard");
  revalidatePath("/calendar");
  return { success: true };
}
