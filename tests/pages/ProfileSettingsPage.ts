import { type Page, type Locator, expect } from "@playwright/test";

export class ProfileSettingsPage {
  // ── Locators ──────────────────────────────────────────────
  readonly page: Page;
  readonly heading: Locator;
  readonly settingsCard: Locator;
  readonly nicknameItem: Locator;
  readonly bioItem: Locator;
  readonly dateOfBirthItem: Locator;
  readonly locationItem: Locator;

  // Nickname modal
  readonly nicknameInput: Locator;

  // Bio modal
  readonly bioTextarea: Locator;

  // Date of birth modal
  readonly dateOfBirthInput: Locator;

  // Location modal
  readonly countrySelect: Locator;
  readonly citySelect: Locator;

  // Shared modal elements
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly modalDialog: Locator;
  readonly closeModalButton: Locator;
  readonly toast: Locator;
  readonly validationError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Profile" });
    this.settingsCard = page.getByRole("list", {
      name: "Profile settings",
    });
    this.nicknameItem = page.getByRole("link", { name: /Nickname/i });
    this.bioItem = page.getByRole("link", { name: /Bio/i });
    this.dateOfBirthItem = page.getByRole("link", {
      name: /Date of birth/i,
    });
    this.locationItem = page.getByRole("link", { name: /Location/i });

    const dialog = page.getByRole("dialog");
    this.nicknameInput = dialog.getByLabel("Nickname");
    this.bioTextarea = dialog.getByLabel("Bio");
    this.dateOfBirthInput = dialog.getByLabel("Date of birth");
    this.countrySelect = dialog.getByLabel("Country");
    this.citySelect = dialog.getByLabel("City");

    this.saveButton = dialog.getByRole("button", { name: "Save" });
    this.cancelButton = dialog.getByRole("button", { name: "Cancel" });
    this.modalDialog = dialog;
    this.closeModalButton = dialog.getByRole("button", { name: "Close" });
    this.toast = page.getByRole("status");
    this.validationError = dialog.getByRole("alert");
  }

  // ── Atomic Actions ────────────────────────────────────────
  async navigate() {
    await this.page.goto("/settings/profile");
  }

  async clickNicknameItem() {
    await this.nicknameItem.click();
  }

  async clickBioItem() {
    await this.bioItem.click();
  }

  async clickDateOfBirthItem() {
    await this.dateOfBirthItem.click();
  }

  async clickLocationItem() {
    await this.locationItem.click();
  }

  async fillNickname(value: string) {
    await this.nicknameInput.clear();
    await this.nicknameInput.fill(value);
  }

  async fillBio(value: string) {
    await this.bioTextarea.clear();
    await this.bioTextarea.fill(value);
  }

  async fillDateOfBirth(value: string) {
    await this.dateOfBirthInput.fill(value);
  }

  async selectCountry(value: string) {
    await this.countrySelect.selectOption({ label: value });
  }

  async clearCountrySelection() {
    await this.countrySelect.selectOption({ value: "" });
  }

  async selectCity(value: string) {
    await this.citySelect.selectOption({ label: value });
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async clickCloseModal() {
    await this.closeModalButton.click();
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

  async expectToastWithText(text: string) {
    await expect(this.toast.filter({ hasText: text }).first()).toBeVisible();
  }

  async expectValidationError(text: string) {
    await expect(
      this.page.getByRole("alert").filter({ hasText: text }).first()
    ).toBeVisible();
  }

  async expectNicknamePreview(value: string) {
    await expect(this.nicknameItem).toContainText(value);
  }

  async expectBioPreview(value: string) {
    await expect(this.bioItem).toContainText(value);
  }

  async expectDateOfBirthPreview(value: string) {
    await expect(this.dateOfBirthItem).toContainText(value);
  }

  async expectLocationPreview(value: string) {
    await expect(this.locationItem).toContainText(value);
  }

  async waitForCitiesLoaded() {
    await expect(this.citySelect).toBeEnabled();
  }

  async expectCitySelectEnabled() {
    await expect(this.citySelect).toBeEnabled();
  }

  async expectCitySelectDisabled() {
    await expect(this.citySelect).toBeVisible();
    await expect(this.citySelect).toBeDisabled({ timeout: 10000 });
  }

  // ── Multi-step Actions ────────────────────────────────────
  async openNicknameModal() {
    await this.clickNicknameItem();
    await this.expectModalVisible();
  }

  async openBioModal() {
    await this.clickBioItem();
    await this.expectModalVisible();
  }

  async openDateOfBirthModal() {
    await this.clickDateOfBirthItem();
    await this.expectModalVisible();
  }

  async openLocationModal() {
    await this.clickLocationItem();
    await this.expectModalVisible();
  }

  async updateNickname(value: string) {
    await this.openNicknameModal();
    await this.fillNickname(value);
    await this.clickSave();
  }

  async updateBio(value: string) {
    await this.openBioModal();
    await this.fillBio(value);
    await this.clickSave();
  }

  async updateDateOfBirth(value: string) {
    await this.openDateOfBirthModal();
    await this.fillDateOfBirth(value);
    await this.clickSave();
  }

  async updateLocation(country: string, city: string) {
    await this.openLocationModal();
    await this.selectCountry(country);
    await this.waitForCitiesLoaded();
    await this.selectCity(city);
    await this.clickSave();
  }

  async navigateToNicknameDirectly() {
    await this.page.goto("/settings/profile/nickname");
    await this.expectModalVisible();
  }

  async navigateToBioDirectly() {
    await this.page.goto("/settings/profile/bio");
    await this.expectModalVisible();
  }
}
