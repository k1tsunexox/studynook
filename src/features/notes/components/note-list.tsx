"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  };
}

interface NoteListProps {
  notes: Note[];
}

export function NoteList({ notes }: NoteListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    startTransition(async () => {
      await deleteNoteAction(id);
      router.refresh();
    });
  };

  if (notes.length === 0) {
    return (
      <div className="text-muted-foreground rounded-lg border border-dashed p-8 text-center">
        No notes found. Create your first note above!
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Card key={note.id} className="flex flex-col">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="line-clamp-1 text-lg">
                {note.title}
              </CardTitle>
              {note.subject && (
                <CardDescription>{note.subject.code}</CardDescription>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 w-8"
              onClick={() => handleDelete(note.id)}
              disabled={isPending}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete note</span>
            </Button>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground line-clamp-4 text-sm whitespace-pre-wrap">
              {note.content}
            </p>
            <p className="text-muted-foreground mt-4 text-xs">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
