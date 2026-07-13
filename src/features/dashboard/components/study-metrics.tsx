"use client";

import { Bell, Brain, FileText, Layers } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StudyMetricsProps {
  focusMinutes: number;
  notesCount: number;
  flashcardsCount: number;
  unreadNotifications: number;
}

export function StudyMetrics({
  focusMinutes,
  notesCount,
  flashcardsCount,
  unreadNotifications,
}: StudyMetricsProps) {
  const hours = Math.floor(focusMinutes / 60);
  const minutes = focusMinutes % 60;
  const focusString = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Today&apos;s Focus
          </CardTitle>
          <Brain className="text-primary h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-primary text-2xl font-bold">{focusString}</div>
          <p className="text-muted-foreground mt-1 text-xs">
            Tracked via Pomodoro
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Study Notes</CardTitle>
          <FileText className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{notesCount}</div>
          <p className="text-muted-foreground mt-1 text-xs">
            Total active notes
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Flashcards</CardTitle>
          <Layers className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{flashcardsCount}</div>
          <p className="text-muted-foreground mt-1 text-xs">
            Cards in your deck
          </p>
        </CardContent>
      </Card>

      <Card
        className={
          unreadNotifications > 0
            ? "border-destructive/50 bg-destructive/5"
            : ""
        }
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Notifications</CardTitle>
          <Bell
            className={`h-4 w-4 ${unreadNotifications > 0 ? "text-destructive" : "text-muted-foreground"}`}
          />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${unreadNotifications > 0 ? "text-destructive" : ""}`}
          >
            {unreadNotifications}
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            Unread alerts & reminders
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
