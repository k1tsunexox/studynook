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
    <main className="mx-auto max-w-4xl space-y-8 pb-10">
      <div className="flex items-end justify-between border-b border-[#e7e2d9] pb-7">
        <div>
          <p className="text-[10px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
            Tools
          </p>
          <h1 className="mt-2 text-3xl font-light tracking-tight text-[#1a1916]">
            Focus Timer
          </h1>
          <p className="mt-1.5 text-sm font-light tracking-wide text-[#9c9890]">
            Pomodoro technique for deep study sessions.
          </p>
        </div>
        <div className="hidden flex-col items-end md:flex">
          <p className="text-[9px] font-medium tracking-[0.18em] text-[#b0aa9f] uppercase">
            Today
          </p>
          <p className="mt-1 text-2xl font-extralight text-[#1a1916] tabular-nums">
            {hours > 0 ? `${hours}h ` : ""}
            {minutes}m
          </p>
        </div>
      </div>
      <PomodoroTimer subjects={subjects} />
    </main>
  );
}
