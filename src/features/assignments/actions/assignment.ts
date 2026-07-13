"use server";

import { revalidatePath } from "next/cache";

import {
  assignmentSchema,
  type AssignmentInput,
} from "../schemas/assignment-schema";
import {
  completeAssignment,
  createCurrentAssignment,
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

  return {
    success: true,
    message: "Assignment created.",
  };
}

export async function toggleAssignmentAction(id: string, completed: boolean) {
  await completeAssignment(id, completed);

  revalidatePath("/assignments");
}
