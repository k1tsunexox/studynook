"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useTransition } from "react";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { saveAcademicProfile } from "../actions/academic";
import { academicProfileSchema } from "../schemas/academic-schema";

type AcademicProfileFormValues = z.input<typeof academicProfileSchema>;

export function AcademicProfileForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcademicProfileFormValues>({
    resolver: zodResolver(academicProfileSchema),
    defaultValues: {
      university: "University of the East",
      campus: "Caloocan Campus",
      college: "College of Engineering",
      degreeProgram: "Bachelor of Science in Computer Engineering",
      yearLevel: 4,
      semester: "1st Semester",
      academicYear: "2026-2027",
    },
  });

  function onSubmit(values: AcademicProfileFormValues) {
    startTransition(async () => {
      try {
        await saveAcademicProfile({
          ...values,
          yearLevel: Number(values.yearLevel),
        });
      } catch {
        toast.error("Unable to save academic profile.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormField
        id="university"
        label="University"
        error={errors.university?.message}
      >
        <Input id="university" {...register("university")} />
      </FormField>

      <FormField id="campus" label="Campus" error={errors.campus?.message}>
        <Input id="campus" {...register("campus")} />
      </FormField>

      <FormField id="college" label="College" error={errors.college?.message}>
        <Input id="college" {...register("college")} />
      </FormField>

      <FormField
        id="degreeProgram"
        label="Degree Program"
        error={errors.degreeProgram?.message}
      >
        <Input id="degreeProgram" {...register("degreeProgram")} />
      </FormField>

      <FormField
        id="yearLevel"
        label="Year Level"
        error={errors.yearLevel?.message}
      >
        <Input
          id="yearLevel"
          type="number"
          {...register("yearLevel", {
            valueAsNumber: true,
          })}
        />
      </FormField>

      <FormField
        id="semester"
        label="Semester"
        error={errors.semester?.message}
      >
        <Input id="semester" {...register("semester")} />
      </FormField>

      <FormField
        id="academicYear"
        label="Academic Year"
        error={errors.academicYear?.message}
      >
        <Input id="academicYear" {...register("academicYear")} />
      </FormField>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Saving..." : "Continue to Dashboard"}
      </Button>
    </form>
  );
}
