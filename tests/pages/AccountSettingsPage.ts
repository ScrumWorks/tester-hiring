import { type Page, type Locator, expect } from "@playwright/test";

export class AccountSettingsPage {
  // ── Locators ──────────────────────────────────────────────
  readonly page: Page;
  readonly heading: Locator;
  readonly settingsCard: Locator;
  readonly changePasswordItem: Locator;

  // Change password form
  readonly currentPasswordInput: Locator;
  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly changePasswordButton: Locator;

  // Delete account
  readonly deleteAccountButton: Locator;
  readonly confirmDialog: Locator;
  readonly confirmInput: Locator;
  readonly confirmDeleteButton: Locator;
  readonly cancelDeleteButton: Locator;

  // Shared
  readonly cancelButton: Locator;
  readonly modalDialog: Locator;
  readonly toast: Locator;
  readonly validationError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Account", level: 1 });
    this.settingsCard = page.getByRole("list", {
      name: "Account settings",
    });
    this.changePasswordItem = page.getByRole("link", {
      name: /Change password/i,
    });

    const dialog = page.getByRole("dialog");
    this.currentPasswordInput = dialog.getByLabel("Current password");
    this.newPasswordInput = dialog.getByLabel("New password", { exact: true });
    this.confirmPasswordInput = dialog.getByLabel("Confirm new password");
    this.changePasswordButton = dialog.getByRole("button", {
      name: "Change password",
    });

    this.deleteAccountButton = page.getByRole("button", {
      name: "Delete account",
      exact: true,
    });
    this.confirmDialog = page.getByRole("dialog");
    this.confirmInput = page.getByLabel(/Type .* to confirm/i);
    this.confirmDeleteButton = page
      .getByRole("dialog")
      .getByRole("button", { name: "Delete account" });
    this.cancelDeleteButton = dialog.getByRole("button", { name: "Cancel" });

    this.cancelButton = dialog.getByRole("button", { name: "Cancel" });
    this.modalDialog = dialog;
    this.toast = page.getByRole("status");
    this.validationError = dialog.getByRole("alert");
  }

  // ── Atomic Actions ────────────────────────────────────────
  async navigate() {
    await this.page.goto("/settings/account");
  }

  async clickChangePasswordItem() {
    await this.changePasswordItem.click();
  }

  async fillCurrentPassword(value: string) {
    await this.currentPasswordInput.fill(value);
  }

  async fillNewPassword(value: string) {
    await this.newPasswordInput.fill(value);
  }

  async fillConfirmPassword(value: string) {
    await this.confirmPasswordInput.fill(value);
  }

  async clickChangePasswordSubmit() {
    await this.changePasswordButton.click();
  }

  async clickDeleteAccount() {
    await this.deleteAccountButton.click();
  }

  async fillConfirmationText(text: string) {
    await this.confirmInput.fill(text);
  }

  async clickConfirmDelete() {
    await this.confirmDeleteButton.click();
  }

  async clickCancelDelete() {
    await this.cancelDeleteButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async expectHeadingVisible() {
    await expect(this.heading).toBeVisible();
  }

  async expectModalVisible() {
    await expect(this.modalDialog).toBeVisible();
  }

  async expectModalHidden() {
    await expect(this.modalDialog).toBeHidden();
  }

  async expectConfirmDialogVisible() {
    await expect(this.confirmDialog).toBeVisible();
  }

  async expectToastWithText(text: string) {
    await expect(this.toast.filter({ hasText: text }).first()).toBeVisible();
  }

  async expectValidationError(text: string) {
    await expect(
      this.page.getByRole("alert").filter({ hasText: text }).first()
    ).toBeVisible();
  }

  async expectOnLoginPage() {
    await this.page.waitForURL("**/login");
  }

  async expectConfirmDeleteDisabled() {
    await expect(this.confirmDeleteButton).toBeDisabled();
  }

  async expectConfirmDeleteEnabled() {
    await expect(this.confirmDeleteButton).toBeEnabled();
  }

  // ── Multi-step Actions ────────────────────────────────────
  async openChangePasswordForm() {
    await this.clickChangePasswordItem();
    await this.expectModalVisible();
  }

  async changePassword(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    await this.openChangePasswordForm();
    await this.fillCurrentPassword(currentPassword);
    await this.fillNewPassword(newPassword);
    await this.fillConfirmPassword(confirmPassword);
    await this.clickChangePasswordSubmit();
  }

  async openDeleteConfirmDialog() {
    await this.clickDeleteAccount();
    await this.expectConfirmDialogVisible();
  }

  async deleteAccountWithConfirmation() {
    await this.openDeleteConfirmDialog();
    await this.fillConfirmationText("DELETE");
    await this.clickConfirmDelete();
  }

  async attemptDeleteWithWrongConfirmation(text: string) {
    await this.openDeleteConfirmDialog();
    await this.fillConfirmationText(text);
  }

  async navigateToChangePasswordDirectly() {
    await this.page.goto("/settings/account/change-password");
    await this.expectModalVisible();
  }
}
