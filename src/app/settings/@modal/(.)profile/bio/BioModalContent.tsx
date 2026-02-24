"use client";

import { useDialogPageState } from "@/lib/navigation/useDialogPageState";
import { ChangeBioDialog } from "@/features/settings/modules/profile/sections/change-bio/ChangeBioDialog";

interface BioModalContentProps {
  defaultValues: { bio: string };
}

export function BioModalContent({ defaultValues }: BioModalContentProps) {
  const { navigateBack } = useDialogPageState({
    parentPathname: "/settings/profile",
    modalPathname: "/settings/profile/bio",
  });

  return <ChangeBioDialog defaultValues={defaultValues} onSuccess={navigateBack} />;
}
