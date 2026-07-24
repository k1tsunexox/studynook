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
    <div className="mx-auto max-w-6xl space-y-8 pb-10">
      {/* Page header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-widest text-slate-400 uppercase">
            {today}
          </p>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-900">
            Good to see you, {firstName}.
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Here&apos;s a clear view of your study week.
          </p>
        </div>
        <Button
          asChild
          size="sm"
          className="h-8 rounded-lg bg-[#37352f] px-4 text-xs font-medium hover:bg-[#242321]"
        >
          <Link href="/notes">
            <Plus className="mr-1.5 size-3.5" />
            New note
          </Link>
        </Button>
      </header>

      {/* Metrics row */}
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

      {/* Subjects + Momentum */}
      <section className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Card className="border-[#E7E2D9] bg-white shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                  Workspace
                </p>
                <h2 className="mt-0.5 text-base font-semibold text-slate-900">
                  Subjects
                </h2>
              </div>
              <Link
                href="/subjects"
                className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 hover:text-sky-800"
              >
                Manage <ArrowRight className="size-3.5" />
              </Link>
            </div>
            {dashboard.subjects.length ? (
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {dashboard.subjects.slice(0, 4).map((subject) => (
                  <Link
                    href="/subjects"
                    key={subject.id}
                    className="group rounded-lg border border-[#E7E2D9] bg-[#F7F4EE] p-3.5 transition hover:border-sky-200 hover:bg-sky-50/50"
                  >
                    <p className="text-[10px] font-semibold tracking-widest text-sky-600 uppercase">
                      {subject.code}
                    </p>
                    <h3 className="mt-1.5 text-sm leading-snug font-medium text-slate-800">
                      {subject.title}
                    </h3>
                    <p className="mt-3 text-[11px] text-slate-400">
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

        <Card className="border-0 bg-[#37352f] text-white shadow-none">
          <CardContent className="p-6">
            <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
              At a glance
            </p>
            <h2 className="mt-0.5 text-base font-semibold">
              Keep your momentum
            </h2>
            <div className="mt-5 space-y-3.5">
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
                  className="flex items-center justify-between border-b border-white/8 pb-3 last:border-0"
                >
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className="text-base font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
            <Link
              href="/pomodoro"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-sky-300 hover:text-white"
            >
              Start a focus session <ArrowRight className="size-3.5" />
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Tasks + Schedule */}
      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="border-[#E7E2D9] bg-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                Upcoming tasks
              </h2>
              <Link
                href="/assignments"
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                View all
              </Link>
            </div>
            {pendingAssignments.length ? (
              <div className="mt-4 space-y-1">
                {pendingAssignments.slice(0, 3).map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center gap-3 rounded-md px-2 py-2.5 hover:bg-[#F7F4EE]"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-amber-400" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {assignment.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Due {assignment.dueAt.toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">
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

        <Card className="border-[#E7E2D9] bg-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                Class schedule
              </h2>
              <Link
                href="/schedule"
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                View schedule
              </Link>
            </div>
            {dashboard.schedule.length ? (
              <div className="mt-4 space-y-1">
                {dashboard.schedule.slice(0, 3).map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center gap-3 rounded-md px-2 py-2.5 hover:bg-[#F7F4EE]"
                  >
                    <div className="grid size-8 shrink-0 place-items-center rounded-md bg-sky-50 text-xs font-semibold text-sky-700">
                      {session.startTime.slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {subjectById.get(session.subjectId)?.title ?? "Class"}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {session.day} · {session.startTime.slice(0, 5)}–
                        {session.endTime.slice(0, 5)}
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400">
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
    <Card className="border-[#E7E2D9] bg-white shadow-none">
      <CardContent className="flex items-start justify-between p-5">
        <div>
          <p className="text-xs text-slate-400">{label}</p>
          <p className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-900">
            {value}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-400">{hint}</p>
        </div>
        <div className="rounded-md bg-sky-50 p-2 text-sky-600">
          <Icon className="size-3.5" />
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
      className={`mt-5 rounded-lg border border-dashed border-[#E7E2D9] bg-[#F7F4EE] text-center ${compact ? "p-5" : "p-8"}`}
    >
      <p className="text-xs text-slate-400">{message}</p>
      <Link
        href={href}
        className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-sky-600 hover:text-sky-800"
      >
        {label} <ArrowRight className="size-3" />
      </Link>
    </div>
  );
}
