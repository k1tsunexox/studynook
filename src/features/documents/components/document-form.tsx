"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { saveDocumentAction } from "../actions/document";
import { documentSchema, type DocumentInput } from "../schemas/document-schema";

interface Subject {
  id: string;
  code: string;
  title: string;
}

interface DocumentFormProps {
  subjects: Subject[];
}

export function DocumentForm({ subjects }: DocumentFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<DocumentInput>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      subjectId: "",
      title: "",
      fileUrl: "",
    },
  });

  function onSubmit(values: DocumentInput) {
    startTransition(async () => {
      const result = await saveDocumentAction(values);

      if (result.success) {
        form.reset();
        router.refresh();
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-card space-y-4 rounded-lg border p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Upload New Document</h2>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="subjectId">
          Subject
        </label>
        <Controller
          control={form.control}
          name="subjectId"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="subjectId">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.code} - {subject.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="title">
          Document Title
        </label>
        <Input
          id="title"
          placeholder="e.g., Chapter 1 Lecture Notes"
          {...form.register("title")}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="fileUrl">
          File URL
        </label>
        <Input
          id="fileUrl"
          placeholder="https://..."
          {...form.register("fileUrl")}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Document"}
      </Button>
    </form>
  );
}
