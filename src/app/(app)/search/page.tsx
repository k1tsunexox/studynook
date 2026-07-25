import { File, FileText, Layers } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

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
    <main className="mx-auto max-w-4xl space-y-8 pb-10">
      <div className="border-b border-[#e7e2d9] pb-7">
        <p className="text-[10px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
          Tools
        </p>

        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#1a1916]">
          Search
        </h1>
      </div>

      <Suspense
        fallback={
          <div className="text-sm font-light text-[#b0aa9f]">Loading…</div>
        }
      >
        <SearchBar />
      </Suspense>

      {query && !hasResults && (
        <p className="py-12 text-center text-sm font-light text-[#b0aa9f]">
          No results for &quot;{query}&quot;.
        </p>
      )}

      {query && hasResults && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {results.notes.length > 0 && (
            <div className="space-y-2.5">
              <p className="flex items-center gap-1.5 text-[9px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
                <FileText className="size-3" strokeWidth={1.5} />
                Notes
              </p>

              {results.notes.map((note) => (
                <Link
                  key={note.id}
                  href="/notes"
                  className="block rounded-xl border border-[#e7e2d9] bg-white p-4 transition hover:border-sky-200 hover:bg-sky-50/20"
                >
                  <p className="font-light text-[#1a1916]">{note.title}</p>

                  {note.subject?.code && (
                    <p className="mt-0.5 text-[9px] font-semibold tracking-[0.15em] text-sky-600 uppercase">
                      {note.subject.code}
                    </p>
                  )}

                  <p className="mt-2 line-clamp-2 text-[11px] font-light tracking-wide text-[#b0aa9f]">
                    {note.content}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {results.flashcards.length > 0 && (
            <div className="space-y-2.5">
              <p className="flex items-center gap-1.5 text-[9px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
                <Layers className="size-3" strokeWidth={1.5} />
                Flashcards
              </p>

              {results.flashcards.map((flashcard) => (
                <Link
                  key={flashcard.id}
                  href="/flashcards"
                  className="block rounded-xl border border-[#e7e2d9] bg-white p-4 transition hover:border-sky-200 hover:bg-sky-50/20"
                >
                  <p className="font-light text-[#1a1916]">
                    {flashcard.question}
                  </p>

                  <p className="mt-2 line-clamp-2 text-[11px] font-light tracking-wide text-[#b0aa9f]">
                    {flashcard.answer}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {results.documents.length > 0 && (
            <div className="space-y-2.5">
              <p className="flex items-center gap-1.5 text-[9px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
                <File className="size-3" strokeWidth={1.5} />
                Documents
              </p>

              {results.documents.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-[#e7e2d9] bg-white p-4 transition hover:border-sky-200 hover:bg-sky-50/20"
                >
                  <p className="font-light text-[#1a1916]">{doc.title}</p>

                  {doc.subject?.code && (
                    <p className="mt-0.5 text-[9px] font-semibold tracking-[0.15em] text-sky-600 uppercase">
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
