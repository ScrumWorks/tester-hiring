"use client";

import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useToast } from "@/components/Toast";
import { updateProfile, getCities } from "../api";
import type { ProfileInput } from "../lib/schemas/profile.schema";

export const useProfileFormHook = (form: UseFormReturn<ProfileInput>) => {
  const { showToast } = useToast();
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);

  const watchedCountry = form.watch("country") ?? "";
  const watchedBio = form.watch("bio") ?? "";

  useEffect(() => {
    if (!watchedCountry) {
      setCities([]);
      form.resetField("city", { defaultValue: "" });
      return;
    }
    setCitiesLoading(true);
    form.resetField("city", { defaultValue: "" });
    getCities(watchedCountry)
      .then(setCities)
      .finally(() => setCitiesLoading(false));
  }, [watchedCountry, form]);

  const handleSubmit = async (data: ProfileInput) => {
    const res = await updateProfile(data);

    if (!res.ok) {
      const responseData = await res.json();
      showToast("error", responseData.error ?? "Failed to save profile");
      return;
    }

    showToast("success", "Profile saved successfully");
  };

  return {
    handleSubmit,
    cities,
    citiesLoading,
    watchedCountry,
    watchedBio,
  };
};
