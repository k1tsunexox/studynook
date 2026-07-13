"use server";

import { redirect } from "next/navigation";

import {
  loginSchema,
  signupSchema,
  type LoginInput,
  type SignupInput,
} from "@/features/auth/schemas/auth-schema";
import { env } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AuthResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export async function signIn(values: LoginInput): Promise<AuthResult> {
  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid form.",
    };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  redirect("/dashboard");
}

export async function signUp(values: SignupInput): Promise<AuthResult> {
  const parsed = signupSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid form.",
    };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        first_name: parsed.data.firstName,
        last_name: parsed.data.lastName,
      },
      emailRedirectTo: `${env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Your account has been created. Check your email to verify it.",
  };

  console.log("User signed up successfully.");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  redirect("/login");
}
