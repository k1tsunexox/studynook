import { Bell } from "lucide-react";

import { NotificationList } from "@/features/notifications/components/notification-list";
import { getNotifications } from "@/features/notifications/services/notification.service";

export default async function NotificationsPage() {
  const notifications = await getNotifications();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <main className="mx-auto max-w-4xl space-y-8 p-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 rounded-full p-2">
          <Bell className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold">
            Notifications
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-medium">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-muted-foreground">
            Stay on top of your study schedule and reminders.
          </p>
        </div>
      </div>

      <div className="pt-4">
        <NotificationList notifications={notifications} />
      </div>
    </main>
  );
}
