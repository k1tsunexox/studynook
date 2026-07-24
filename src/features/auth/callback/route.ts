import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

function getSafeRedirectPath(next: string | null) {
  return next?.startsWith("/") && !next.startsWith("//")
    ? next
    : "/dashboard";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = getSafeRedirectPath(searchParams.get("next"));

  if (!code) {
    redirect("/login?error=missing_auth_code");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    redirect("/login?error=auth_callback_failed");
  }

  redirect(next);
}
