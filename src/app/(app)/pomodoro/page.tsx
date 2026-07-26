import { PomodoroTimer } from "@/features/pomodoro/components/pomodoro-timer";
import { getCurrentSubjects } from "@/features/subjects/services/subject.service";

export default async function PomodoroPage() {
  const subjects = await getCurrentSubjects();

  return (
    <main className="mx-auto max-w-4xl space-y-8 pb-10">
      <div className="border-b border-[#e7e2d9] pb-7">
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
      <PomodoroTimer subjects={subjects} />
    </main>
  );
}
