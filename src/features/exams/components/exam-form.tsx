"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState, useTransition } from "react";

import { createExamAction } from "../actions/exam";
import { examSchema, type ExamInput } from "../schemas/exam-schema";

type Subject = { id: string; code: string; title: string };

const inputCls =
  "w-full rounded-xl border border-[#e7e2d9] bg-[#FAFAF8] px-4 py-2.5 text-sm font-light text-[#1a1916] outline-none placeholder:text-[#ccc8c1] focus:border-sky-400 transition-colors";

const labelCls =
  "block text-[9px] font-semibold tracking-[0.18em] text-[#b0aa9f] uppercase mb-1.5";

export function ExamForm({ subjects }: { subjects: Subject[] }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExamInput>({
    resolver: zodResolver(examSchema),
  });

  function onSubmit(values: ExamInput) {
    startTransition(async () => {
      const result = await createExamAction(values);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      reset();
      setOpen(false);
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e7e2d9] bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-6 py-4 transition hover:bg-[#FAFAF8]"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1a1916] text-white">
            <Plus className="size-3.5" strokeWidth={2} />
          </div>
          <span className="text-sm font-light tracking-wide text-[#1a1916]">
            Schedule an exam
          </span>
        </div>
        <ChevronDown
          className={`size-4 text-[#b0aa9f] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>

      {open && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-t border-[#f0ece5] px-6 py-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Subject</label>
              <select {...register("subjectId")} className={inputCls}>
                <option value="">Select subject</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code} — {s.title}
                  </option>
                ))}
              </select>
              {errors.subjectId && (
                <p className="mt-1 text-[10px] text-red-500">
                  {errors.subjectId.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelCls}>Exam title</label>
              <input
                {...register("title")}
                placeholder="Midterm exam"
                className={inputCls}
              />
              {errors.title && (
                <p className="mt-1 text-[10px] text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelCls}>
                Location{" "}
                <span className="font-light text-[#ccc8c1] normal-case">
                  (optional)
                </span>
              </label>
              <input
                {...register("location")}
                placeholder="Room 301"
                className={inputCls}
              />
            </div>

            <div className="sm:col-span-1" />

            <div>
              <label className={labelCls}>Starts</label>
              <input
                type="datetime-local"
                {...register("startsAt")}
                className={inputCls}
              />
              {errors.startsAt && (
                <p className="mt-1 text-[10px] text-red-500">
                  {errors.startsAt.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelCls}>Ends</label>
              <input
                type="datetime-local"
                {...register("endsAt")}
                className={inputCls}
              />
              {errors.endsAt && (
                <p className="mt-1 text-[10px] text-red-500">
                  {errors.endsAt.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                reset();
                setOpen(false);
              }}
              className="text-[10px] font-medium tracking-[0.12em] text-[#9c9890] uppercase hover:text-[#1a1916]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-[#1a1916] px-5 py-2 text-[10px] font-semibold tracking-[0.15em] text-white uppercase transition hover:bg-[#37352f] disabled:opacity-50"
            >
              {isPending ? "Scheduling…" : "Schedule exam"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
