"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { updateProfile as updateProfileInApi } from "@/lib/profile-api";
import type { ProfileInput } from "../lib/schemas/profile.schema";
import { CACHE_TAG_PROFILE } from "../const/cache-tags.const";

export const updateProfileAction = async (data: Partial<ProfileInput>) => {
  const updates: Record<string, string> = {};
  if (typeof data.nickname === "string") updates.nickname = data.nickname;
  if (typeof data.bio === "string") updates.bio = data.bio;
  if (typeof data.dateOfBirth === "string")
    updates.dateOfBirth = data.dateOfBirth;
  if (typeof data.country === "string") updates.country = data.country;
  if (typeof data.city === "string") updates.city = data.city;

  try {
    await updateProfileInApi(updates);
    revalidateTag(CACHE_TAG_PROFILE, "max");
    revalidatePath("/settings/profile");
    revalidatePath("/settings/account");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to save profile" };
  }
};
