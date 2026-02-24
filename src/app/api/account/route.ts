import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAccount, updateAccountPassword, resetAccount } from "@/lib/account-api";
import { resetProfile } from "@/lib/profile-api";

const AUTH_COOKIE_NAME = "auth-token";

export async function POST(request: Request) {
  const body = await request.json();
  const { action, currentPassword, newPassword, confirmPassword } = body as {
    action: "change-password" | "delete-account";
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };

  if (action === "change-password") {
    const account = await getAccount();
    if (currentPassword !== account.password) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New passwords do not match" },
        { status: 400 }
      );
    }
    if (
      !newPassword ||
      newPassword.length < 8 ||
      !/[A-Z]/.test(newPassword) ||
      !/\d/.test(newPassword)
    ) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters and contain an uppercase letter and a number",
        },
        { status: 400 }
      );
    }
    await updateAccountPassword(newPassword);
    return NextResponse.json({ success: true });
  }

  if (action === "delete-account") {
    await resetProfile();
    await resetAccount();
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: "Invalid action" },
    { status: 400 }
  );
}
