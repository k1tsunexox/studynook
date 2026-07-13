"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { saveFlashcard } from "../actions/flashcards";
import {
  flashcardSchema,
  type FlashcardInput,
} from "../schemas/flashcard-schema";

interface Note {
  id: string;
  title: string;
}

interface FlashcardFormProps {
  notes: Note[];
}

export function FlashcardForm({ notes }: FlashcardFormProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FlashcardInput>({
    resolver: zodResolver(flashcardSchema),
    defaultValues: {
      noteId: "",
      question: "",
      answer: "",
    },
  });

  function onSubmit(values: FlashcardInput) {
    startTransition(async () => {
      const result = await saveFlashcard(values);

      if (result?.success) {
        reset();
        router.refresh();
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card space-y-4 rounded-lg border p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Create New Flashcard</h2>

      <FormField id="noteId" label="Linked Note" error={errors.noteId?.message}>
        <select
          id="noteId"
          {...register("noteId")}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">Select a note</option>

          {notes.map((note) => (
            <option key={note.id} value={note.id}>
              {note.title}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id="question"
        label="Question"
        error={errors.question?.message}
      >
        <Textarea id="question" {...register("question")} />
      </FormField>

      <FormField id="answer" label="Answer" error={errors.answer?.message}>
        <Textarea id="answer" {...register("answer")} />
      </FormField>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Create Flashcard"}
      </Button>
    </form>
  );
}
