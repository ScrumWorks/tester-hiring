"use client";

import { SettingsListCard } from "@/features/settings/components/SettingsListCard";
import { SettingsListItem } from "@/features/settings/components/SettingsListItem";

export interface ProfileValuePreviews {
  nickname: string | null;
  bio: string | null;
  dateOfBirth: string | null;
  country: string | null;
  city: string | null;
  location: string | null;
}

interface ProfilePageContentProps {
  valuePreviews: ProfileValuePreviews;
}

export const ProfilePageContent = ({ valuePreviews }: ProfilePageContentProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>

      <SettingsListCard aria-label="Profile settings">
        <SettingsListItem
          label="Nickname"
          valuePreview={valuePreviews.nickname}
          href="/settings/profile/nickname"
        />
        <SettingsListItem
          label="Bio"
          valuePreview={valuePreviews.bio}
          href="/settings/profile/bio"
        />
        <SettingsListItem
          label="Date of birth"
          valuePreview={valuePreviews.dateOfBirth}
          href="/settings/profile/date-of-birth"
        />
        <SettingsListItem
          label="Location"
          valuePreview={valuePreviews.location}
          href="/settings/profile/location"
        />
      </SettingsListCard>
    </div>
  );
};
