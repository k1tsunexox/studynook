import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { exams } from "@/db/schema";

type Exam = typeof exams.$inferSelect;

type Props = {
  exams: Exam[];
};

export function ExamList({ exams }: Props) {
  if (exams.length === 0) {
    return (
      <Card>
        <CardContent className="text-muted-foreground py-8 text-center">
          No exams scheduled.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {exams.map((exam) => (
        <Card key={exam.id}>
          <CardHeader>
            <CardTitle>{exam.title}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <p>
              <strong>Starts:</strong> {exam.startsAt.toLocaleString()}
            </p>

            <p>
              <strong>Ends:</strong> {exam.endsAt.toLocaleString()}
            </p>

            <p>
              <strong>Location:</strong> {exam.location ?? "TBA"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
