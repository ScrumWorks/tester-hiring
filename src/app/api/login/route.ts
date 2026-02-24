import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAccount } from "@/lib/account-api";

const AUTH_COOKIE_NAME = "auth-token";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const account = await getAccount();
  if (email === account.email && password === account.password) {
    const token = `mock-token-${Date.now()}`;
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: "Invalid email or password" },
    { status: 401 }
  );
}
