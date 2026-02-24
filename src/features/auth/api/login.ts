import type { LoginInput } from "../lib/schemas/login.schema";

export const login = async (data: LoginInput) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await res.json();
  return { ok: res.ok, ...body };
};
