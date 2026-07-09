"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTransition } from "react";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/features/auth/actions/auth";
import {
  signupSchema,
  type SignupInput,
} from "@/features/auth/schemas/auth-schema";

export function SignupForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: SignupInput) {
    startTransition(async () => {
      const result = await signUp(values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormField
        id="fullName"
        label="Full Name"
        error={errors.fullName?.message}
      >
        <Input id="fullName" {...register("fullName")} />
      </FormField>

      <FormField id="email" label="Email" error={errors.email?.message}>
        <Input id="email" type="email" {...register("email")} />
      </FormField>

      <FormField
        id="password"
        label="Password"
        error={errors.password?.message}
      >
        <Input id="password" type="password" {...register("password")} />
      </FormField>

      <FormField
        id="confirmPassword"
        label="Confirm Password"
        error={errors.confirmPassword?.message}
      >
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
      </FormField>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
