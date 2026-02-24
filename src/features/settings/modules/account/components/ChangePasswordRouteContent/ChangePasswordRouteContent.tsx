"use client";

import { useDialogPageState } from "@/lib/navigation/useDialogPageState";
import { ChangePasswordFormProvider } from "../ChangePasswordForm";

export const ChangePasswordRouteContent = () => {
  const { navigateBack } = useDialogPageState({
    parentPathname: "/settings/account",
    modalPathname: "/settings/account/change-password",
  });

  return <ChangePasswordFormProvider onSuccess={navigateBack} />;
};
