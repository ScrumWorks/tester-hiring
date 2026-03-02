/**
 * API helpers for backend-driven test setup and verification.
 *
 * These classes wrap the json-server (port 3002) and Next.js API (port 3001)
 * endpoints to enable fast test data manipulation without going through the UI.
 *
 * Usage:
 *   - Reset database state before tests (test isolation)
 *   - Pre-populate data for specific test scenarios
 *   - Verify backend state after UI actions
 *   - Login via API to skip the login UI in non-login tests
 */

const JSON_SERVER_URL = process.env.JSON_SERVER_URL || "http://localhost:3002";
const APP_API_URL = `${process.env.BASE_URL || "http://localhost:3001"}/api`;

// ── Types ────────────────────────────────────────────────────

export interface ProfileData {
  nickname: string;
  bio: string;
  dateOfBirth: string;
  country: string;
  city: string;
}

export interface AccountData {
  email: string;
  password: string;
}

// ── Default test data ────────────────────────────────────────

export const DEFAULT_PROFILE: ProfileData = {
  nickname: "testuser",
  bio: "",
  dateOfBirth: "1990-01-01",
  country: "",
  city: "",
};

export const DEFAULT_ACCOUNT: AccountData = {
  email: process.env.TEST_USER_EMAIL || "user@test.com",
  password: process.env.TEST_USER_PASSWORD || "Password123",
};

// ── ProfileAPI ───────────────────────────────────────────────

export class ProfileAPI {
  /**
   * Get current profile data from json-server.
   */
  async get(): Promise<ProfileData> {
    const res = await fetch(`${JSON_SERVER_URL}/profile`);
    return res.json();
  }

  /**
   * Replace profile data entirely via json-server.
   */
  async set(data: ProfileData): Promise<void> {
    await fetch(`${JSON_SERVER_URL}/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  /**
   * Partially update profile fields via json-server.
   */
  async update(data: Partial<ProfileData>): Promise<void> {
    await fetch(`${JSON_SERVER_URL}/profile`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  /**
   * Reset profile to default test state.
   */
  async reset(): Promise<void> {
    await this.set(DEFAULT_PROFILE);
  }
}

// ── AccountAPI ───────────────────────────────────────────────

export class AccountAPI {
  /**
   * Get current account data from json-server.
   */
  async get(): Promise<AccountData> {
    const res = await fetch(`${JSON_SERVER_URL}/account`);
    return res.json();
  }

  /**
   * Replace account data entirely via json-server.
   */
  async set(data: AccountData): Promise<void> {
    await fetch(`${JSON_SERVER_URL}/account`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  /**
   * Reset account to default test credentials.
   */
  async reset(): Promise<void> {
    await this.set(DEFAULT_ACCOUNT);
  }
}

// ── AuthAPI ──────────────────────────────────────────────────

export class AuthAPI {
  /**
   * Login via the Next.js API and return the auth cookie value.
   * Useful for skipping the login UI in non-login tests.
   */
  async login(
    email: string = DEFAULT_ACCOUNT.email,
    password: string = DEFAULT_ACCOUNT.password,
  ): Promise<string | null> {
    const res = await fetch(`${APP_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const setCookie = res.headers.get("set-cookie");
    if (!setCookie) return null;
    const match = setCookie.match(/auth-token=([^;]+)/);
    return match ? match[1] : null;
  }

  /**
   * Logout via the Next.js API.
   */
  async logout(): Promise<void> {
    await fetch(`${APP_API_URL}/logout`, { method: "POST" });
  }
}

// ── DatabaseHelper ───────────────────────────────────────────

export class DatabaseHelper {
  readonly profile = new ProfileAPI();
  readonly account = new AccountAPI();
  readonly auth = new AuthAPI();

  /**
   * Reset the entire database to default test state.
   * Called before each test for isolation.
   */
  async resetAll(): Promise<void> {
    await Promise.all([this.profile.reset(), this.account.reset()]);
  }
}
