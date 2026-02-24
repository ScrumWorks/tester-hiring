"use client";

import { useDialogPageState } from "@/lib/navigation/useDialogPageState";
import { ChangeDateOfBirthDialog } from "@/features/settings/modules/profile/sections/change-date-of-birth/ChangeDateOfBirthDialog";

interface DateOfBirthModalContentProps {
  defaultValues: { dateOfBirth: string };
}

export function DateOfBirthModalContent({
  defaultValues,
}: DateOfBirthModalContentProps) {
  const { navigateBack } = useDialogPageState({
    parentPathname: "/settings/profile",
    modalPathname: "/settings/profile/date-of-birth",
  });

  return (
    <ChangeDateOfBirthDialog
      defaultValues={defaultValues}
      onSuccess={navigateBack}
    />
  );
}
