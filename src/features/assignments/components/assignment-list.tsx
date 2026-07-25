"use client";

import { Check, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  deleteAssignmentAction,
  toggleAssignmentAction,
} from "../actions/assignment";

interface Assignment {
  id: string;
  subjectId: string;
  title: string;
  description?: string | null;
  dueAt: Date;
  completed: boolean;
}

interface Props {
  assignments: Assignment[];
  subjectMap?: Record<string, { code: string; title: string }>;
}

function daysUntil(date: Date) {
  const now = new Date();
  const diff = Math.ceil(
    (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diff;
}

function UrgencyBadge({
  dueAt,
  completed,
}: {
  dueAt: Date;
  completed: boolean;
}) {
  if (completed) {
    return (
      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-emerald-600 uppercase">
        Done
      </span>
    );
  }
  const days = daysUntil(dueAt);
  if (days < 0)
    return (
      <span className="rounded-md bg-red-50 px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-red-600 uppercase">
        Overdue
      </span>
    );
  if (days === 0)
    return (
      <span className="rounded-md bg-orange-50 px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-orange-600 uppercase">
        Due today
      </span>
    );
  if (days <= 3)
    return (
      <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-amber-600 uppercase">
        {days}d left
      </span>
    );
  return (
    <span className="rounded-md bg-[#F3EEE7] px-2 py-0.5 text-[9px] font-medium tracking-[0.12em] text-[#9c9890] uppercase">
      {days}d left
    </span>
  );
}

export function AssignmentList({ assignments, subjectMap = {} }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = (id: string, completed: boolean) => {
    startTransition(async () => {
      await toggleAssignmentAction(id, !completed);
      router.refresh();
    });
  };

  const handleDelete = (id: string, title: string) => {
    startTransition(async () => {
      await deleteAssignmentAction(id);
      toast.success(`"${title}" removed.`);
      router.refresh();
    });
  };

  if (assignments.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#ddd8d0] py-14 text-center">
        <p className="text-sm font-light text-[#b0aa9f]">No assignments yet.</p>
        <p className="mt-1 text-[10px] tracking-[0.12em] text-[#ccc8c1] uppercase">
          Add one using the form above
        </p>
      </div>
    );
  }

  const pending = assignments.filter((a) => !a.completed);
  const done = assignments.filter((a) => a.completed);

  const renderGroup = (items: Assignment[], label: string) => {
    if (items.length === 0) return null;
    return (
      <div>
        <p className="mb-3 text-[9px] font-semibold tracking-[0.22em] text-[#b0aa9f] uppercase">
          {label}
        </p>
        <div className="overflow-hidden rounded-2xl border border-[#e7e2d9] bg-white">
          {items.map((assignment, i) => {
            const subject = subjectMap[assignment.subjectId];
            return (
              <div
                key={assignment.id}
                className={`flex items-start gap-4 px-5 py-4 transition-colors hover:bg-[#FAFAF8] ${
                  i > 0 ? "border-t border-[#f0ece5]" : ""
                } ${assignment.completed ? "opacity-50" : ""}`}
              >
                {/* Toggle checkbox */}
                <button
                  onClick={() =>
                    handleToggle(assignment.id, assignment.completed)
                  }
                  disabled={isPending}
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                    assignment.completed
                      ? "border-emerald-400 bg-emerald-400 text-white"
                      : "border-[#ddd8d0] hover:border-sky-400"
                  }`}
                  aria-label={
                    assignment.completed ? "Mark incomplete" : "Mark complete"
                  }
                >
                  {assignment.completed && (
                    <Check className="size-3" strokeWidth={2.5} />
                  )}
                </button>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p
                      className={`text-sm font-light text-[#1a1916] ${assignment.completed ? "line-through" : ""}`}
                    >
                      {assignment.title}
                    </p>
                    <UrgencyBadge
                      dueAt={assignment.dueAt}
                      completed={assignment.completed}
                    />
                  </div>
                  {assignment.description && (
                    <p className="mt-0.5 text-[11px] font-light text-[#b0aa9f]">
                      {assignment.description}
                    </p>
                  )}
                  <div className="mt-1.5 flex items-center gap-3">
                    {subject && (
                      <span className="text-[9px] font-semibold tracking-[0.15em] text-sky-600 uppercase">
                        {subject.code}
                      </span>
                    )}
                    <span className="text-[10px] tracking-wide text-[#ccc8c1]">
                      Due{" "}
                      {assignment.dueAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(assignment.id, assignment.title)}
                  disabled={isPending}
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#ccc8c1] transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Delete assignment"
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
      {renderGroup(pending, `Pending · ${pending.length}`)}
      {renderGroup(done, `Completed · ${done.length}`)}
    </div>
  );
}
