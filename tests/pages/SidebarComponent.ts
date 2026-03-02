import { type Page, type Locator, expect } from "@playwright/test";

export class SidebarComponent {
  // ── Locators ──────────────────────────────────────────────
  readonly page: Page;
  readonly sidebar: Locator;
  readonly profileLink: Locator;
  readonly accountLink: Locator;
  readonly logoutButton: Locator;
  readonly mobileMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = page.getByRole("navigation", { name: "Settings" });
    this.profileLink = page.getByRole("link", { name: "Profile" });
    this.accountLink = page.getByRole("link", { name: "Account" });
    this.logoutButton = page.getByRole("button", { name: /log\s*out/i });
    this.mobileMenuButton = page.getByRole("button", { name: /menu/i });
  }

  // ── Atomic Actions ────────────────────────────────────────
  async clickProfile() {
    await this.profileLink.click();
  }

  async clickAccount() {
    await this.accountLink.click();
  }

  async clickLogout() {
    await this.logoutButton.click();
  }

  async clickMobileMenu() {
    await this.mobileMenuButton.click();
  }

  async expectProfileLinkVisible() {
    await expect(this.profileLink).toBeVisible();
  }

  async expectAccountLinkVisible() {
    await expect(this.accountLink).toBeVisible();
  }

  async expectLogoutButtonVisible() {
    await expect(this.logoutButton).toBeVisible();
  }

  async expectOnProfilePage() {
    await this.page.waitForURL("**/settings/profile");
  }

  async expectOnAccountPage() {
    await this.page.waitForURL("**/settings/account");
  }

  async expectOnLoginPage() {
    await this.page.waitForURL("**/login");
  }

  // ── Multi-step Actions ────────────────────────────────────
  async navigateToProfile() {
    await this.clickProfile();
    await this.expectOnProfilePage();
  }

  async navigateToAccount() {
    await this.clickAccount();
    await this.expectOnAccountPage();
  }

  async logoutAndVerifyRedirect() {
    await this.clickLogout();
    await this.expectOnLoginPage();
  }

  async openMobileMenuAndNavigateToProfile() {
    await this.clickMobileMenu();
    await this.clickProfile();
    await this.expectOnProfilePage();
  }

  async openMobileMenuAndNavigateToAccount() {
    await this.clickMobileMenu();
    await this.clickAccount();
    await this.expectOnAccountPage();
  }

  async openMobileMenuAndLogout() {
    await this.clickMobileMenu();
    await this.clickLogout();
    await this.expectOnLoginPage();
  }
}
