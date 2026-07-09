import { createBrowserClient } from "@supabase/ssr";

import { getEnv } from "@/lib/env";

const env = getEnv();

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}