"use client";

import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast";
import { useFormModalContext } from "@/components/FormModal";
import { useRouteModalContext } from "@/components/RouteModal";
import { updateProfileAction } from "../../actions";
import {
  changeDateOfBirthSchema,
  type ChangeDateOfBirthInput,
} from "./lib/schemas/change-date-of-birth.schema";

interface ChangeDateOfBirthDialogProps {
  defaultValues: { dateOfBirth: string };
  onSuccess?: () => void;
}

export const ChangeDateOfBirthDialog = ({
  defaultValues,
  onSuccess,
}: ChangeDateOfBirthDialogProps) => {
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

  const form = useForm<ChangeDateOfBirthInput>({
    resolver: zodResolver(changeDateOfBirthSchema),
    mode: "onBlur",
    defaultValues: { dateOfBirth: defaultValues.dateOfBirth },
  });

  const onSubmit = async (data: ChangeDateOfBirthInput) => {
    const result = await updateProfileAction(data);
    if (result.success) {
      showToast("success", "Date of birth updated");
      handleSuccess();
    } else {
      showToast("error", result.error ?? "Failed to update");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Date of birth"
          id="dateOfBirth"
          type="date"
          {...form.register("dateOfBirth")}
          error={form.formState.errors.dateOfBirth?.message}
          disabled={form.formState.isSubmitting}
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
