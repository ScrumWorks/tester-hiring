"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import type { LoginInput } from "@/features/auth/lib/schemas/login.schema";

export const LoginFormContent = () => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<LoginInput>();

  const { formState } = useFormContext<LoginInput>();
  const rootError = (formState.errors as { root?: { message?: string } }).root
    ?.message;

  return (
    <>
      <h1 className="text-xl font-semibold text-gray-900">Sign in</h1>

      {rootError && (
        <div
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {rootError}
        </div>
      )}

      <Input
        label="Email"
        id="email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
        autoComplete="email"
        disabled={isSubmitting}
      />

      <Input
        label="Password"
        id="password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
        autoComplete="current-password"
        disabled={isSubmitting}
      />

      <div className="flex items-center gap-2">
        <input
          id="remember-me"
          type="checkbox"
          {...register("rememberMe")}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          disabled={isSubmitting}
        />
        <label htmlFor="remember-me" className="text-sm text-gray-700">
          Remember me
        </label>
      </div>

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Sign in
      </Button>
    </>
  );
};
