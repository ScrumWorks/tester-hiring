import { createBdd } from "playwright-bdd";
import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";

const { Given, When, Then } = createBdd(test);

Given(
  "I am on the account settings page",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.navigate();
  }
);

Then("I should see the account heading", async ({ accountSettingsPage }) => {
  await accountSettingsPage.expectHeadingVisible();
});

Then(
  "I should see the change password item",
  async ({ accountSettingsPage }) => {
    await expect(accountSettingsPage.changePasswordItem).toBeVisible();
  }
);

Then(
  "I should see the delete account button",
  async ({ accountSettingsPage }) => {
    await expect(accountSettingsPage.deleteAccountButton).toBeVisible();
  }
);

When("I open the change password form", async ({ accountSettingsPage }) => {
  await accountSettingsPage.openChangePasswordForm();
});

When(
  "I fill in current password with {string}",
  async ({ accountSettingsPage }, value: string) => {
    await accountSettingsPage.fillCurrentPassword(value);
  }
);

When(
  "I fill in new password with {string}",
  async ({ accountSettingsPage }, value: string) => {
    await accountSettingsPage.fillNewPassword(value);
  }
);

When(
  "I fill in confirm password with {string}",
  async ({ accountSettingsPage }, value: string) => {
    await accountSettingsPage.fillConfirmPassword(value);
  }
);

When(
  "I click the change password button",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.clickChangePasswordSubmit();
  }
);

When("I click the delete account button", async ({ accountSettingsPage }) => {
  await accountSettingsPage.clickDeleteAccount();
});

When(
  "I type {string} in the confirmation input",
  async ({ accountSettingsPage }, text: string) => {
    await accountSettingsPage.fillConfirmationText(text);
  }
);

When("I click the confirm delete button", async ({ accountSettingsPage }) => {
  await accountSettingsPage.clickConfirmDelete();
});

Then(
  "I should see the delete confirmation dialog",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.expectConfirmDialogVisible();
  }
);

Then(
  "the confirm delete button should be disabled",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.expectConfirmDeleteDisabled();
  }
);

Then(
  "I should be redirected to the login page",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.expectOnLoginPage();
  }
);

Then(
  "I should see a form error about incorrect password",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.expectValidationError("incorrect");
  }
);

Then(
  "I should see a validation error about password length",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.expectValidationError("8");
  }
);

Then(
  "I should see a validation error about uppercase",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.expectValidationError("uppercase");
  }
);

Then(
  "I should see a validation error about number",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.expectValidationError("number");
  }
);

Then(
  "I should see a validation error about password match",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.expectValidationError("match");
  }
);

When(
  "I navigate directly to the change password URL",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.navigateToChangePasswordDirectly();
  }
);

Then(
  "I should see the change password form",
  async ({ accountSettingsPage }) => {
    await accountSettingsPage.expectModalVisible();
  }
);
