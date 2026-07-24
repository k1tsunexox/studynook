import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardData } from "@/features/dashboard/services/dashboard.service";

export default async function DashboardPage() {
  const { dashboard } = await getDashboardData();

  if (!dashboard) redirect("/onboarding");

  const firstName = dashboard.profile?.firstName ?? "there";
  const pendingAssignments = dashboard.assignments.filter(
    (assignment) => !assignment.completed,
  );
  const upcomingExams = dashboard.exams.filter(
    (exam) => exam.startsAt >= new Date(),
  ).length;
  const subjectById = new Map(
    dashboard.subjects.map((subject) => [subject.id, subject]),
  );
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="mx-auto max-w-7xl space-y-7 pb-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">{today}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
            Good to see you, {firstName}.
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s a clear view of your study week.
          </p>
        </div>
        <Button asChild className="bg-[#37352f] hover:bg-[#242321]">
          <Link href="/notes">
            <Plus className="mr-1.5 size-4" />
            New note
          </Link>
        </Button>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          icon={BookOpen}
          label="Subjects"
          value={dashboard.subjects.length}
          hint="This semester"
        />
        <Metric
          icon={CheckCircle2}
          label="Open tasks"
          value={pendingAssignments.length}
          hint="Assignments to finish"
        />
        <Metric
          icon={CalendarDays}
          label="Upcoming exams"
          value={upcomingExams}
          hint="Stay ahead"
        />
        <Metric
          icon={Clock3}
          label="Classes"
          value={dashboard.schedule.length}
          hint="On your schedule"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.5fr_.9fr]">
        <Card className="border-black/6 bg-white shadow-sm">
          <CardContent className="p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">
                  Your workspace
                </p>
                <h2 className="mt-1 text-xl font-semibold">Subjects</h2>
              </div>
              <Link
                href="/subjects"
                className="inline-flex items-center gap-1 text-sm font-medium text-violet-700 hover:text-violet-900"
              >
                Manage <ArrowRight className="size-4" />
              </Link>
            </div>
            {dashboard.subjects.length ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {dashboard.subjects.slice(0, 4).map((subject) => (
                  <Link
                    href="/subjects"
                    key={subject.id}
                    className="group rounded-xl border border-black/6 p-4 transition hover:border-violet-200 hover:bg-violet-50/40"
                  >
                    <p className="text-xs font-semibold tracking-wide text-violet-700 uppercase">
                      {subject.code}
                    </p>
                    <h3 className="mt-2 font-medium text-slate-800">
                      {subject.title}
                    </h3>
                    <p className="mt-4 text-xs text-slate-500">
                      {subject.units} units · {subject.section}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState
                href="/subjects"
                label="Add your first subject"
                message="Your courses will become the foundation for notes, tasks, and schedules."
              />
            )}
          </CardContent>
        </Card>

        <Card className="border-black/6 bg-[#37352f] text-white shadow-sm">
          <CardContent className="p-6 sm:p-7">
            <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">
              At a glance
            </p>
            <h2 className="mt-1 text-xl font-semibold">Keep your momentum</h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  label: "Assignments remaining",
                  value: pendingAssignments.length,
                },
                { label: "Exams coming up", value: upcomingExams },
                {
                  label: "Classes scheduled",
                  value: dashboard.schedule.length,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0"
                >
                  <span className="text-sm text-slate-300">{item.label}</span>
                  <span className="text-lg font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
            <Link
              href="/pomodoro"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-violet-200 hover:text-white"
            >
              Start a focus session <ArrowRight className="size-4" />
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border-black/6 bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Upcoming tasks</h2>
              <Link
                href="/assignments"
                className="text-sm text-slate-500 hover:text-slate-900"
              >
                View all
              </Link>
            </div>
            {pendingAssignments.length ? (
              <div className="mt-4 space-y-2">
                {pendingAssignments.slice(0, 3).map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-slate-50"
                  >
                    <span className="size-2 rounded-full bg-amber-400" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {assignment.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        Due {assignment.dueAt.toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400">
                      {subjectById.get(assignment.subjectId)?.code}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                href="/assignments"
                label="Plan an assignment"
                message="You have no open assignments right now."
                compact
              />
            )}
          </CardContent>
        </Card>
        <Card className="border-black/6 bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Class schedule</h2>
              <Link
                href="/schedule"
                className="text-sm text-slate-500 hover:text-slate-900"
              >
                View schedule
              </Link>
            </div>
            {dashboard.schedule.length ? (
              <div className="mt-4 space-y-2">
                {dashboard.schedule.slice(0, 3).map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-slate-50"
                  >
                    <div className="grid size-9 place-items-center rounded-lg bg-violet-50 text-xs font-semibold text-violet-700">
                      {session.startTime.slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {subjectById.get(session.subjectId)?.title ?? "Class"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {session.day} · {session.startTime.slice(0, 5)}–
                        {session.endTime.slice(0, 5)}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400">
                      {session.room}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                href="/schedule"
                label="Add a class"
                message="Build a schedule you can glance at anytime."
                compact
              />
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof BookOpen;
  label: string;
  value: number;
  hint: string;
}) {
  return (
    <Card className="border-black/6 bg-white shadow-sm">
      <CardContent className="flex items-start justify-between p-5">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
          <p className="mt-1 text-xs text-slate-400">{hint}</p>
        </div>
        <div className="rounded-lg bg-violet-50 p-2.5 text-violet-700">
          <Icon className="size-4" />
        </div>
      </CardContent>
    </Card>
  );
}
function EmptyState({
  href,
  label,
  message,
  compact = false,
}: {
  href: string;
  label: string;
  message: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center ${compact ? "p-5" : "p-10"}`}
    >
      <p className="text-sm text-slate-500">{message}</p>
      <Link
        href={href}
        className="mt-3 inline-block text-sm font-medium text-violet-700 hover:text-violet-900"
      >
        {label} <ArrowRight className="inline size-3.5" />
      </Link>
    </div>
  );
}
