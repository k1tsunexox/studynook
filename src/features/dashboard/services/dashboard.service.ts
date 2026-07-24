import { getCurrentUser } from "@/features/auth/profile/repositories/auth.repository";

import { getDashboard } from "../repositories/dashboard.repository";

export async function getDashboardData() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized.");
  }

  const dashboard = await getDashboard(user.id);

  return { user, dashboard };
}
