import { createBdd } from "playwright-bdd";
import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";

const { Given, When, Then } = createBdd(test);

Given("I am on the login page", async ({ loginPage }) => {
  await loginPage.navigate();
});

When(
  "I log in with email {string} and password {string}",
  async ({ loginPage }, email: string, password: string) => {
    await loginPage.loginWithCredentials(email, password);
  }
);

When("I clear the email field and blur", async ({ loginPage }) => {
  await loginPage.triggerEmailValidation();
});

When("I clear the password field and blur", async ({ loginPage }) => {
  await loginPage.triggerPasswordValidation();
});

When(
  "I fill in the email with {string}",
  async ({ loginPage }, email: string) => {
    await loginPage.fillEmail(email);
  }
);

When("I blur the email field", async ({ loginPage }) => {
  await loginPage.blurEmail();
});

Then("I should be redirected to the settings page", async ({ loginPage }) => {
  await loginPage.expectRedirectedToSettings();
});

Then("I should see a form error message", async ({ loginPage }) => {
  await loginPage.expectFormErrorVisible();
});

Then("I should see an email validation error", async ({ loginPage }) => {
  await loginPage.expectEmailErrorVisible();
});

Then("I should see a password validation error", async ({ loginPage }) => {
  await loginPage.expectPasswordErrorVisible();
});

Then("I should see the sign in heading", async ({ loginPage }) => {
  await loginPage.expectHeadingVisible();
});

Then("I should see the email input", async ({ loginPage }) => {
  await expect(loginPage.emailInput).toBeVisible();
});

Then("I should see the password input", async ({ loginPage }) => {
  await expect(loginPage.passwordInput).toBeVisible();
});

Then("I should see the remember me checkbox", async ({ loginPage }) => {
  await expect(loginPage.rememberMeCheckbox).toBeVisible();
});

Then("I should see the sign in button", async ({ loginPage }) => {
  await expect(loginPage.submitButton).toBeVisible();
});
