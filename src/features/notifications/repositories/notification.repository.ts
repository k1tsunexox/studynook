import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { notifications } from "@/db/schema/notifications";

import type { NotificationInput } from "../schemas/notification-schema";

export async function insertNotification(data: NotificationInput) {
  const [notification] = await db
    .insert(notifications)
    .values(data)
    .returning();
  return notification;
}

export async function findUserNotifications() {
  return await db.query.notifications.findMany({
    orderBy: [desc(notifications.createdAt)],
  });
}

export async function updateNotificationReadStatus(
  id: string,
  isRead: boolean,
) {
  const [updated] = await db
    .update(notifications)
    .set({ isRead })
    .where(eq(notifications.id, id))
    .returning();
  return updated;
}

export async function updateAllNotificationsAsRead() {
  await db.update(notifications).set({ isRead: true });
}

export async function deleteNotificationById(id: string) {
  await db.delete(notifications).where(eq(notifications.id, id));
}
