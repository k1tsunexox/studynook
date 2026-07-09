"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTransition } from "react";

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
      <div>
        <label className="mb-2 block text-sm font-medium">Full Name</label>

        <Input {...register("fullName")} />

        {errors.fullName && (
          <p className="text-destructive mt-1 text-sm">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Email</label>

        <Input type="email" {...register("email")} />

        {errors.email && (
          <p className="text-destructive mt-1 text-sm">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Password</label>

        <Input type="password" {...register("password")} />

        {errors.password && (
          <p className="text-destructive mt-1 text-sm">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Confirm Password
        </label>

        <Input type="password" {...register("confirmPassword")} />

        {errors.confirmPassword && (
          <p className="text-destructive mt-1 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
