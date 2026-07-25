import { getCurrentSchedule } from "@/features/class-schedules/services/class-schedule.service";

export default async function SchedulePage() {
  const schedules = await getCurrentSchedule();
  return (
    <main className="mx-auto max-w-4xl space-y-8 pb-10">
      <div className="border-b border-[#e7e2d9] pb-7">
        <p className="text-[10px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
          Workspace
        </p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#1a1916]">
          Schedule
        </h1>
        <p className="mt-1.5 text-sm font-light tracking-wide text-[#9c9890]">
          Your weekly class timetable.
        </p>
      </div>
      <div className="space-y-2.5">
        {schedules.map(({ schedule, subject }) => (
          <div
            key={schedule.id}
            className="flex items-start gap-4 rounded-2xl border border-[#e7e2d9] bg-white p-5"
          >
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#F3EEE7] text-xs font-medium text-[#6b6862]">
              {schedule.startTime.slice(0, 5)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-semibold tracking-[0.18em] text-sky-600 uppercase">
                {subject.code}
              </p>
              <p className="mt-0.5 font-light text-[#1a1916]">
                {subject.title}
              </p>
              <p className="mt-1 text-[10px] tracking-wide text-[#b0aa9f]">
                {schedule.day} · {schedule.startTime}–{schedule.endTime} · Room{" "}
                {schedule.room}
              </p>
            </div>
            <span className="shrink-0 rounded-md bg-[#F3EEE7] px-2.5 py-1 text-[9px] font-medium tracking-[0.12em] text-[#6b6862] uppercase">
              {subject.section}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
