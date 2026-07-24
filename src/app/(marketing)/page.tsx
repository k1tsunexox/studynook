import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const previewTasks = [
  { title: "Finish biology outline", meta: "Biology 101 · Today", done: false },
  {
    title: "Review calculus flashcards",
    meta: "Math 204 · 40 min",
    done: true,
  },
  {
    title: "Upload research sources",
    meta: "Writing Seminar · Friday",
    done: false,
  },
];

export default function MarketingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7f5] text-[#37352f]">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(203,213,225,.7),_transparent_45%),radial-gradient(circle_at_75%_10%,_rgba(196,181,253,.28),_transparent_32%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <header className="flex items-center justify-between py-5">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-[#37352f] text-sm font-bold text-white">
              S
            </span>
            StudyNook
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="bg-[#37352f] px-4 hover:bg-[#242321]">
              <Link href="/signup">Get started</Link>
            </Button>
          </div>
        </header>

        <section className="grid items-center gap-12 py-16 lg:grid-cols-[.88fr_1.12fr] lg:py-24">
          <div className="max-w-xl">
            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] text-[#2f2d29] sm:text-6xl lg:text-7xl">
              Your semester,
              <span className="block text-slate-500">beautifully in sync.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              StudyNook is your personal academic workspace for notes,
              deadlines, class schedules, and focus time—all kept together in
              one intentional place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-11 bg-[#37352f] px-5 hover:bg-[#242321]"
              >
                <Link href="/signup">
                  Create your workspace <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 border-black/10 bg-white/70 px-5"
              >
                <Link href="/login">I already have an account</Link>
              </Button>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600" />
                Built for your semester
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600" />
                No clutter, just clarity
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl rounded-[1.65rem] border border-black/10 bg-white p-2 shadow-2xl shadow-slate-400/25">
            <div className="overflow-hidden rounded-[1.2rem] border border-black/5 bg-[#fbfbfa]">
              <div className="flex items-center gap-2 border-b border-black/5 px-4 py-3 text-xs text-slate-400">
                <span className="size-2 rounded-full bg-red-300" />
                <span className="size-2 rounded-full bg-amber-300" />
                <span className="size-2 rounded-full bg-emerald-300" />
                <span className="ml-2 rounded bg-slate-100 px-2 py-1">
                  studynook.app/dashboard
                </span>
              </div>
              <div className="grid min-h-[25rem] grid-cols-[10.5rem_1fr] sm:min-h-[28rem]">
                <aside className="hidden border-r border-black/5 bg-[#f7f7f5] p-4 sm:block">
                  <p className="mb-5 text-sm font-semibold">StudyNook</p>
                  {[
                    ["Overview", "▦"],
                    ["My notes", "□"],
                    ["Calendar", "◫"],
                    ["Tasks", "✓"],
                  ].map(([label, icon], index) => (
                    <div
                      key={label}
                      className={`mb-1 flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${index === 0 ? "bg-white font-medium shadow-sm" : "text-slate-500"}`}
                    >
                      <span>{icon}</span>
                      {label}
                    </div>
                  ))}
                </aside>
                <div className="p-5 sm:p-7">
                  <p className="text-xs font-medium text-slate-400">
                    TUESDAY, SEPTEMBER 12
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                    Good afternoon, Alex
                  </h2>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { label: "Tasks due", value: "3", icon: ClipboardList },
                      { label: "Classes", value: "2", icon: CalendarDays },
                      { label: "Focus", value: "1.5h", icon: BookOpen },
                    ].map(({ label, value, icon: Icon }) => (
                      <div
                        key={label}
                        className="rounded-xl border border-black/5 bg-white p-3 shadow-sm"
                      >
                        <Icon className="size-4 text-violet-600" />
                        <p className="mt-3 text-lg font-semibold">{value}</p>
                        <p className="text-[10px] text-slate-500">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-xl border border-black/5 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold">
                        Today&apos;s priorities
                      </p>
                      <span className="text-xs text-slate-400">3 items</span>
                    </div>
                    <div className="space-y-3">
                      {previewTasks.map((task) => (
                        <div
                          key={task.title}
                          className="flex items-center gap-3"
                        >
                          <span
                            className={`grid size-4 place-items-center rounded border ${task.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300"}`}
                          >
                            {task.done && "✓"}
                          </span>
                          <div>
                            <p
                              className={`text-xs font-medium ${task.done ? "text-slate-400 line-through" : ""}`}
                            >
                              {task.title}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {task.meta}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 border-t border-black/8 py-12 sm:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "One home for your work",
              body: "Bring notes, documents, flashcards, and subjects into one thoughtful workspace.",
            },
            {
              icon: CalendarDays,
              title: "See what matters next",
              body: "Keep classes, exams, and deadlines visible without bouncing between apps.",
            },
            {
              icon: GraduationCap,
              title: "Build a study rhythm",
              body: "Use focused tools that keep your momentum steady through the semester.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="rounded-2xl bg-white p-6 ring-1 ring-black/5"
            >
              <div className="grid size-9 place-items-center rounded-lg bg-violet-50 text-violet-700">
                <Icon className="size-4" />
              </div>
              <h2 className="mt-5 font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{body}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
