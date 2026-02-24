import type { ProfileInput } from "../lib/schemas/profile.schema";

export const updateProfile = async (data: ProfileInput) => {
  const res = await fetch("/api/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res;
};
