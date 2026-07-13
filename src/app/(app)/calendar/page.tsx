import { CalendarView } from "@/features/calendar/components/calendar-view";
import { getCalendarEvents } from "@/features/calendar/services/calendar.service";

export default async function CalendarPage() {
  const events = await getCalendarEvents();

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Calendar</h1>

      <CalendarView events={events} />
    </main>
  );
}
