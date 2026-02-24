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
  changeNicknameSchema,
  type ChangeNicknameInput,
} from "./lib/schemas/change-nickname.schema";

interface ChangeNicknameDialogProps {
  defaultValues: { nickname: string };
  onSuccess?: () => void;
}

export const ChangeNicknameDialog = ({
  defaultValues,
  onSuccess,
}: ChangeNicknameDialogProps) => {
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

  const form = useForm<ChangeNicknameInput>({
    resolver: zodResolver(changeNicknameSchema),
    mode: "onBlur",
    defaultValues: { nickname: defaultValues.nickname },
  });

  const onSubmit = async (data: ChangeNicknameInput) => {
    const result = await updateProfileAction(data);
    if (result.success) {
      showToast("success", "Nickname updated");
      handleSuccess();
    } else {
      showToast("error", result.error ?? "Failed to update");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Nickname"
          id="nickname"
          {...form.register("nickname")}
          error={form.formState.errors.nickname?.message}
          placeholder="3-20 characters, letters, numbers, underscores only"
          maxLength={20}
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
