"use client";

import { MapPin, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteExamAction } from "../actions/exam";

interface Exam {
  id: string;
  subjectId: string;
  title: string;
  location?: string | null;
  startsAt: Date;
  endsAt: Date;
}

interface Props {
  exams: Exam[];
  subjectMap?: Record<string, { code: string; title: string }>;
}

function ExamStatus({ startsAt, endsAt }: { startsAt: Date; endsAt: Date }) {
  const now = new Date();
  if (now > endsAt)
    return (
      <span className="rounded-md bg-[#F3EEE7] px-2 py-0.5 text-[9px] font-medium tracking-[0.12em] text-[#9c9890] uppercase">
        Past
      </span>
    );
  if (now >= startsAt)
    return (
      <span className="rounded-md bg-sky-50 px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-sky-600 uppercase">
        In progress
      </span>
    );
  const days = Math.ceil(
    (startsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (days === 0)
    return (
      <span className="rounded-md bg-orange-50 px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-orange-600 uppercase">
        Today
      </span>
    );
  if (days <= 7)
    return (
      <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-amber-600 uppercase">
        {days}d away
      </span>
    );
  return (
    <span className="rounded-md bg-[#F3EEE7] px-2 py-0.5 text-[9px] font-medium tracking-[0.12em] text-[#9c9890] uppercase">
      {days}d away
    </span>
  );
}

export function ExamList({ exams, subjectMap = {} }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (id: string, title: string) => {
    startTransition(async () => {
      await deleteExamAction(id);
      toast.success(`"${title}" removed.`);
      router.refresh();
    });
  };

  if (exams.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#ddd8d0] py-14 text-center">
        <p className="text-sm font-light text-[#b0aa9f]">No exams scheduled.</p>
        <p className="mt-1 text-[10px] tracking-[0.12em] text-[#ccc8c1] uppercase">
          Add one using the form above
        </p>
      </div>
    );
  }

  const now = new Date();
  const upcoming = exams.filter((e) => e.endsAt > now);
  const past = exams.filter((e) => e.endsAt <= now);

  const renderGroup = (items: Exam[], label: string) => {
    if (items.length === 0) return null;
    return (
      <div>
        <p className="mb-3 text-[9px] font-semibold tracking-[0.22em] text-[#b0aa9f] uppercase">
          {label}
        </p>
        <div className="overflow-hidden rounded-2xl border border-[#e7e2d9] bg-white">
          {items.map((exam, i) => {
            const subject = subjectMap[exam.subjectId];
            const isPast = exam.endsAt <= now;
            return (
              <div
                key={exam.id}
                className={`flex items-start gap-5 px-5 py-5 transition-colors hover:bg-[#FAFAF8] ${
                  i > 0 ? "border-t border-[#f0ece5]" : ""
                } ${isPast ? "opacity-50" : ""}`}
              >
                {/* Date block */}
                <div className="flex shrink-0 flex-col items-center rounded-xl bg-[#F3EEE7] px-3 py-2.5 text-center">
                  <span className="text-[9px] font-semibold tracking-[0.12em] text-[#9c9890] uppercase">
                    {exam.startsAt.toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                  <span className="mt-0.5 text-xl font-extralight text-[#1a1916] tabular-nums">
                    {exam.startsAt.getDate()}
                  </span>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-light text-[#1a1916]">
                      {exam.title}
                    </p>
                    <ExamStatus startsAt={exam.startsAt} endsAt={exam.endsAt} />
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3">
                    {subject && (
                      <span className="text-[9px] font-semibold tracking-[0.15em] text-sky-600 uppercase">
                        {subject.code}
                      </span>
                    )}
                    <span className="text-[10px] tracking-wide text-[#ccc8c1]">
                      {exam.startsAt.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                      {" — "}
                      {exam.endsAt.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                    {exam.location && (
                      <span className="flex items-center gap-1 text-[10px] tracking-wide text-[#ccc8c1]">
                        <MapPin className="size-2.5" strokeWidth={1.5} />{" "}
                        {exam.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(exam.id, exam.title)}
                  disabled={isPending}
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#ccc8c1] transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Delete exam"
                >
                  <Trash2 className="size-3.5" strokeWidth={1.5} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderGroup(upcoming, `Upcoming · ${upcoming.length}`)}
      {renderGroup(past, `Past · ${past.length}`)}
    </div>
  );
}
