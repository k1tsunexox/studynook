import { getCurrentAssignments } from "@/features/assignments/services/assignment.service";
import { getCurrentSchedule } from "@/features/class-schedules/services/class-schedule.service";
import { getCurrentExams } from "@/features/exams/services/exam.service";

import type { CalendarEvent } from "../types";

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const [assignments, exams, schedules] = await Promise.all([
    getCurrentAssignments(),
    getCurrentExams(),
    getCurrentSchedule(),
  ]);

  const events: CalendarEvent[] = [];

  for (const assignment of assignments) {
    events.push({
      id: assignment.id,
      title: `📝 ${assignment.title}`,
      start: assignment.dueAt,
      end: assignment.dueAt,
      resource: "assignment",
    });
  }

  for (const exam of exams) {
    events.push({
      id: exam.id,
      title: `📚 ${exam.title}`,
      start: exam.startsAt,
      end: exam.endsAt,
      resource: "exam",
    });
  }

  // Weekly classes will be converted to recurring events later.

  return events;
}
