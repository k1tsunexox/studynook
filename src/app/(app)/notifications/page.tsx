import { Bell } from "lucide-react";

import { NotificationList } from "@/features/notifications/components/notification-list";
import { getNotifications } from "@/features/notifications/services/notification.service";

export default async function NotificationsPage() {
  const notifications = await getNotifications();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <main className="mx-auto max-w-4xl space-y-8 pb-12">
      <div className="flex items-end justify-between border-b border-[#E7E2D9] pb-6">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
            Tools
          </p>
          <h1 className="mt-1.5 flex items-center gap-2.5 text-[1.75rem] font-semibold tracking-tight text-slate-900">
            <span className="flex size-9 items-center justify-center rounded-xl bg-sky-50">
              <Bell className="size-5 text-sky-600" />
            </span>
            Notifications
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Stay on top of your study schedule and reminders.
          </p>
        </div>
        {unreadCount > 0 && (
          <span className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white">
            {unreadCount} new
          </span>
        )}
      </div>
      <NotificationList notifications={notifications} />
    </main>
  );
}
