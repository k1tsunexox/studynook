"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { saveNote } from "../actions/note";
import { noteSchema, type NoteInput } from "../schemas/note-schema";

interface Subject {
  id: string;
  code: string;
  title: string;
}

const inputCls =
  "w-full rounded-xl border border-[#e7e2d9] bg-[#FAFAF8] px-4 py-2.5 text-sm font-light text-[#1a1916] outline-none placeholder:text-[#ccc8c1] focus:border-sky-400 transition-colors";

const labelCls =
  "block text-[9px] font-semibold tracking-[0.18em] text-[#b0aa9f] uppercase mb-1.5";

export function NoteForm({ subjects }: { subjects: Subject[] }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteInput>({
    resolver: zodResolver(noteSchema),
    defaultValues: { subjectId: "", title: "", content: "" },
  });

  function onSubmit(values: NoteInput) {
    startTransition(async () => {
      const result = await saveNote(values);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success("Note saved.");
      reset();
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e7e2d9] bg-white">
      {/* Toggle */}
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
            New note
          </span>
        </div>
        <ChevronDown
          className={`size-4 text-[#b0aa9f] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>

      {/* Collapsible form */}
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
              <label className={labelCls}>Title</label>
              <input
                {...register("title")}
                placeholder="Lecture 4 — Fourier transforms"
                className={inputCls}
              />
              {errors.title && (
                <p className="mt-1 text-[10px] text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls}>Content</label>
              <textarea
                {...register("content")}
                placeholder="Write your notes here…"
                rows={5}
                className={`${inputCls} resize-none leading-relaxed`}
              />
              {errors.content && (
                <p className="mt-1 text-[10px] text-red-500">
                  {errors.content.message}
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
              {isPending ? "Saving…" : "Save note"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
