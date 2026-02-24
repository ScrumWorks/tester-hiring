import { unstable_cache } from "next/cache";
import { getProfile } from "./get-profile";
import { COUNTRIES } from "../const/countries.const";
import { CACHE_TAG_PROFILE } from "../const/cache-tags.const";

const getProfileSettingsValuePreviewsUncached = async () => {
  const profile = await getProfile();

  const countryLabel =
    COUNTRIES.find((c) => c.value === profile.country)?.label ?? null;
  const location =
    [countryLabel, profile.city].filter(Boolean).join(", ") || null;

  return {
    nickname: profile.nickname || null,
    bio: profile.bio || null,
    dateOfBirth: profile.dateOfBirth || null,
    country: profile.country || null,
    city: profile.city || null,
    location: location || "Not set",
  };
};

export const getProfileSettingsValuePreviews = unstable_cache(
  getProfileSettingsValuePreviewsUncached,
  ["profile-settings-value-previews"],
  { tags: [CACHE_TAG_PROFILE] }
);
