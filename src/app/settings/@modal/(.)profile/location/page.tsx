import { RouteModal } from "@/components/RouteModal";
import { LocationModalContent } from "./LocationModalContent";
import { getProfileSettingsValuePreviews } from "@/features/settings/modules/profile";

export default async function LocationModalPage() {
  const valuePreviews = await getProfileSettingsValuePreviews();

  return (
    <RouteModal title="Change location">
      <LocationModalContent
        defaultValues={{
          country: valuePreviews.country ?? "",
          city: valuePreviews.city ?? "",
        }}
      />
    </RouteModal>
  );
}
