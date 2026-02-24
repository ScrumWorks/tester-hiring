"use client";

import { FormProvider } from "react-hook-form";
import type { ReactNode } from "react";
import { useProfileForm } from "../hooks/useProfileForm";
import { useProfileFormHook } from "@/features/settings/modules/profile/hooks/useProfileFormHook";
import { ProfileFormContent } from "../components/ProfileFormContent";
import type { ProfileInput } from "@/features/settings/modules/profile/lib/schemas/profile.schema";

export interface ProfileFormProviderProps {
  children?: ReactNode;
  defaultValues: Partial<ProfileInput>;
}

export const ProfileFormProvider = ({
  children,
  defaultValues,
}: ProfileFormProviderProps) => {
  const { form } = useProfileForm(defaultValues);
  const profileHook = useProfileFormHook(form);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(profileHook.handleSubmit)}
        aria-label="Profile settings"
        className="space-y-6"
      >
        {children ?? <ProfileFormContent {...profileHook} />}
      </form>
    </FormProvider>
  );
};

ProfileFormProvider.displayName = "ProfileFormProvider";
