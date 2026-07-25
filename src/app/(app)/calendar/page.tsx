import { CalendarView } from "@/features/calendar/components/calendar-view";
import { getCalendarEvents } from "@/features/calendar/services/calendar.service";

export default async function CalendarPage() {
  const events = await getCalendarEvents();
  return (
    <main className="space-y-8 pb-10">
      <div className="border-b border-[#e7e2d9] pb-7">
        <p className="text-[10px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
          Workspace
        </p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#1a1916]">
          Calendar
        </h1>
      </div>
      <CalendarView events={events} />
    </main>
  );
}
