/**
 * Profile API client - fetches from json-server.
 * Requires json-server running (e.g. via `pnpm dev`).
 */

const JSON_SERVER_URL =
  process.env.JSON_SERVER_URL ?? "http://localhost:3002";

interface Profile {
  nickname: string;
  bio: string;
  dateOfBirth: string;
  country: string;
  city: string;
}

const defaultProfile: Profile = {
  nickname: "testuser",
  bio: "",
  dateOfBirth: "1990-01-01",
  country: "",
  city: "",
};

async function fetchProfile(): Promise<Profile> {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/profile`);
    if (!res.ok) throw new Error("Failed to fetch profile");
    const data = (await res.json()) as Partial<Profile>;
    return { ...defaultProfile, ...data };
  } catch {
    return { ...defaultProfile };
  }
}

async function patchProfile(updates: Partial<Profile>): Promise<Profile> {
  try {
    const current = await fetchProfile();
    const updated = { ...current, ...updates };
    const res = await fetch(`${JSON_SERVER_URL}/profile`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update profile");
    const data = (await res.json()) as Partial<Profile>;
    return { ...defaultProfile, ...data };
  } catch {
    throw new Error("Failed to update profile");
  }
}

export async function getProfile(): Promise<Profile> {
  return fetchProfile();
}

export async function updateProfile(updates: Partial<Profile>): Promise<Profile> {
  return patchProfile(updates);
}

export async function resetProfile(): Promise<void> {
  try {
    await fetch(`${JSON_SERVER_URL}/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(defaultProfile),
    });
  } catch {
    // Ignore - json-server may not be running
  }
}
