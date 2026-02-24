import { RouteModal } from "@/components/RouteModal";
import { ChangeDateOfBirthDialog } from "@/features/settings/modules/profile/sections/change-date-of-birth/ChangeDateOfBirthDialog";
import { getProfileSettingsValuePreviews } from "@/features/settings/modules/profile";

export default async function DateOfBirthModalPage() {
  const valuePreviews = await getProfileSettingsValuePreviews();

  return (
    <RouteModal title="Change date of birth">
      <ChangeDateOfBirthDialog
        defaultValues={{ dateOfBirth: valuePreviews.dateOfBirth ?? "" }}
      />
    </RouteModal>
  );
}
