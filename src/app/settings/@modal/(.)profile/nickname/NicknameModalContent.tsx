"use client";

import { useDialogPageState } from "@/lib/navigation/useDialogPageState";
import { ChangeNicknameDialog } from "@/features/settings/modules/profile/sections/change-nickname/ChangeNicknameDialog";

interface NicknameModalContentProps {
  defaultValues: { nickname: string };
}

export function NicknameModalContent({ defaultValues }: NicknameModalContentProps) {
  const { navigateBack } = useDialogPageState({
    parentPathname: "/settings/profile",
    modalPathname: "/settings/profile/nickname",
  });

  return (
    <ChangeNicknameDialog defaultValues={defaultValues} onSuccess={navigateBack} />
  );
}
