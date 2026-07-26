"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { saveDocumentAction } from "../actions/document";
import { documentSchema, type DocumentInput } from "../schemas/document-schema";

interface Subject {
  id: string;
  code: string;
  title: string;
}

const inputCls =
  "w-full rounded-xl border border-[#e7e2d9] bg-[#FAFAF8] px-4 py-2.5 text-sm font-light text-[#1a1916] outline-none placeholder:text-[#ccc8c1] focus:border-sky-400 transition-colors";

const labelCls =
  "block text-[9px] font-semibold tracking-[0.18em] text-[#b0aa9f] uppercase mb-1.5";

export function DocumentForm({ subjects }: { subjects: Subject[] }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DocumentInput>({
    resolver: zodResolver(documentSchema),
    defaultValues: { subjectId: "", title: "", fileUrl: "" },
  });

  function onSubmit(values: DocumentInput) {
    startTransition(async () => {
      const result = await saveDocumentAction(values);
      if (!result.success) {
        toast.error("Failed to save document.");
        return;
      }
      toast.success("Document saved.");
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
            Link a document
          </span>
        </div>
        <ChevronDown
          className={`size-4 text-[#b0aa9f] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>

      {/* Form */}
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
                placeholder="Chapter 1 lecture slides"
                className={inputCls}
              />
              {errors.title && (
                <p className="mt-1 text-[10px] text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls}>File URL</label>
              <input
                {...register("fileUrl")}
                placeholder="https://drive.google.com/…"
                className={inputCls}
              />
              {errors.fileUrl && (
                <p className="mt-1 text-[10px] text-red-500">
                  {errors.fileUrl.message}
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
              {isPending ? "Saving…" : "Save document"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
