import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { getProfileById } from "../repositories/profile.repository";

export async function getCurrentUserProfile() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return getProfileById(user.id);
}
