"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTransition } from "react";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createExamAction } from "../actions/exam";
import { examSchema, type ExamInput } from "../schemas/exam-schema";

type Subject = {
  id: string;
  code: string;
  title: string;
};

type Props = {
  subjects: Subject[];
};

export function ExamForm({ subjects }: Props) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExamInput>({
    resolver: zodResolver(examSchema),
  });

  function onSubmit(values: ExamInput) {
    startTransition(async () => {
      const result = await createExamAction(values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      reset();
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-lg border p-6"
    >
      <FormField
        id="subjectId"
        label="Subject"
        error={errors.subjectId?.message}
      >
        <select
          {...register("subjectId")}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">Select Subject</option>

          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.code} - {subject.title}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="title" label="Title" error={errors.title?.message}>
        <Input {...register("title")} />
      </FormField>

      <FormField
        id="location"
        label="Location"
        error={errors.location?.message}
      >
        <Input {...register("location")} />
      </FormField>

      <FormField id="startsAt" label="Starts" error={errors.startsAt?.message}>
        <Input type="datetime-local" {...register("startsAt")} />
      </FormField>

      <FormField id="endsAt" label="Ends" error={errors.endsAt?.message}>
        <Input type="datetime-local" {...register("endsAt")} />
      </FormField>

      <Button className="w-full" disabled={isPending}>
        {isPending ? "Creating..." : "Create Exam"}
      </Button>
    </form>
  );
}
