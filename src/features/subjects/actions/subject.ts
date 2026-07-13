"use server";

import { revalidatePath } from "next/cache";

import { subjectSchema, type SubjectInput } from "../schemas/subject-schema";
import {
  createCurrentSubject,
  deleteCurrentSubject,
  updateCurrentSubject,
} from "../services/subject.service";

type SubjectResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export async function createSubjectAction(
  values: SubjectInput,
): Promise<SubjectResult> {
  const parsed = subjectSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid subject.",
    };
  }

  try {
    await createCurrentSubject(parsed.data);

    revalidatePath("/dashboard");
    revalidatePath("/subjects");

    return {
      success: true,
      message: "Subject created successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to create subject.",
    };
  }
}

export async function updateSubjectAction(
  id: string,
  values: SubjectInput,
): Promise<SubjectResult> {
  const parsed = subjectSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid subject.",
    };
  }

  try {
    await updateCurrentSubject(id, parsed.data);

    revalidatePath("/dashboard");
    revalidatePath("/subjects");

    return {
      success: true,
      message: "Subject updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update subject.",
    };
  }
}

export async function deleteSubjectAction(id: string): Promise<SubjectResult> {
  try {
    await deleteCurrentSubject(id);

    revalidatePath("/dashboard");
    revalidatePath("/subjects");

    return {
      success: true,
      message: "Subject deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete subject.",
    };
  }
}
