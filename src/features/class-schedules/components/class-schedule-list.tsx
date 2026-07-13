import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { classSchedules } from "@/db/schema";

type ClassSchedule = typeof classSchedules.$inferSelect;

type Props = {
  schedules: ClassSchedule[];
};

export function ClassScheduleList({ schedules }: Props) {
  if (schedules.length === 0) {
    return (
      <Card>
        <CardContent className="text-muted-foreground py-8 text-center">
          No schedules yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {schedules.map((schedule) => (
        <Card key={schedule.id}>
          <CardHeader>
            <CardTitle>{schedule.day}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <p>
              {schedule.startTime} - {schedule.endTime}
            </p>

            <p>{schedule.room}</p>

            <p>{schedule.faculty ?? "TBA"}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
