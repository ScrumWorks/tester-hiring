"use client";

import { useRouter } from "next/navigation";
import type { UseFormReturn } from "react-hook-form";
import { login } from "@/features/auth/api";
import type { LoginInput } from "@/features/auth/lib/schemas/login.schema";

export const useLoginHook = (form: UseFormReturn<LoginInput>) => {
  const router = useRouter();

  const handleLogin = async (data: LoginInput) => {
    try {
      const { ok, error } = await login(data);

      if (!ok) {
        form.setError("root", {
          type: "manual",
          message: error ?? "Login failed",
        });
        return;
      }

      router.push("/settings/profile");
      router.refresh();
    } catch {
      form.setError("root", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return { handleLogin };
};
