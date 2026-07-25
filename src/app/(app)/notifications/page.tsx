import { NotificationList } from "@/features/notifications/components/notification-list";
import { getNotifications } from "@/features/notifications/services/notification.service";

export default async function NotificationsPage() {
  const notifications = await getNotifications();
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  return (
    <main className="mx-auto max-w-4xl space-y-8 pb-10">
      <div className="flex items-end justify-between border-b border-[#e7e2d9] pb-7">
        <div>
          <p className="text-[10px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
            Tools
          </p>
          <h1 className="mt-2 text-3xl font-light tracking-tight text-[#1a1916]">
            Notifications
          </h1>
          <p className="mt-1.5 text-sm font-light tracking-wide text-[#9c9890]">
            Study reminders and schedule updates.
          </p>
        </div>
        {unreadCount > 0 && (
          <span className="rounded-xl bg-[#1a1916] px-4 py-2 text-[11px] font-medium tracking-[0.12em] text-white">
            {unreadCount} new
          </span>
        )}
      </div>
      <NotificationList notifications={notifications} />
    </main>
  );
}
