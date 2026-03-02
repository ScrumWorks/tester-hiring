import { type Page, type Locator, expect } from "@playwright/test";

export class ModalComponent {
  // ── Locators ──────────────────────────────────────────────
  readonly page: Page;
  readonly modalOverlay: Locator;
  readonly modalContent: Locator;
  readonly closeButton: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalOverlay = page.locator("[data-modal-overlay]");
    this.modalContent = page.getByRole("dialog");
    this.closeButton = page.getByRole("button", { name: "Close" });
    this.saveButton = page.getByRole("button", { name: "Save" });
  }

  // ── Atomic Actions ────────────────────────────────────────
  async clickClose() {
    await this.closeButton.click();
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async expectModalVisible() {
    await expect(this.modalContent).toBeVisible();
  }

  async expectModalHidden() {
    await expect(this.modalContent).toBeHidden();
  }

  // ── Multi-step Actions ────────────────────────────────────
  async closeAndVerifyHidden() {
    await this.clickClose();
    await this.expectModalHidden();
  }
}
