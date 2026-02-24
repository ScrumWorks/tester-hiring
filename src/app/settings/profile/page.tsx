import {
  getProfileSettingsValuePreviews,
  ProfilePageContent,
} from "@/features/settings/modules/profile";

export default async function ProfilePage() {
  const valuePreviews = await getProfileSettingsValuePreviews();

  return <ProfilePageContent valuePreviews={valuePreviews} />;
}
