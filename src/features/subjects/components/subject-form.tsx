"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTransition } from "react";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createSubjectAction } from "../actions/subject";
import { subjectSchema, type SubjectInput } from "../schemas/subject-schema";

export function SubjectForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubjectInput>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      code: "",
      title: "",
      units: 3,
      section: "",
    },
  });

  function onSubmit(values: SubjectInput) {
    startTransition(async () => {
      const result = await createSubjectAction(values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      reset();
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormField id="code" label="Subject Code" error={errors.code?.message}>
        <Input id="code" placeholder="NCP 4102" {...register("code")} />
      </FormField>

      <FormField id="title" label="Title" error={errors.title?.message}>
        <Input
          id="title"
          placeholder="Digital Signal Processing"
          {...register("title")}
        />
      </FormField>

      <FormField id="units" label="Units" error={errors.units?.message}>
        <Input
          id="units"
          type="number"
          {...register("units", { valueAsNumber: true })}
        />
      </FormField>

      <FormField id="section" label="Section" error={errors.section?.message}>
        <Input id="section" placeholder="4CPE-1B" {...register("section")} />
      </FormField>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? "Adding Subject..." : "Add Subject"}
      </Button>
    </form>
  );
}
