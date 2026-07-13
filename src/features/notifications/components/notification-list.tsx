"use client";

import {
  AlertCircle,
  Bell,
  CalendarClock,
  Check,
  Info,
  Trash2,
} from "lucide-react";
import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  deleteNotificationAction,
  markAllReadAction,
  markReadAction,
  triggerSimulationAction,
} from "../actions/notification";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  link: string | null;
  createdAt: Date;
}

export function NotificationList({
  notifications,
}: {
  notifications: Notification[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkRead = (id: string, isRead: boolean) => {
    if (isRead || isPending) return;
    startTransition(async () => {
      await markReadAction(id);
    });
  };

  const handleAction = (action: () => Promise<void>) => {
    startTransition(async () => {
      await action();
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <CalendarClock className="h-5 w-5 text-blue-500" />;
      case "alert":
        return <AlertCircle className="text-destructive h-5 w-5" />;
      default:
        return <Info className="text-muted-foreground h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => handleAction(triggerSimulationAction)}
          disabled={isPending}
        >
          <Bell className="mr-2 h-4 w-4" /> Simulate Reminder
        </Button>

        {unreadCount > 0 && (
          <Button
            variant="secondary"
            onClick={() => handleAction(markAllReadAction)}
            disabled={isPending}
          >
            <Check className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-muted-foreground rounded-lg border border-dashed p-12 text-center">
          You have no notifications. You&apos;re all caught up!
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <Card
              key={notif.id}
              className={`hover:bg-muted/50 relative overflow-hidden transition-colors ${!notif.isRead ? "border-primary/50 bg-primary/5" : ""}`}
              onClick={() => handleMarkRead(notif.id, notif.isRead)}
            >
              {!notif.isRead && (
                <div className="bg-primary absolute top-0 left-0 h-full w-1" />
              )}
              <CardContent className="flex cursor-pointer items-start gap-4 p-4">
                <div className="mt-1">{getIcon(notif.type)}</div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-sm font-medium ${!notif.isRead ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {notif.title}
                    </p>
                    <span className="text-muted-foreground text-xs">
                      {new Date(notif.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {notif.message}
                  </p>

                  {notif.link && (
                    <Link
                      href={notif.link}
                      className="text-primary mt-2 inline-block text-xs hover:underline"
                    >
                      View details &rarr;
                    </Link>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive z-10 h-8 w-8 shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(() => deleteNotificationAction(notif.id));
                  }}
                  disabled={isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
