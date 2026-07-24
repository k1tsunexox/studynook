import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentSchedule } from "@/features/class-schedules/services/class-schedule.service";

export default async function SchedulePage() {
  const schedules = await getCurrentSchedule();

  return (
    <main className="mx-auto max-w-4xl space-y-8 pb-12">
      <div className="border-b border-[#E7E2D9] pb-6">
        <p className="text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
          Workspace
        </p>
        <h1 className="mt-1.5 text-[1.75rem] font-semibold tracking-tight text-slate-900">
          Weekly Schedule
        </h1>
      </div>
      <div className="space-y-3">
        {schedules.map(({ schedule, subject }) => (
          <div
            key={schedule.id}
            className="flex items-start gap-4 rounded-2xl border border-[#E7E2D9] bg-white p-5"
          >
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-sky-50 text-xs font-bold text-sky-700">
              {schedule.startTime.slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold tracking-[0.12em] text-sky-600 uppercase">
                {subject.code}
              </p>
              <p className="mt-0.5 font-medium text-slate-900">
                {subject.title}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {schedule.day} · {schedule.startTime}–{schedule.endTime} · Room{" "}
                {schedule.room}
              </p>
            </div>
            <span className="shrink-0 rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
              {subject.section}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
