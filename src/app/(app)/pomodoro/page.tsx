import { Timer } from "lucide-react";

import { PomodoroTimer } from "@/features/pomodoro/components/pomodoro-timer";
import { fetchTodayStats } from "@/features/pomodoro/services/pomodoro.service";
import { getCurrentSubjects } from "@/features/subjects/services/subject.service";

export default async function PomodoroPage() {
  const [subjects, todayFocusMinutes] = await Promise.all([
    getCurrentSubjects(),
    fetchTodayStats(),
  ]);

  const hours = Math.floor(todayFocusMinutes / 60);
  const minutes = todayFocusMinutes % 60;

  return (
    <main className="space-y-8 p-6">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold">
            <Timer className="text-primary h-8 w-8" />
            Focus Timer
          </h1>
          <p className="text-muted-foreground mt-1">
            Use the Pomodoro technique to maximize your study efficiency.
          </p>
        </div>

        <div className="bg-card hidden flex-col items-end rounded-lg border p-3 shadow-sm md:flex">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Today&apos;s Study Time
          </span>
          <span className="text-primary text-xl font-bold">
            {hours > 0 ? `${hours}h ` : ""}
            {minutes}m
          </span>
        </div>
      </div>

      <div className="pt-8">
        <PomodoroTimer subjects={subjects} />
      </div>

      <div className="bg-muted/50 mx-auto mt-8 flex max-w-md flex-col items-center justify-center rounded-lg border border-dashed p-4 md:hidden">
        <span className="text-muted-foreground mb-1 text-sm">
          Today&apos;s Total Focus Time
        </span>
        <span className="text-primary text-2xl font-bold">
          {hours > 0 ? `${hours}h ` : ""}
          {minutes}m
        </span>
      </div>
    </main>
  );
}
