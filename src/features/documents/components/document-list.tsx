"use client";

import { ExternalLink, FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteDocumentAction } from "../actions/document";

interface Document {
  id: string;
  subjectId: string;
  title: string;
  fileUrl: string;
  createdAt: Date;
  subject?: { code: string; title: string } | null;
}

export function DocumentList({ documents }: { documents: Document[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    startTransition(async () => {
      const result = await deleteDocumentAction(id);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success("Document removed.");
      router.refresh();
    });
  };

  if (documents.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#ddd8d0] py-14 text-center">
        <p className="text-sm font-light text-[#b0aa9f]">No documents yet.</p>
        <p className="mt-1 text-[10px] tracking-[0.12em] text-[#ccc8c1] uppercase">
          Link your first file using the form above
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="group flex flex-col rounded-2xl border border-[#e7e2d9] bg-white p-5 transition hover:border-sky-200 hover:bg-sky-50/10"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {doc.subject && (
                <span className="text-[9px] font-bold tracking-[0.2em] text-sky-600 uppercase">
                  {doc.subject.code}
                </span>
              )}
              <h3 className="mt-1 flex items-center gap-1.5 text-sm font-light text-[#1a1916]">
                <FileText
                  className="size-3.5 shrink-0 text-[#ccc8c1]"
                  strokeWidth={1.5}
                />
                <span className="line-clamp-1">{doc.title}</span>
              </h3>
            </div>
            <button
              onClick={() => handleDelete(doc.id, doc.title)}
              disabled={isPending}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[#e0dbd3] opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
              aria-label={`Delete "${doc.title}"`}
            >
              <Trash2 className="size-3.5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="my-3.5 h-px bg-[#f0ece5]" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-medium tracking-[0.12em] text-[#ccc8c1] uppercase">
              {new Date(doc.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <a
              href={doc.fileUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1 text-[10px] font-medium tracking-[0.12em] text-sky-600 uppercase transition hover:text-sky-800"
            >
              Open <ExternalLink className="size-3" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
