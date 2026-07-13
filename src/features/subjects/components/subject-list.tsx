import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { subjects } from "@/db/schema";

type Subject = typeof subjects.$inferSelect;

type SubjectListProps = {
  subjects: Subject[];
};

export function SubjectList({ subjects }: SubjectListProps) {
  if (subjects.length === 0) {
    return (
      <Card>
        <CardContent className="text-muted-foreground py-8 text-center">
          No subjects yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {subjects.map((subject) => (
        <Card key={subject.id}>
          <CardHeader>
            <CardTitle>{subject.code}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <p className="font-medium">{subject.title}</p>

            <p className="text-muted-foreground text-sm">
              {subject.units} Units
            </p>

            <p className="text-muted-foreground text-sm">{subject.section}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
