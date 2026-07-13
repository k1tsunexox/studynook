"use client";

import { useForm, useWatch } from "react-hook-form";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { saveSettingsAction } from "../actions/settings";

interface SettingsInput {
  theme: string;
  emailNotifications: boolean;
}

interface SettingsFormProps {
  initialData: SettingsInput | null;
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<SettingsInput>({
    defaultValues: {
      theme: initialData?.theme ?? "light",
      emailNotifications: initialData?.emailNotifications ?? true,
    },
  });

  const emailNotifications = useWatch({
    control: form.control,
    name: "emailNotifications",
  });

  function onSubmit(data: SettingsInput) {
    startTransition(async () => {
      await saveSettingsAction(data);
      router.refresh();
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications">Email Notifications</Label>

        <Switch
          id="notifications"
          checked={emailNotifications}
          onCheckedChange={(checked) =>
            form.setValue("emailNotifications", checked)
          }
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Preferences"}
      </Button>
    </form>
  );
}
