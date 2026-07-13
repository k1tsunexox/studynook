"use client";

import { Search } from "lucide-react";
import { useDebounce } from "use-debounce"; // We need to install this
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const initialQuery = searchParams.get("q") ?? "";
  const [text, setText] = useState(initialQuery);
  const [debouncedValue] = useDebounce(text, 500);

  useEffect(() => {
    startTransition(() => {
      if (debouncedValue) {
        router.push(`/search?q=${encodeURIComponent(debouncedValue)}`);
      } else {
        router.push(`/search`);
      }
    });
  }, [debouncedValue, router]);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search
          className={`h-5 w-5 ${isPending ? "text-primary animate-pulse" : "text-muted-foreground"}`}
        />
      </div>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="h-12 w-full rounded-xl pl-10 text-lg shadow-sm"
        placeholder="Search notes, flashcards, and documents..."
      />
    </div>
  );
}
