import { z } from "zod";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const EnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  // add any callback-specific required vars here
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  // fail with actionable message instead of opaque build-time ZodError
  throw new Error(
    "Invalid auth callback environment variables: " +
      JSON.stringify(parsed.error.flatten().fieldErrors),
  );
}

const env = parsed.data;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");

  if (code) {
    const supabase = await createSupabaseServerClient();

    await supabase.auth.exchangeCodeForSession(code);
  }

  redirect("/dashboard");
}
