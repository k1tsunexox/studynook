"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTransition } from "react";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createAssignmentAction } from "../actions/assignment";
import {
  assignmentSchema,
  type AssignmentInput,
} from "../schemas/assignment-schema";

type Subject = {
  id: string;
  code: string;
  title: string;
};

type Props = {
  subjects: Subject[];
};

export function AssignmentForm({ subjects }: Props) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignmentInput>({
    resolver: zodResolver(assignmentSchema),
  });

  function onSubmit(values: AssignmentInput) {
    startTransition(async () => {
      const result = await createAssignmentAction(values);

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
          id="subjectId"
          {...register("subjectId")}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">Select subject</option>

          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.code} — {subject.title}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="title" label="Title" error={errors.title?.message}>
        <Input id="title" {...register("title")} />
      </FormField>

      <FormField
        id="description"
        label="Description"
        error={errors.description?.message}
      >
        <Input id="description" {...register("description")} />
      </FormField>

      <FormField id="dueAt" label="Due Date" error={errors.dueAt?.message}>
        <Input id="dueAt" type="datetime-local" {...register("dueAt")} />
      </FormField>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Creating..." : "Create Assignment"}
      </Button>
    </form>
  );
}
