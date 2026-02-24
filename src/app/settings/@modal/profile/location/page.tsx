import { RouteModal } from "@/components/RouteModal";
import { ChangeLocationDialog } from "@/features/settings/modules/profile/sections/change-location/ChangeLocationDialog";
import { getProfileSettingsValuePreviews } from "@/features/settings/modules/profile";

export default async function LocationModalPage() {
  const valuePreviews = await getProfileSettingsValuePreviews();

  return (
    <RouteModal title="Change location">
      <ChangeLocationDialog
        defaultValues={{
          country: valuePreviews.country ?? "",
          city: valuePreviews.city ?? "",
        }}
      />
    </RouteModal>
  );
}
