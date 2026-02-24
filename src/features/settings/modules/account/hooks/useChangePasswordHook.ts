"use client";

import type { UseFormReturn } from "react-hook-form";
import { useToast } from "@/components/Toast";
import { changePassword } from "../api";
import type { ChangePasswordInput } from "../lib/schemas/change-password.schema";

export interface UseChangePasswordHookOptions {
  onSuccess?: () => void;
}

export const useChangePasswordHook = (
  form: UseFormReturn<ChangePasswordInput>,
  options?: UseChangePasswordHookOptions
) => {
  const { showToast } = useToast();
  const { onSuccess } = options ?? {};

  const handleSubmit = async (data: ChangePasswordInput) => {
    try {
      const res = await changePassword(data);
      const responseData = await res.json();

      if (!res.ok) {
        form.setError("currentPassword", {
          type: "manual",
          message: responseData.error ?? "Failed to change password",
        });
        return;
      }

      showToast("success", "Password changed successfully");
      form.reset();
      onSuccess?.();
    } catch {
      showToast("error", "Something went wrong");
    }
  };

  return { handleSubmit };
};
