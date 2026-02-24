"use client";

import { FormProvider } from "react-hook-form";
import type { ReactNode } from "react";
import { useChangePasswordForm } from "../hooks/useChangePasswordForm";
import { useChangePasswordHook } from "@/features/settings/modules/account/hooks/useChangePasswordHook";
import { ChangePasswordFormContent } from "../components/ChangePasswordFormContent";

export interface ChangePasswordFormProviderProps {
  children?: ReactNode;
  onSuccess?: () => void;
}

export const ChangePasswordFormProvider = ({
  children,
  onSuccess,
}: ChangePasswordFormProviderProps) => {
  const { form } = useChangePasswordForm();
  const { handleSubmit } = useChangePasswordHook(form, { onSuccess });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
        aria-label="Change password form"
      >
        {children ?? <ChangePasswordFormContent />}
      </form>
    </FormProvider>
  );
};

ChangePasswordFormProvider.displayName = "ChangePasswordFormProvider";
