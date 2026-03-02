import "dotenv/config";
import { defineConfig } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

const testDir = defineBddConfig({
  features: "./tests/features/**/*.feature",
  steps: ["./tests/steps/**/*.steps.ts", "./tests/fixtures/fixtures.ts"],
});

export default defineConfig({
  testDir,
  testMatch: "**/*.spec.js",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? [["html"], ["github"]] : "html",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
  },
});
