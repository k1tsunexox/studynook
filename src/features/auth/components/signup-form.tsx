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
    reset,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
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
      reset();
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="firstName"
          label="First Name"
          error={errors.firstName?.message}
        >
          <Input
            id="firstName"
            autoComplete="given-name"
            disabled={isPending}
            {...register("firstName")}
          />
        </FormField>

        <FormField
          id="lastName"
          label="Last Name"
          error={errors.lastName?.message}
        >
          <Input
            id="lastName"
            autoComplete="family-name"
            disabled={isPending}
            {...register("lastName")}
          />
        </FormField>
      </div>

      <FormField id="email" label="Email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          disabled={isPending}
          {...register("email")}
        />
      </FormField>

      <FormField
        id="password"
        label="Password"
        error={errors.password?.message}
      >
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          disabled={isPending}
          {...register("password")}
        />
      </FormField>

      <FormField
        id="confirmPassword"
        label="Confirm Password"
        error={errors.confirmPassword?.message}
      >
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          disabled={isPending}
          {...register("confirmPassword")}
        />
      </FormField>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
