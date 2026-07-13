import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardData } from "@/features/dashboard/services/dashboard.service";

export default async function DashboardPage() {
  const dashboard = await getDashboardData();

  if (!dashboard) {
    return null;
  }

  return (
    <main className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold">
          Welcome, {dashboard.profile?.firstName}
        </h1>

        <p className="text-muted-foreground">
          {dashboard.academicProfile?.degreeProgram ?? ""}
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Subjects</CardTitle>
          </CardHeader>

          <CardContent className="text-4xl font-bold">
            {dashboard.subjects?.length ?? 0}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
          </CardHeader>

          <CardContent className="text-4xl font-bold">
            {dashboard.assignments?.length ?? 0}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exams</CardTitle>
          </CardHeader>

          <CardContent className="text-4xl font-bold">
            {dashboard.exams?.length ?? 0}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Classes</CardTitle>
          </CardHeader>

          <CardContent className="text-4xl font-bold">
            {dashboard.schedule?.length ?? 0}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Assignments</CardTitle>
        </CardHeader>

        <CardContent>
          {(dashboard.assignments ?? [])
            .slice()
            .sort(
              (a, b) => (a.dueAt?.getTime() ?? 0) - (b.dueAt?.getTime() ?? 0),
            )
            .slice(0, 5)
            .map((assignment) => (
              <div key={assignment.id} className="border-b py-3">
                <p className="font-semibold">{assignment.title}</p>

                <p>
                  {assignment.dueAt ? assignment.dueAt.toLocaleString() : ""}
                </p>
              </div>
            ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Exams</CardTitle>
        </CardHeader>

        <CardContent>
          {(dashboard.exams ?? [])
            .slice()
            .sort(
              (a, b) =>
                (a.startsAt?.getTime() ?? 0) - (b.startsAt?.getTime() ?? 0),
            )
            .slice(0, 5)
            .map((exam) => (
              <div key={exam.id} className="border-b py-3">
                <p className="font-semibold">{exam.title}</p>

                <p>{exam.startsAt ? exam.startsAt.toLocaleString() : ""}</p>
              </div>
            ))}
        </CardContent>
      </Card>
    </main>
  );
}
