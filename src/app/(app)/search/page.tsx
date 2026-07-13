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
    <main className="space-y-8 p-6">
      <div className="flex flex-col items-center justify-center space-y-4 py-8">
        <h1 className="text-3xl font-bold">Global Search</h1>

        <Suspense fallback={<div>Loading search...</div>}>
          <SearchBar />
        </Suspense>
      </div>

      {query && !hasResults && (
        <div className="text-muted-foreground py-12 text-center">
          No results found for &quot;{query}&quot;.
        </div>
      )}

      {query && hasResults && (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {results.notes.length > 0 && (
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <FileText className="h-5 w-5" />
                Notes
              </h2>

              {results.notes.map((note) => (
                <Card
                  key={note.id}
                  className="hover:border-primary transition-colors"
                >
                  <Link href="/notes">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{note.title}</CardTitle>

                      {note.subject && (
                        <p className="text-muted-foreground text-xs">
                          {note.subject.code}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground line-clamp-2 text-sm">
                        {note.content}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}

          {results.flashcards.length > 0 && (
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Layers className="h-5 w-5" />
                Flashcards
              </h2>

              {results.flashcards.map((card) => (
                <Card
                  key={card.id}
                  className="hover:border-primary transition-colors"
                >
                  <Link href="/flashcards">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{card.question}</CardTitle>

                      {card.note && (
                        <p className="text-muted-foreground text-xs">
                          From: {card.note.title}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground line-clamp-2 text-sm">
                        {card.answer}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}

          {results.documents.length > 0 && (
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <File className="h-5 w-5" />
                Documents
              </h2>

              {results.documents.map((doc) => (
                <Card
                  key={doc.id}
                  className="hover:border-primary transition-colors"
                >
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>

                      {doc.subject && (
                        <p className="text-muted-foreground text-xs">
                          {doc.subject.code}
                        </p>
                      )}
                    </CardHeader>
                  </a>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
