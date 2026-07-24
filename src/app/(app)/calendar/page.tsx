import { CalendarView } from "@/features/calendar/components/calendar-view";
import { getCalendarEvents } from "@/features/calendar/services/calendar.service";

export default async function CalendarPage() {
  const events = await getCalendarEvents();

  return (
    <main className="space-y-8 pb-12">
      <div className="border-b border-[#E7E2D9] pb-6">
        <p className="text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
          Workspace
        </p>
        <h1 className="mt-1.5 text-[1.75rem] font-semibold tracking-tight text-slate-900">
          Calendar
        </h1>
      </div>
      <CalendarView events={events} />
    </main>
  );
}
