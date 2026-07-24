import { File, FileText, Layers } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchBar } from "@/features/search/components/search-bar";
import { performGlobalSearch } from "@/features/search/services/search.service";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q ?? "";
  const results = await performGlobalSearch(query);
  const hasResults =
    results.notes.length > 0 ||
    results.flashcards.length > 0 ||
    results.documents.length > 0;

  return (
    <main className="mx-auto max-w-4xl space-y-8 pb-12">
      <div className="border-b border-[#E7E2D9] pb-6">
        <p className="text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
          Tools
        </p>
        <h1 className="mt-1.5 text-[1.75rem] font-semibold tracking-tight text-slate-900">
          Search
        </h1>
      </div>

      <Suspense
        fallback={<div className="text-sm text-slate-400">Loading…</div>}
      >
        <SearchBar />
      </Suspense>

      {query && !hasResults && (
        <p className="py-12 text-center text-sm text-slate-400">
          No results for &quot;{query}&quot;.
        </p>
      )}

      {query && hasResults && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {results.notes.length > 0 && (
            <div className="space-y-3">
              <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
                <FileText className="size-3.5" /> Notes
              </p>
              {results.notes.map((note) => (
                <Link
                  key={note.id}
                  href="/notes"
                  className="block rounded-xl border border-[#E7E2D9] bg-white p-4 transition hover:border-sky-200 hover:bg-sky-50/30"
                >
                  <p className="font-medium text-slate-900">{note.title}</p>
                  {note.subject && (
                    <p className="mt-0.5 text-[11px] font-bold tracking-wide text-sky-600 uppercase">
                      {note.subject.code}
                    </p>
                  )}
                  <p className="mt-2 line-clamp-2 text-xs text-slate-400">
                    {note.content}
                  </p>
                </Link>
              ))}
            </div>
          )}
          {results.flashcards.length > 0 && (
            <div className="space-y-3">
              <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
                <Layers className="size-3.5" /> Flashcards
              </p>
              {results.flashcards.map((card) => (
                <Link
                  key={card.id}
                  href="/flashcards"
                  className="block rounded-xl border border-[#E7E2D9] bg-white p-4 transition hover:border-sky-200 hover:bg-sky-50/30"
                >
                  <p className="font-medium text-slate-900">{card.question}</p>
                  {card.note && (
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      From: {card.note.title}
                    </p>
                  )}
                  <p className="mt-2 line-clamp-2 text-xs text-slate-400">
                    {card.answer}
                  </p>
                </Link>
              ))}
            </div>
          )}
          {results.documents.length > 0 && (
            <div className="space-y-3">
              <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
                <File className="size-3.5" /> Documents
              </p>
              {results.documents.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-[#E7E2D9] bg-white p-4 transition hover:border-sky-200 hover:bg-sky-50/30"
                >
                  <p className="font-medium text-slate-900">{doc.title}</p>
                  {doc.subject && (
                    <p className="mt-0.5 text-[11px] font-bold tracking-wide text-sky-600 uppercase">
                      {doc.subject.code}
                    </p>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
