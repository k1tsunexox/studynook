"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { saveNote } from "../actions/note";
import { noteSchema, type NoteInput } from "../schemas/note-schema";

interface Subject {
  id: string;
  code: string;
  title: string;
}

interface NoteFormProps {
  subjects: Subject[];
}

export function NoteForm({ subjects }: NoteFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<NoteInput>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      subjectId: "",
      title: "",
      content: "",
    },
  });

  function onSubmit(values: NoteInput) {
    startTransition(async () => {
      const result = await saveNote(values);

      if (result.success) {
        form.reset();
        router.refresh();
      } else {
        // Ideally, connect this to your toast notification system
        console.error(result.message);
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 rounded-lg border p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Create New Note</h2>

      <div className="space-y-2">
        <label htmlFor="subjectId" className="text-sm font-medium">
          Subject
        </label>
        <select
          id="subjectId"
          className="border-input bg-background h-10 w-full rounded-md border px-3 py-2 text-sm"
          {...form.register("subjectId")}
        >
          <option value="">Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.code} - {subject.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          placeholder="Note title"
          {...form.register("title")}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Content
        </label>
        <Textarea
          id="content"
          placeholder="Write your note content here..."
          className="h-32 resize-none"
          {...form.register("content")}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Note"}
      </Button>
    </form>
  );
}
