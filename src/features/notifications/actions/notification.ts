"use server";

import { revalidatePath } from "next/cache";

import {
  createSimulatedReminder,
  markAllAsRead,
  markAsRead,
  removeNotification,
} from "../services/notification.service";

export async function markReadAction(id: string) {
  try {
    await markAsRead(id);
    revalidatePath("/notifications");
  } catch {}
}

export async function markAllReadAction() {
  try {
    await markAllAsRead();
    revalidatePath("/notifications");
  } catch {}
}

export async function deleteNotificationAction(id: string) {
  try {
    await removeNotification(id);
    revalidatePath("/notifications");
  } catch {}
}

export async function triggerSimulationAction() {
  try {
    await createSimulatedReminder();
    revalidatePath("/notifications");
  } catch {}
}
