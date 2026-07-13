"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { updateUserSettings } from "../services/settings.service";

export async function saveSettingsAction(data: {
  theme: string;
  emailNotifications: boolean;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  try {
    await updateUserSettings(user.id, data);

    revalidatePath("/settings");

    return {
      success: true,
      message: "Settings saved successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Failed to save settings.",
    };
  }
}
