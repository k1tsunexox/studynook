import { getCurrentUser } from "@/features/auth/profile/repositories/auth.repository";

import {
  createAcademicProfile,
  getAcademicProfile,
} from "../repositories/academic.repository";
import type { AcademicProfileInput } from "../schemas/academic-schema";

export async function getCurrentAcademicProfile() {
  const user = await getCurrentUser();

  if (!user) return null;

  return getAcademicProfile(user.id);
}

export async function createCurrentAcademicProfile(
  input: AcademicProfileInput,
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized.");
  }

  return createAcademicProfile({
    userId: user.id,
    ...input,
  });
}
