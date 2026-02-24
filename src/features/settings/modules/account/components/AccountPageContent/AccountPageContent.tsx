"use client";

import { SettingsListCard } from "@/features/settings/components/SettingsListCard";
import { SettingsListItem } from "@/features/settings/components/SettingsListItem";
import { DeleteAccountSection } from "../DeleteAccountSection";

export const AccountPageContent = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">Account</h1>

      <SettingsListCard aria-label="Account settings">
        <SettingsListItem
          label="Change password"
          valuePreview="••••••••"
          href="/settings/account/change-password"
        />
      </SettingsListCard>

      <DeleteAccountSection />
    </div>
  );
};
