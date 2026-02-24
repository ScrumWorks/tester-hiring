"use client";

import { useDialogPageState } from "@/lib/navigation/useDialogPageState";
import { ChangeLocationDialog } from "@/features/settings/modules/profile/sections/change-location/ChangeLocationDialog";

interface LocationModalContentProps {
  defaultValues: { country: string; city: string };
}

export function LocationModalContent({ defaultValues }: LocationModalContentProps) {
  const { navigateBack } = useDialogPageState({
    parentPathname: "/settings/profile",
    modalPathname: "/settings/profile/location",
  });

  return (
    <ChangeLocationDialog defaultValues={defaultValues} onSuccess={navigateBack} />
  );
}
