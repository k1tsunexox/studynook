"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteNoteAction } from "../actions/note";

interface Note {
  id: string;
  subjectId: string;
  title: string;
  content: string;
  createdAt: Date;
  subject?: {
    code: string;
    title: string;
  } | null;
}

export function NoteList({ notes }: { notes: Note[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    startTransition(async () => {
      const result = await deleteNoteAction(id);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success("Note deleted.");
      router.refresh();
    });
  };

  if (notes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#ddd8d0] py-14 text-center">
        <p className="text-sm font-light text-[#b0aa9f]">No notes yet.</p>
        <p className="mt-1 text-[10px] tracking-[0.12em] text-[#ccc8c1] uppercase">
          Create your first note using the form above
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <div
          key={note.id}
          className="group flex flex-col rounded-2xl border border-[#e7e2d9] bg-white p-5 transition hover:border-sky-200 hover:bg-sky-50/10"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {note.subject && (
                <span className="text-[9px] font-bold tracking-[0.2em] text-sky-600 uppercase">
                  {note.subject.code}
                </span>
              )}
              <h3 className="mt-1 line-clamp-1 text-sm font-light text-[#1a1916]">
                {note.title}
              </h3>
            </div>
            <button
              onClick={() => handleDelete(note.id, note.title)}
              disabled={isPending}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[#e0dbd3] opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
              aria-label={`Delete "${note.title}"`}
            >
              <Trash2 className="size-3.5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Divider */}
          <div className="my-3.5 h-px bg-[#f0ece5]" />

          {/* Content preview */}
          <p className="line-clamp-5 flex-1 text-xs leading-relaxed font-light whitespace-pre-wrap text-[#9c9890]">
            {note.content}
          </p>

          {/* Footer */}
          <p className="mt-4 text-[9px] font-medium tracking-[0.12em] text-[#ccc8c1] uppercase">
            {new Date(note.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
