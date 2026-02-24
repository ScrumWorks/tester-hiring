"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useFormModalContext } from "@/components/FormModal";
import { useRouteModalContext } from "@/components/RouteModal";
import type { ChangePasswordInput } from "@/features/settings/modules/account/lib/schemas/change-password.schema";

export const ChangePasswordFormContent = () => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<ChangePasswordInput>();
  const onClose = useFormModalContext()?.onClose ?? useRouteModalContext()?.onClose;

  return (
    <>
      <div className="space-y-5">
        <Input
          label="Current password"
          id="current-password"
          type="password"
          {...register("currentPassword")}
          error={errors.currentPassword?.message}
          autoComplete="current-password"
          disabled={isSubmitting}
        />
        <Input
          label="New password"
          id="new-password"
          type="password"
          {...register("newPassword")}
          error={errors.newPassword?.message}
          autoComplete="new-password"
          disabled={isSubmitting}
        />
        <Input
          label="Confirm new password"
          id="confirm-password"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
          disabled={isSubmitting}
        />
      </div>
      <div className="flex justify-end gap-3 pt-1">
        {onClose && (
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button type="submit" isLoading={isSubmitting}>
          Change password
        </Button>
      </div>
    </>
  );
};
