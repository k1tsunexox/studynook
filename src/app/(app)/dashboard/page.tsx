import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  GraduationCap,
  Plus,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
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
    <div className="mx-auto max-w-5xl space-y-10 pb-10">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
            {today}
          </p>
          <h1 className="mt-2 text-3xl font-light tracking-tight text-[#1a1916]">
            Good to see you, <span className="font-normal">{firstName}.</span>
          </h1>
          <p className="mt-1.5 text-sm font-light tracking-wide text-[#9c9890]">
            Here&apos;s your study week at a glance.
          </p>
        </div>
        <Button
          asChild
          size="sm"
          className="h-8 shrink-0 rounded-lg bg-[#1a1916] px-5 text-[10px] font-medium tracking-[0.15em] text-white uppercase hover:bg-[#37352f]"
        >
          <Link href="/notes">
            <Plus className="mr-1.5 size-3" />
            New note
          </Link>
        </Button>
      </header>

      {/* Metrics */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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
          hint="Assignments"
        />
        <Metric
          icon={CalendarDays}
          label="Exams"
          value={upcomingExams}
          hint="Upcoming"
        />
        <Metric
          icon={Clock3}
          label="Classes"
          value={dashboard.schedule.length}
          hint="Scheduled"
        />
      </section>

      {/* Main grid */}
      <section className="grid gap-5 lg:grid-cols-[1fr_300px]">
        {/* Subjects */}
        <div className="rounded-2xl border border-[#e7e2d9] bg-white p-7">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
                Workspace
              </p>
              <h2 className="mt-1.5 text-lg font-light text-[#1a1916]">
                Subjects
              </h2>
            </div>
            <Link
              href="/subjects"
              className="flex items-center gap-1 text-[9px] font-medium tracking-[0.15em] text-[#9c9890] uppercase transition hover:text-[#1a1916]"
            >
              Manage <ArrowRight className="size-3" />
            </Link>
          </div>

          {dashboard.subjects.length ? (
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {dashboard.subjects.slice(0, 4).map((subject) => (
                <Link
                  href="/subjects"
                  key={subject.id}
                  className="group flex flex-col rounded-xl border border-[#ece8e1] bg-[#FAFAF8] p-4 transition-all hover:border-sky-200 hover:bg-sky-50/30"
                >
                  <span className="text-[9px] font-semibold tracking-[0.18em] text-sky-600 uppercase">
                    {subject.code}
                  </span>
                  <h3 className="mt-2 text-sm leading-snug font-light text-[#1a1916] group-hover:text-sky-700">
                    {subject.title}
                  </h3>
                  <p className="mt-auto pt-4 text-[10px] tracking-wide text-[#b0aa9f]">
                    {subject.units} units · {subject.section}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              href="/subjects"
              label="Add your first subject"
              message="Your courses will anchor your notes, tasks, and schedule."
            />
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Dark momentum card */}
          <div className="rounded-2xl bg-[#1a1916] px-6 py-6 text-white">
            <p className="text-[9px] font-medium tracking-[0.22em] text-[#6b6862] uppercase">
              At a glance
            </p>
            <h2 className="mt-1.5 text-base font-light text-white">
              Keep momentum
            </h2>
            <div className="mt-5 space-y-3.5">
              {[
                { label: "Assignments left", value: pendingAssignments.length },
                { label: "Exams coming up", value: upcomingExams },
                {
                  label: "Classes this week",
                  value: dashboard.schedule.length,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between border-b border-white/[0.07] pb-3.5 last:border-0"
                >
                  <span className="text-[11px] tracking-wide text-[#7c7970]">
                    {item.label}
                  </span>
                  <span className="text-xl font-light tabular-nums">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/pomodoro"
              className="mt-5 inline-flex items-center gap-1.5 text-[9px] font-medium tracking-[0.18em] text-sky-400 uppercase transition hover:text-white"
            >
              Start focus session <ArrowRight className="size-3" />
            </Link>
          </div>

          {/* Quick links */}
          <div className="rounded-2xl border border-[#e7e2d9] bg-white p-5">
            <p className="mb-3.5 text-[9px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
              Quick links
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: "/assignments", label: "Tasks", icon: ClipboardList },
                { href: "/calendar", label: "Calendar", icon: CalendarDays },
                { href: "/exams", label: "Exams", icon: GraduationCap },
                { href: "/pomodoro", label: "Focus", icon: Clock3 },
              ].map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 rounded-lg border border-[#ece8e1] bg-[#FAFAF8] px-3 py-2.5 text-[10px] font-medium tracking-wide text-[#6b6862] transition hover:border-sky-200 hover:text-sky-700"
                >
                  <Icon className="size-3.5 shrink-0" strokeWidth={1.5} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tasks + Schedule */}
      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#e7e2d9] bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-light tracking-wide text-[#1a1916]">
              Upcoming tasks
            </h2>
            <Link
              href="/assignments"
              className="text-[9px] font-medium tracking-[0.15em] text-[#b0aa9f] uppercase hover:text-[#1a1916]"
            >
              View all
            </Link>
          </div>
          {pendingAssignments.length ? (
            <div className="mt-5 divide-y divide-[#f0ece5]">
              {pendingAssignments.slice(0, 4).map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-amber-400" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-light text-[#1a1916]">
                      {assignment.title}
                    </p>
                    <p className="mt-0.5 text-[10px] tracking-wide text-[#b0aa9f]">
                      Due {assignment.dueAt.toLocaleDateString()}
                    </p>
                  </div>
                  <span className="shrink-0 text-[9px] font-medium tracking-[0.12em] text-[#9c9890] uppercase">
                    {subjectById.get(assignment.subjectId)?.code}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              href="/assignments"
              label="Add a task"
              message="No open assignments right now."
              compact
            />
          )}
        </div>

        <div className="rounded-2xl border border-[#e7e2d9] bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-light tracking-wide text-[#1a1916]">
              Class schedule
            </h2>
            <Link
              href="/schedule"
              className="text-[9px] font-medium tracking-[0.15em] text-[#b0aa9f] uppercase hover:text-[#1a1916]"
            >
              View all
            </Link>
          </div>
          {dashboard.schedule.length ? (
            <div className="mt-5 divide-y divide-[#f0ece5]">
              {dashboard.schedule.slice(0, 4).map((session) => (
                <div
                  key={session.id}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#F3EEE7] text-[11px] font-medium text-[#6b6862]">
                    {session.startTime.slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-light text-[#1a1916]">
                      {subjectById.get(session.subjectId)?.title ?? "Class"}
                    </p>
                    <p className="mt-0.5 text-[10px] tracking-wide text-[#b0aa9f]">
                      {session.day} · {session.startTime.slice(0, 5)}–
                      {session.endTime.slice(0, 5)}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] text-[#b0aa9f]">
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
        </div>
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
    <div className="flex flex-col rounded-2xl border border-[#e7e2d9] bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-medium tracking-[0.15em] text-[#b0aa9f] uppercase">
          {label}
        </p>
        <Icon className="size-3.5 text-[#ccc8c1]" strokeWidth={1.5} />
      </div>
      <p className="mt-3 text-4xl font-extralight text-[#1a1916] tabular-nums">
        {value}
      </p>
      <p className="mt-1 text-[10px] tracking-wide text-[#ccc8c1]">{hint}</p>
    </div>
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
      className={`mt-5 rounded-xl border border-dashed border-[#ddd8d0] text-center ${compact ? "p-5" : "p-8"}`}
    >
      <p className="text-xs font-light text-[#b0aa9f]">{message}</p>
      <Link
        href={href}
        className="mt-2.5 inline-flex items-center gap-1 text-[10px] font-medium tracking-[0.12em] text-sky-600 uppercase hover:text-sky-800"
      >
        {label} <ArrowRight className="size-3" />
      </Link>
    </div>
  );
}
