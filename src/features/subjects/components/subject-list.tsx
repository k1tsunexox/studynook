"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteSubjectAction } from "../actions/subject";

interface Subject {
  id: string;
  code: string;
  title: string;
  units: number;
  section: string;
}

export function SubjectList({ subjects }: { subjects: Subject[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (id: string, code: string) => {
    if (
      !confirm(
        `Remove ${code}? This will delete all linked assignments and exams.`,
      )
    )
      return;
    startTransition(async () => {
      const result = await deleteSubjectAction(id);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(`${code} removed.`);
      router.refresh();
    });
  };

  if (subjects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#ddd8d0] py-14 text-center">
        <p className="text-sm font-light text-[#b0aa9f]">No subjects yet.</p>
        <p className="mt-1 text-[10px] tracking-[0.12em] text-[#ccc8c1] uppercase">
          Add a subject using the form above
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {subjects.map((subject) => (
        <div
          key={subject.id}
          className="group flex flex-col rounded-2xl border border-[#e7e2d9] bg-white p-5 transition hover:border-sky-200 hover:bg-sky-50/20"
        >
          <div className="flex items-start justify-between">
            <span className="text-[9px] font-bold tracking-[0.2em] text-sky-600 uppercase">
              {subject.code}
            </span>
            <button
              onClick={() => handleDelete(subject.id, subject.code)}
              disabled={isPending}
              className="flex h-6 w-6 items-center justify-center rounded-lg text-[#e0dbd3] opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
              aria-label={`Delete ${subject.code}`}
            >
              <Trash2 className="size-3.5" strokeWidth={1.5} />
            </button>
          </div>
          <p className="mt-2.5 text-sm leading-snug font-light text-[#1a1916]">
            {subject.title}
          </p>
          <div className="mt-auto flex items-center gap-3 pt-4">
            <span className="rounded-md bg-[#F3EEE7] px-2 py-0.5 text-[9px] font-medium tracking-[0.12em] text-[#9c9890] uppercase">
              {subject.units} units
            </span>
            <span className="text-[10px] tracking-wide text-[#ccc8c1]">
              {subject.section}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
