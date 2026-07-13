import "server-only";

import { redirect } from "next/navigation";

import { getAcademicProfile } from "@/features/academic/repositories/academic.repository";
import { getCurrentUser } from "@/features/auth/profile/repositories/auth.repository";
import { getCurrentUserProfile } from "@/features/profile/services/profile.service";

export async function getDashboardData() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getCurrentUserProfile();
  const academicProfile = await getAcademicProfile(user.id);

  if (!academicProfile) {
    redirect("/onboarding");
  }

  const displayName =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ").trim() ||
    user.email?.split("@")[0] ||
    "Student";

  return {
    user,
    profile,
    academicProfile,
    displayName,
  };
}
