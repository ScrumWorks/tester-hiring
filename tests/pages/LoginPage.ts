import { type Page, type Locator, expect } from "@playwright/test";
import { DEFAULT_ACCOUNT } from "../api/DatabaseHelper";

export class LoginPage {
  // ── Locators ──────────────────────────────────────────────
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly submitButton: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly formError: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.rememberMeCheckbox = page.getByLabel("Remember me");
    this.submitButton = page.getByRole("button", { name: "Sign in" });
    this.emailError = page.getByRole("alert").filter({ hasText: /email/i });
    this.passwordError = page
      .getByRole("alert")
      .filter({ hasText: /password/i });
    this.formError = page.getByRole("alert");
    this.heading = page.getByRole("heading", { name: "Sign in" });
  }

  // ── Atomic Actions ────────────────────────────────────────
  async navigate() {
    await this.page.goto("/login");
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async toggleRememberMe() {
    await this.rememberMeCheckbox.check();
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async blurEmail() {
    await this.emailInput.blur();
  }

  async blurPassword() {
    await this.passwordInput.blur();
  }

  async expectHeadingVisible() {
    await expect(this.heading).toBeVisible();
  }

  async expectEmailErrorVisible(text?: string) {
    if (text) {
      await expect(
        this.page.getByRole("alert").filter({ hasText: text })
      ).toBeVisible();
    } else {
      await expect(this.emailError).toBeVisible();
    }
  }

  async expectPasswordErrorVisible(text?: string) {
    if (text) {
      await expect(
        this.page.getByRole("alert").filter({ hasText: text })
      ).toBeVisible();
    } else {
      await expect(this.passwordError).toBeVisible();
    }
  }

  async expectFormErrorVisible(text?: string) {
    if (text) {
      await expect(
        this.page.getByRole("alert").filter({ hasText: text })
      ).toBeVisible();
    } else {
      await expect(this.formError.first()).toBeVisible();
    }
  }

  async expectNoErrors() {
    await expect(this.formError).toHaveCount(0);
  }

  async expectRedirectedToSettings() {
    await this.page.waitForURL("**/settings/profile");
  }

  async expectSubmitDisabled() {
    await expect(this.submitButton).toBeDisabled();
  }

  async expectSubmitEnabled() {
    await expect(this.submitButton).toBeEnabled();
  }

  // ── Multi-step Actions ────────────────────────────────────
  async loginWithCredentials(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSubmit();
  }

  async loginAsDefaultUser() {
    await this.navigate();
    await this.loginWithCredentials(DEFAULT_ACCOUNT.email, DEFAULT_ACCOUNT.password);
    await this.expectRedirectedToSettings();
  }

  async attemptLoginWithInvalidCredentials(email: string, password: string) {
    await this.navigate();
    await this.loginWithCredentials(email, password);
  }

  async triggerEmailValidation() {
    await this.fillEmail("");
    await this.blurEmail();
  }

  async triggerPasswordValidation() {
    await this.fillPassword("");
    await this.blurPassword();
  }
}
