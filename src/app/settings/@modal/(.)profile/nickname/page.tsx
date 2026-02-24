import { RouteModal } from "@/components/RouteModal";
import { NicknameModalContent } from "./NicknameModalContent";
import { getProfileSettingsValuePreviews } from "@/features/settings/modules/profile";

export default async function NicknameModalPage() {
  const valuePreviews = await getProfileSettingsValuePreviews();

  return (
    <RouteModal title="Change nickname">
      <NicknameModalContent
        defaultValues={{ nickname: valuePreviews.nickname ?? "" }}
      />
    </RouteModal>
  );
}
