import { NextResponse } from "next/server";
import { getProfile, updateProfile } from "@/lib/profile-api";

export async function GET() {
  const profile = await getProfile();
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { nickname, bio, dateOfBirth, country, city } = body;

  const updates: Record<string, string> = {};
  if (typeof nickname === "string") updates.nickname = nickname;
  if (typeof bio === "string") updates.bio = bio;
  if (typeof dateOfBirth === "string") updates.dateOfBirth = dateOfBirth;
  if (typeof country === "string") updates.country = country;
  if (typeof city === "string") updates.city = city;

  try {
    const profile = await updateProfile(updates);
    return NextResponse.json(profile);
  } catch {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
