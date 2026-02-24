"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@/components/Select";
import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast";
import { useFormModalContext } from "@/components/FormModal";
import { useRouteModalContext } from "@/components/RouteModal";
import { updateProfileAction } from "../../actions";
import { getCities } from "../../api";
import { COUNTRIES } from "../../const/countries.const";
import {
  changeLocationSchema,
  type ChangeLocationInput,
} from "./lib/schemas/change-location.schema";

interface ChangeLocationDialogProps {
  defaultValues: { country: string; city: string };
  onSuccess?: () => void;
}

export const ChangeLocationDialog = ({
  defaultValues,
  onSuccess,
}: ChangeLocationDialogProps) => {
  const router = useRouter();
  const { showToast } = useToast();
  const onClose = useFormModalContext()?.onClose ?? useRouteModalContext()?.onClose;

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    } else {
      router.back();
      router.refresh();
    }
  };
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);

  const form = useForm<ChangeLocationInput>({
    resolver: zodResolver(changeLocationSchema),
    mode: "onBlur",
    defaultValues: {
      country: defaultValues.country,
      city: defaultValues.city,
    },
  });

  const watchedCountry = form.watch("country") ?? "";

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

  const onSubmit = async (data: ChangeLocationInput) => {
    const result = await updateProfileAction(data);
    if (result.success) {
      showToast("success", "Location updated");
      handleSuccess();
    } else {
      showToast("error", result.error ?? "Failed to update");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <Select
          label="Country"
          id="country"
          options={[...COUNTRIES]}
          {...form.register("country")}
          error={form.formState.errors.country?.message}
          disabled={form.formState.isSubmitting}
        />
        <Select
          label="City"
          id="city"
          options={cities}
          {...form.register("city")}
          error={form.formState.errors.city?.message}
          disabled={
            !watchedCountry || citiesLoading || form.formState.isSubmitting
          }
          placeholder={citiesLoading ? "Loading..." : "Select a city"}
        />
        <div className="flex justify-end gap-3 pt-1">
          {onClose && (
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button type="submit" isLoading={form.formState.isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
