import "server-only";

import { getCurrentUserProfile } from "@/features/profile/services/profile.service";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getDashboardData() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const profile = await getCurrentUserProfile();

  const displayName =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ").trim() ||
    user.email?.split("@")[0] ||
    "Student";

  return {
    user,
    profile,
    displayName,
  };
}
