"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  academicProfileSchema,
  type AcademicProfileInput,
} from "../schemas/academic-schema";
import { createCurrentAcademicProfile } from "../services/academic.service";

export async function saveAcademicProfile(values: AcademicProfileInput) {
  const parsed = academicProfileSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid form.",
    };
  }

  await createCurrentAcademicProfile(parsed.data);

  revalidatePath("/dashboard");

  redirect("/dashboard");
}
