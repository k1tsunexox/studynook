import {
  deleteNotificationById,
  findUserNotifications,
  insertNotification,
  updateAllNotificationsAsRead,
  updateNotificationReadStatus,
} from "../repositories/notification.repository";

export async function getNotifications() {
  return await findUserNotifications();
}

export async function markAsRead(id: string) {
  return await updateNotificationReadStatus(id, true);
}

export async function markAllAsRead() {
  return await updateAllNotificationsAsRead();
}

export async function removeNotification(id: string) {
  return await deleteNotificationById(id);
}

// Development helper to simulate an incoming reminder
export async function createSimulatedReminder() {
  const types = ["reminder", "alert", "system"] as const;
  const randomType = types[Math.floor(Math.random() * types.length)];

  return await insertNotification({
    title: "Upcoming Study Session",
    message:
      "Don't forget to review your latest flashcards for your upcoming exam.",
    type: randomType,
    link: "/flashcards",
  });
}
