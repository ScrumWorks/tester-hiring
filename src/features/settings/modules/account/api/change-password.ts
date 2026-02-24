import type { ChangePasswordInput } from "../lib/schemas/change-password.schema";

export const changePassword = async (data: ChangePasswordInput) => {
  const res = await fetch("/api/account", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "change-password",
      ...data,
    }),
  });
  return res;
};
