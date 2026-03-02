import { createBdd } from "playwright-bdd";
import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";

const { Given, When, Then } = createBdd(test);

Given("I am logged in as the default user", async ({ loginPage }) => {
  await loginPage.loginAsDefaultUser();
});

Given("I am on the profile settings page", async ({ profileSettingsPage }) => {
  await profileSettingsPage.navigate();
});

Then("I should see the profile heading", async ({ profileSettingsPage }) => {
  await profileSettingsPage.expectHeadingVisible();
});

Then(
  "I should see the nickname settings item",
  async ({ profileSettingsPage }) => {
    await expect(profileSettingsPage.nicknameItem).toBeVisible();
  }
);

Then("I should see the bio settings item", async ({ profileSettingsPage }) => {
  await expect(profileSettingsPage.bioItem).toBeVisible();
});

Then(
  "I should see the date of birth settings item",
  async ({ profileSettingsPage }) => {
    await expect(profileSettingsPage.dateOfBirthItem).toBeVisible();
  }
);

Then(
  "I should see the location settings item",
  async ({ profileSettingsPage }) => {
    await expect(profileSettingsPage.locationItem).toBeVisible();
  }
);

When("I open the nickname modal", async ({ profileSettingsPage }) => {
  await profileSettingsPage.openNicknameModal();
});

When("I open the bio modal", async ({ profileSettingsPage }) => {
  await profileSettingsPage.openBioModal();
});

When("I open the date of birth modal", async ({ profileSettingsPage }) => {
  await profileSettingsPage.openDateOfBirthModal();
});

When("I open the location modal", async ({ profileSettingsPage }) => {
  await profileSettingsPage.openLocationModal();
});

When(
  "I fill in the nickname with {string}",
  async ({ profileSettingsPage }, value: string) => {
    await profileSettingsPage.fillNickname(value);
  }
);

When(
  "I fill in the bio with {string}",
  async ({ profileSettingsPage }, value: string) => {
    await profileSettingsPage.fillBio(value);
  }
);

When(
  "I fill in the date of birth with {string}",
  async ({ profileSettingsPage }, value: string) => {
    await profileSettingsPage.fillDateOfBirth(value);
  }
);

When(
  "I select country {string}",
  async ({ profileSettingsPage }, value: string) => {
    await profileSettingsPage.selectCountry(value);
  }
);

When("I wait for cities to load", async ({ profileSettingsPage }) => {
  await profileSettingsPage.waitForCitiesLoaded();
});

When("I clear the country selection", async ({ profileSettingsPage }) => {
  await profileSettingsPage.clearCountrySelection();
});

When(
  "I select city {string}",
  async ({ profileSettingsPage }, value: string) => {
    await profileSettingsPage.selectCity(value);
  }
);

When("I click save", async ({ profileSettingsPage }) => {
  await profileSettingsPage.clickSave();
});

When("I close the modal", async ({ profileSettingsPage }) => {
  await profileSettingsPage.clickCloseModal();
});

Then(
  "I should see a success toast message",
  async ({ page }) => {
    await expect(
      page.getByRole("status").filter({ hasText: /updated|successfully|saved/i }).first()
    ).toBeVisible();
  }
);

Then(
  "the nickname preview should show {string}",
  async ({ profileSettingsPage }, value: string) => {
    await profileSettingsPage.expectNicknamePreview(value);
  }
);

Then(
  "I should see a validation error about minimum length",
  async ({ profileSettingsPage }) => {
    await profileSettingsPage.expectValidationError("must be");
  }
);

Then(
  "I should see a validation error about allowed characters",
  async ({ profileSettingsPage }) => {
    await profileSettingsPage.expectValidationError("can only contain");
  }
);

Then(
  "I should see a validation error about age",
  async ({ profileSettingsPage }) => {
    await profileSettingsPage.expectValidationError("18");
  }
);

Then(
  "the city dropdown should be disabled",
  async ({ profileSettingsPage }) => {
    await profileSettingsPage.expectCitySelectDisabled();
  }
);

Then("the modal should be closed", async ({ profileSettingsPage }) => {
  await profileSettingsPage.expectModalHidden();
});

Then(
  "I should see the nickname modal",
  async ({ profileSettingsPage }) => {
    await profileSettingsPage.expectModalVisible();
  }
);

When(
  "I navigate directly to the nickname settings URL",
  async ({ page }) => {
    await page.goto("/settings/profile/nickname");
  }
);

When(
  "I navigate directly to the bio settings URL",
  async ({ page }) => {
    await page.goto("/settings/profile/bio");
  }
);

When(
  "I navigate directly to the date of birth settings URL",
  async ({ page }) => {
    await page.goto("/settings/profile/date-of-birth");
  }
);

When(
  "I navigate directly to the location settings URL",
  async ({ page }) => {
    await page.goto("/settings/profile/location");
  }
);

Then(
  "I should see the bio modal",
  async ({ profileSettingsPage }) => {
    await profileSettingsPage.expectModalVisible();
  }
);

Then(
  "I should see the date of birth modal",
  async ({ profileSettingsPage }) => {
    await profileSettingsPage.expectModalVisible();
  }
);

Then(
  "I should see the location modal",
  async ({ profileSettingsPage }) => {
    await profileSettingsPage.expectModalVisible();
  }
);
