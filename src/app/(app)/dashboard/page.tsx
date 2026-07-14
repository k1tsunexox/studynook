import { BookOpen, CalendarDays, Clock3, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-sky-100 to-white p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="font-medium text-sky-700">Welcome back</p>

          <h1 className="mt-3 text-4xl font-bold text-slate-900 lg:text-5xl">
            Your study dashboard
          </h1>

          <p className="mt-4 text-slate-600">
            Manage subjects, notes, assignments, flashcards and study sessions
            from one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button>Continue Studying</Button>

            <Button variant="outline">Open Calendar</Button>
          </div>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<BookOpen className="h-6 w-6" />}
          title="Subjects"
          value="6"
        />

        <StatCard
          icon={<GraduationCap className="h-6 w-6" />}
          title="Assignments"
          value="12"
        />

        <StatCard
          icon={<CalendarDays className="h-6 w-6" />}
          title="Exams"
          value="2"
        />

        <StatCard
          icon={<Clock3 className="h-6 w-6" />}
          title="Hours"
          value="42"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="rounded-3xl xl:col-span-2">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold">Weekly Overview</h2>

            <div className="mt-6 flex h-80 items-center justify-center rounded-2xl border border-dashed">
              Schedule Component
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold">Today&#39;s Tasks</h2>

            <div className="mt-5 space-y-4">
              <Task title="Review Flashcards" />
              <Task title="Computer Networks" />
              <Task title="Finish Assignment" />
              <Task title="Pomodoro Session" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <Card className="rounded-3xl">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>

        <div className="rounded-2xl bg-sky-100 p-4 text-sky-600">{icon}</div>
      </CardContent>
    </Card>
  );
}

function Task({ title }: { title: string }) {
  return <div className="rounded-xl bg-slate-50 p-4">{title}</div>;
}
