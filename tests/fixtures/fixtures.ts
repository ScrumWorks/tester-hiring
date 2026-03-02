import { test as base } from "playwright-bdd";
import { LoginPage } from "../pages/LoginPage";
import { ProfileSettingsPage } from "../pages/ProfileSettingsPage";
import { AccountSettingsPage } from "../pages/AccountSettingsPage";
import { SidebarComponent } from "../pages/SidebarComponent";
import { ModalComponent } from "../pages/ModalComponent";
import { DatabaseHelper } from "../api/DatabaseHelper";

export const test = base.extend<{
  db: DatabaseHelper;
  loginPage: LoginPage;
  profileSettingsPage: ProfileSettingsPage;
  accountSettingsPage: AccountSettingsPage;
  sidebar: SidebarComponent;
  modal: ModalComponent;
}>({
  db: async ({}, use) => {
    const db = new DatabaseHelper();
    await db.resetAll();
    await use(db);
  },
  loginPage: async ({ page, db }, use) => {
    void db; // ensure db fixture runs first (reset before each test)
    await use(new LoginPage(page));
  },
  profileSettingsPage: async ({ page }, use) => {
    await use(new ProfileSettingsPage(page));
  },
  accountSettingsPage: async ({ page }, use) => {
    await use(new AccountSettingsPage(page));
  },
  sidebar: async ({ page }, use) => {
    await use(new SidebarComponent(page));
  },
  modal: async ({ page }, use) => {
    await use(new ModalComponent(page));
  },
});
