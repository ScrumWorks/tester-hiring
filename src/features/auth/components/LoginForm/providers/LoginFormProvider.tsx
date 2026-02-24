"use client";

import { FormProvider } from "react-hook-form";
import type { ReactNode } from "react";
import { useLoginForm } from "../hooks/useLoginForm";
import { useLoginHook } from "@/features/auth/hooks/useLoginHook";
import { LoginFormContent } from "../components/LoginFormContent";

export interface LoginFormProviderProps {
  children?: ReactNode;
}

export const LoginFormProvider = ({ children }: LoginFormProviderProps) => {
  const { form } = useLoginForm();
  const { handleLogin } = useLoginHook(form);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="w-full space-y-4"
        aria-label="Login form"
      >
        {children ?? <LoginFormContent />}
      </form>
    </FormProvider>
  );
};

LoginFormProvider.displayName = "LoginFormProvider";
