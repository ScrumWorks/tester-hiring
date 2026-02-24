import { NextResponse } from "next/server";

const CITIES_BY_COUNTRY: Record<string, string[]> = {
  US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
  UK: ["London", "Manchester", "Birmingham", "Leeds", "Liverpool"],
  DE: ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt"],
  FR: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"],
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");

  if (!country) {
    return NextResponse.json(
      { error: "Country is required" },
      { status: 400 }
    );
  }

  const cities = CITIES_BY_COUNTRY[country] ?? [];
  return NextResponse.json({ cities });
}
