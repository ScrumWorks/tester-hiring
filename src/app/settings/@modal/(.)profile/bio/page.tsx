import { RouteModal } from "@/components/RouteModal";
import { BioModalContent } from "./BioModalContent";
import { getProfileSettingsValuePreviews } from "@/features/settings/modules/profile";

export default async function BioModalPage() {
  const valuePreviews = await getProfileSettingsValuePreviews();

  return (
    <RouteModal title="Change bio">
      <BioModalContent defaultValues={{ bio: valuePreviews.bio ?? "" }} />
    </RouteModal>
  );
}
