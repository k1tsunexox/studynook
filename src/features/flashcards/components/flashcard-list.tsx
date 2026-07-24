"use client";

import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { deleteFlashcardAction } from "../actions/flashcards";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  note?: { title: string };
}

export function FlashcardList({ flashcards }: { flashcards: Flashcard[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure?")) return;
    startTransition(async () => {
      await deleteFlashcardAction(id);
      router.refresh();
    });
  };

  if (flashcards.length === 0) {
    return (
      <p className="text-muted-foreground p-8 text-center">
        No flashcards yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {flashcards.map((card) => (
        <div
          key={card.id}
          className="h-48 cursor-pointer perspective-[1000px]"
          onClick={() => toggleFlip(card.id)}
        >
          <div
            className={`relative h-full w-full transition-transform duration-500 transform-3d ${flipped[card.id] ? "transform-[rotateY(180deg)]" : ""}`}
          >
            {/* Front */}
            <Card className="absolute inset-0 flex flex-col p-4 shadow-sm backface-hidden">
              <div className="mb-2 flex items-start justify-between">
                <span className="text-muted-foreground truncate text-xs">
                  {card.note?.title}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => handleDelete(card.id, e)}
                  disabled={isPending}
                  aria-label={`Delete flashcard: ${card.question}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-1 items-center justify-center font-medium">
                {card.question}
              </div>
            </Card>

            {/* Back */}
            <Card className="bg-primary text-primary-foreground absolute inset-0 flex transform-[rotateY(180deg)] flex-col p-4 shadow-sm backface-hidden">
              <div className="flex flex-1 items-center justify-center">
                {card.answer}
              </div>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}
