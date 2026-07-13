import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { assignments } from "@/db/schema";

type Assignment = typeof assignments.$inferSelect;

type Props = {
  assignments: Assignment[];
};

export function AssignmentList({ assignments }: Props) {
  if (assignments.length === 0) {
    return (
      <Card>
        <CardContent className="text-muted-foreground py-8 text-center">
          No assignments yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <Card key={assignment.id}>
          <CardHeader>
            <CardTitle>{assignment.title}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            {assignment.description && <p>{assignment.description}</p>}

            <p>
              <strong>Due:</strong> {assignment.dueAt.toLocaleString()}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {assignment.completed ? "Completed" : "Pending"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
