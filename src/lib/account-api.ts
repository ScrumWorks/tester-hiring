/**
 * Account API client - fetches from json-server.
 * Manages email and password (stored in db.json under "account").
 */

const JSON_SERVER_URL =
  process.env.JSON_SERVER_URL ?? "http://localhost:3002";

interface Account {
  email: string;
  password: string;
}

const defaultAccount: Account = {
  email: "user@test.com",
  password: "Password123",
};

export async function getAccount(): Promise<Account> {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/account`);
    if (!res.ok) throw new Error("Failed to fetch account");
    const data = (await res.json()) as Partial<Account>;
    return { ...defaultAccount, ...data };
  } catch {
    return { ...defaultAccount };
  }
}

export async function updateAccountPassword(newPassword: string): Promise<void> {
  const res = await fetch(`${JSON_SERVER_URL}/account`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: newPassword }),
  });
  if (!res.ok) throw new Error("Failed to update password");
}

export async function resetAccount(): Promise<void> {
  try {
    await fetch(`${JSON_SERVER_URL}/account`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(defaultAccount),
    });
  } catch {
    // Ignore - json-server may not be running
  }
}
