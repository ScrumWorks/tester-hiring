import { createBdd } from "playwright-bdd";
import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";

const { Given, When, Then } = createBdd(test);

Given("I am using a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
});

When("I click the account link in the sidebar", async ({ sidebar }) => {
  await sidebar.clickAccount();
});

When("I click the profile link in the sidebar", async ({ sidebar }) => {
  await sidebar.clickProfile();
});

When("I click the logout button", async ({ sidebar }) => {
  await sidebar.clickLogout();
});

When("I click the mobile menu button", async ({ sidebar }) => {
  await sidebar.clickMobileMenu();
});

When(
  "I navigate to the profile settings page without logging in",
  async ({ page }) => {
    await page.goto("/settings/profile");
  }
);

When("I navigate to the root page", async ({ page }) => {
  await page.goto("/");
});

Then("I should be on the account settings page", async ({ sidebar }) => {
  await sidebar.expectOnAccountPage();
});

Then("I should be on the profile settings page", async ({ sidebar }) => {
  await sidebar.expectOnProfilePage();
});

Then("I should see the sidebar navigation", async ({ sidebar }) => {
  await sidebar.expectProfileLinkVisible();
  await sidebar.expectAccountLinkVisible();
});
