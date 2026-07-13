import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentSchedule } from "@/features/class-schedules/services/class-schedule.service";

export default async function SchedulePage() {
  const schedules = await getCurrentSchedule();

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Weekly Schedule</h1>
      </div>

      {schedules.map(({ schedule, subject }) => (
        <Card key={schedule.id}>
          <CardHeader>
            <CardTitle>
              {subject.code} • {subject.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-1">
            <p>
              <strong>Day:</strong> {schedule.day}
            </p>

            <p>
              <strong>Time:</strong> {schedule.startTime} - {schedule.endTime}
            </p>

            <p>
              <strong>Room:</strong> {schedule.room}
            </p>

            <p>
              <strong>Section:</strong> {subject.section}
            </p>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
