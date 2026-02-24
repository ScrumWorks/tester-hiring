"use client";

import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast";
import { useFormModalContext } from "@/components/FormModal";
import { useRouteModalContext } from "@/components/RouteModal";
import { updateProfileAction } from "../../actions";
import { getBioCharCount } from "../../utils/get-bio-char-count";
import { BIO_MIN, BIO_MAX } from "../../lib/schemas/profile.schema";
import {
  changeBioSchema,
  type ChangeBioInput,
} from "./lib/schemas/change-bio.schema";

interface ChangeBioDialogProps {
  defaultValues: { bio: string };
  onSuccess?: () => void;
}

export const ChangeBioDialog = ({
  defaultValues,
  onSuccess,
}: ChangeBioDialogProps) => {
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

  const form = useForm<ChangeBioInput>({
    resolver: zodResolver(changeBioSchema),
    mode: "onBlur",
    defaultValues: { bio: defaultValues.bio },
  });

  const watchedBio = form.watch("bio") ?? "";
  const bioCount = getBioCharCount(watchedBio);

  const onSubmit = async (data: ChangeBioInput) => {
    const result = await updateProfileAction(data);
    if (result.success) {
      showToast("success", "Bio updated");
      handleSuccess();
    } else {
      showToast("error", result.error ?? "Failed to update");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <Textarea
          label="Bio"
          id="bio"
          {...form.register("bio")}
          error={form.formState.errors.bio?.message}
          hint={`${bioCount} / ${BIO_MAX} characters (min ${BIO_MIN})`}
          maxLength={BIO_MAX + 100}
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
