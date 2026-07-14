import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  GraduationCap,
  Plus,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentSubjects } from "@/features/subjects/services/subject.service";

export default async function DashboardPage() {
  const subjects = await getCurrentSubjects();

  return (
    <main className="min-h-screen bg-[#F7F4EE]">
      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8 lg:px-10">
        {/* Header */}

        <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500">Welcome back</p>

            <h1 className="mt-1 text-4xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Everything you need for this semester, all in one place.
            </p>
          </div>

          <Link href="/notes">
            <Button className="rounded-xl bg-sky-600 hover:bg-sky-700">
              <Plus className="mr-2 h-4 w-4" />
              New Note
            </Button>
          </Link>
        </header>

        {/* Hero */}

        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-sky-100 via-sky-50 to-white p-8 shadow-sm md:p-12">
          <div className="max-w-2xl">
            <span className="rounded-full bg-white px-4 py-1 text-sm font-medium text-sky-700 shadow">
              Study Workspace
            </span>

            <h2 className="mt-5 text-4xl leading-tight font-bold text-slate-900 md:text-5xl">
              Stay organized.
              <br />
              Study smarter.
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              Keep track of your classes, notes, schedules, flashcards, study
              sessions and everything related to your semester.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/subjects">
                <Button className="rounded-xl bg-sky-600 hover:bg-sky-700">
                  View Subjects
                </Button>
              </Link>

              <Link href="/calendar">
                <Button variant="outline" className="rounded-xl">
                  Calendar
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Statistics */}

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            icon={<BookOpen className="h-6 w-6 text-sky-600" />}
            title="Subjects"
            value={subjects.length.toString()}
          />

          <DashboardCard
            icon={<GraduationCap className="h-6 w-6 text-sky-600" />}
            title="Assignments"
            value="0"
          />

          <DashboardCard
            icon={<CalendarDays className="h-6 w-6 text-sky-600" />}
            title="Upcoming Exams"
            value="0"
          />

          <DashboardCard
            icon={<Clock3 className="h-6 w-6 text-sky-600" />}
            title="Study Hours"
            value="0"
          />
        </section>

        {/* Content */}

        <section className="grid gap-6 lg:grid-cols-3">
          {/* Subjects */}

          <Card className="rounded-3xl border-0 shadow-sm lg:col-span-2">
            <CardContent className="p-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold">Your Subjects</h3>

                <Link
                  href="/subjects"
                  className="flex items-center gap-1 text-sm font-medium text-sky-700"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {subjects.length === 0 ? (
                <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                  <div className="text-center">
                    <BookOpen className="mx-auto mb-4 h-10 w-10 text-slate-300" />

                    <p className="font-medium text-slate-700">
                      No subjects yet
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Add your first subject to get started.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {subjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="rounded-2xl border bg-white p-5 transition hover:border-sky-300 hover:shadow-md"
                    >
                      <p className="text-xs font-medium tracking-wide text-sky-600 uppercase">
                        {subject.code}
                      </p>

                      <h4 className="mt-2 font-semibold text-slate-900">
                        {subject.title}
                      </h4>

                      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                        <span>{subject.units} Units</span>

                        <span>{subject.section}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Overview */}

          <Card className="rounded-3xl border-0 shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold">Quick Overview</h3>

              <div className="mt-6 space-y-4">
                <QuickItem
                  label="Subjects Enrolled"
                  value={subjects.length.toString()}
                />

                <QuickItem label="Assignments" value="0" />

                <QuickItem label="Upcoming Exams" value="0" />

                <QuickItem label="Study Sessions" value="0" />
              </div>

              <div className="mt-8 rounded-2xl bg-sky-50 p-5">
                <p className="text-sm text-slate-700">
                  As you continue using StudyNook, your dashboard will
                  automatically display assignments, exams, schedules, notes and
                  study analytics.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

function DashboardCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>
        </div>

        <div className="rounded-2xl bg-sky-100 p-4">{icon}</div>
      </CardContent>
    </Card>
  );
}

function QuickItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
      <span className="text-sm text-slate-600">{label}</span>

      <span className="font-semibold">{value}</span>
    </div>
  );
}
