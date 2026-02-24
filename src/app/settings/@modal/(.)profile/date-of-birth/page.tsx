import { RouteModal } from "@/components/RouteModal";
import { DateOfBirthModalContent } from "./DateOfBirthModalContent";
import { getProfileSettingsValuePreviews } from "@/features/settings/modules/profile";

export default async function DateOfBirthModalPage() {
  const valuePreviews = await getProfileSettingsValuePreviews();

  return (
    <RouteModal title="Change date of birth">
      <DateOfBirthModalContent
        defaultValues={{ dateOfBirth: valuePreviews.dateOfBirth ?? "" }}
      />
    </RouteModal>
  );
}
