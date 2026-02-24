import { cookies } from "next/headers";

const AUTH_COOKIE_NAME = "auth-token";

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);
  return !!token?.value;
}
