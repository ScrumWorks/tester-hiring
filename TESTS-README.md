# E2E Test Suite

This repository contains comprehensive end-to-end (E2E) tests for the UserHub settings management application using **Playwright** and **Cucumber (BDD)** with **TypeScript**.

## Overview

- **Framework**: Playwright with playwright-bdd (Cucumber integration)
- **Language**: TypeScript
- **Test Count**: 47 scenarios across 5 feature files
- **Architecture**: Page Object Model with 3-layer structure + backend API helpers
- **Test Status**: 45 passing, 2 `@known-bug` (real app bugs, expected failures)

## Directory Structure

```
tests/
├── api/                         # Backend API helpers for test data setup
│   └── DatabaseHelper.ts       # ProfileAPI, AccountAPI, AuthAPI, DatabaseHelper
│
├── features/                    # Gherkin feature files (BDD scenarios)
│   ├── login.feature           # 7 scenarios: login validation, error handling
│   ├── profile-settings.feature # 16 scenarios: profile CRUD, direct URL navigation
│   ├── account-settings.feature # 13 scenarios: password change, account deletion
│   ├── navigation.feature       # 8 scenarios: sidebar navigation, responsive design
│   └── accessibility.feature    # 5 scenarios: WCAG 2.1 AA checks via axe-core
│
├── pages/                       # Page Object Models (reusable element locators & actions)
│   ├── LoginPage.ts            # Login form interactions
│   ├── ProfileSettingsPage.ts  # Profile settings modals (nickname, bio, DOB, location)
│   ├── AccountSettingsPage.ts  # Account settings (password, delete account)
│   ├── SidebarComponent.ts     # Navigation sidebar & mobile menu
│   └── ModalComponent.ts       # Generic modal interactions
│
├── steps/                       # Step definitions (Gherkin → code mapping)
│   ├── login.steps.ts
│   ├── profile-settings.steps.ts
│   ├── account-settings.steps.ts
│   ├── navigation.steps.ts
│   └── accessibility.steps.ts   # axe-core violation checks
│
└── fixtures/                    # Playwright BDD fixtures & test setup
    └── fixtures.ts             # Page object fixtures, database reset hooks
```

## Page Object Model Architecture

Each Page Object follows a **3-part structure** for maximum reusability:

### 1. Locators (Element References)
```typescript
readonly emailInput: Locator;
readonly submitButton: Locator;
readonly formError: Locator;
```
Locators are scoped to the page or dialog to avoid strict mode violations with Next.js parallel routes.

### 2. Atomic Actions (Single-purpose methods)
```typescript
async fillEmail(email: string) { /* ... */ }
async clickSubmit() { /* ... */ }
async expectEmailErrorVisible() { /* ... */ }
```
Each method performs exactly one action. Enables test maintainability and reusability.

### 3. Multi-step Actions (Composite workflows)
```typescript
async loginWithCredentials(email: string, password: string) {
  await this.fillEmail(email);
  await this.fillPassword(password);
  await this.clickSubmit();
}
```
Combine atomic actions into meaningful user workflows. Tests call multi-step actions for clean, readable scenarios.

### Example: LoginPage Structure
```typescript
// ── Locators ──────────────────────────────────────────────
readonly emailInput: Locator;
readonly passwordInput: Locator;
readonly submitButton: Locator;

// ── Atomic Actions ────────────────────────────────────────
async fillEmail(email: string) { ... }
async fillPassword(password: string) { ... }
async clickSubmit() { ... }

// ── Multi-step Actions ────────────────────────────────────
async loginWithCredentials(email: string, password: string) {
  await this.fillEmail(email);
  await this.fillPassword(password);
  await this.clickSubmit();
}
```

## Test Coverage

### Login Flow (login.feature) — 7 scenarios
- ✅ Successful login with valid credentials
- ✅ Failed login with invalid email
- ✅ Failed login with invalid password
- ✅ Email field validation (empty, invalid format)
- ✅ Password field validation (empty)
- ✅ Login page UI elements display correctly

### Profile Settings (profile-settings.feature) — 16 scenarios
- ✅ Update nickname (valid/invalid values)
- ✅ Update bio (validation, character count)
- ✅ Update date of birth (age validation)
- ✅ Update location (country/city selection)
- ✅ City dropdown disabled state when no country selected
- ✅ Modal interactions (open, close)
- ✅ Direct URL navigation for date-of-birth and location modals
- 🐛 Direct URL navigation for nickname and bio modals (`@known-bug` — app bug)

### Account Settings (account-settings.feature) — 13 scenarios
- ✅ Change password (validation rules, current password check)
- ✅ Delete account (confirmation dialog, typed confirmation)
- ✅ Form validation (password length, uppercase, number requirements)
- ✅ Error handling

### Navigation & Responsive (navigation.feature) — 8 scenarios
- ✅ Sidebar navigation between Profile and Account pages
- ✅ Logout functionality
- ✅ Unauthenticated user redirect to login
- ✅ Mobile menu (hamburger) interactions
- ✅ Responsive design (@mobile, @desktop tags)

### Accessibility (accessibility.feature) — 5 scenarios
- ✅ Login page: no WCAG 2.1 AA critical/serious violations
- ✅ Profile settings page: no WCAG 2.1 AA violations
- ✅ Account settings page: no WCAG 2.1 AA violations
- ✅ Nickname modal: no WCAG 2.1 AA violations
- ✅ Change password modal: no WCAG 2.1 AA violations

## Running Tests

### Prerequisites
- Node.js 20+
- npm or pnpm
- Running application (`npm run dev`)

### Setup
```bash
# Install dependencies (if not already installed)
npm install

# Install Playwright browsers
npx playwright install chromium
```

### Run All Tests
```bash
npm test
```
This command:
1. Generates BDD test files from `.feature` files via `npx bddgen`
2. Runs all 46 tests via Playwright
3. Generates an HTML report in `playwright-report/`

### Filter Tests by Tag

All scenarios are tagged for selective execution. Use `--grep` to filter:

```bash
# Run only smoke tests (critical path — ~6 scenarios)
npx playwright test --grep @smoke

# Run only login-related tests
npx playwright test --grep @login

# Run only profile settings tests
npx playwright test --grep @profile

# Run only account settings tests
npx playwright test --grep @account

# Run only navigation tests
npx playwright test --grep @navigation

# Run only accessibility checks
npx playwright test --grep @a11y

# Run only modal interaction tests
npx playwright test --grep @modal

# Run only form validation tests
npx playwright test --grep @validation

# Run mobile viewport tests only
npx playwright test --grep @mobile
```

### Tag Reference

| Tag | Description | Scope |
|-----|-------------|-------|
| `@smoke` | Core critical path — minimum set to verify app works | Scenario |
| `@login` | All login flow scenarios | Feature |
| `@profile` | All profile settings scenarios | Feature |
| `@account` | All account settings scenarios | Feature |
| `@navigation` | All navigation/responsive scenarios | Feature |
| `@a11y` | All accessibility check scenarios | Feature |
| `@modal` | Modal dialog interactions | Scenario |
| `@validation` | Form validation scenarios | Scenario |
| `@auth` | Authentication/authorization scenarios | Scenario |
| `@mobile` | Runs with mobile viewport (375×812) | Scenario |
| `@desktop` | Runs with desktop viewport (1920×1080) | Scenario |

### Run Tests with UI
```bash
npm run test:ui
```
Opens Playwright Test UI for interactive debugging and real-time test execution.

### Run Specific Test File
```bash
npx playwright test tests/features/login.feature
```

### Run Tests Matching a Pattern
```bash
# Run only login scenarios
npx playwright test --grep "Login Flow"

# Run smoke suite
npx playwright test --grep "@smoke"
```

### Run with Debugging
```bash
# Enable debug mode (opens browser inspector)
npx playwright test --debug

# View trace recordings (captures screenshots/video)
npx playwright test --trace on
```

### View Test Report
After running tests, open the HTML report:
```bash
npx playwright show-report
```

## Test Isolation & Database Reset

Tests automatically reset the application database to default state before each test via the `DatabaseHelper` class:

```typescript
// Default credentials in db.json
email: "user@test.com"
password: "Password123"

// Default profile
nickname: "testuser"
bio: ""
dateOfBirth: "1990-01-01"
country: ""
city: ""
```

The `db` fixture in `tests/fixtures/fixtures.ts` calls `DatabaseHelper.resetAll()` before every test that uses `loginPage`. The `DatabaseHelper` is a dependency of the `loginPage` fixture, ensuring reset happens first.

## Backend API Helpers (`tests/api/`)

The `DatabaseHelper` class provides direct backend access for test data setup without going through the UI:

```typescript
import { DatabaseHelper } from "../api/DatabaseHelper";

const db = new DatabaseHelper();

// Reset everything to defaults
await db.resetAll();

// Set specific profile data for a test scenario
await db.profile.update({ nickname: "custom-name", bio: "A test bio" });

// Read current backend state to verify
const profile = await db.profile.get();

// Login via API (skip UI login for non-login tests)
const token = await db.auth.login("user@test.com", "Password123");
```

### Available APIs

| Class | Methods | Endpoint |
|-------|---------|----------|
| `ProfileAPI` | `get()`, `set()`, `update()`, `reset()` | json-server `:3002/profile` |
| `AccountAPI` | `get()`, `set()`, `reset()` | json-server `:3002/account` |
| `AuthAPI` | `login()`, `logout()` | Next.js API `:3001/api/login`, `/api/logout` |
| `DatabaseHelper` | `resetAll()` + all above via `.profile`, `.account`, `.auth` | Combined |

## Configuration

### playwright.config.ts
```typescript
{
  workers: 1,                    // Serial execution (shared db.json)
  fullyParallel: false,          // No concurrent tests
  retries: 0,                    // No retries locally
  reporter: "html",             // HTML report generation
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",    // Record trace on first failure
  },
  webServer: {
    command: "npm run dev",      // Auto-start app
    url: "http://localhost:3001"
  }
}
```

## Feature File Syntax (Gherkin)

Tests use standard Gherkin BDD syntax for readability:

```gherkin
Feature: Login Flow
  As a user I want to log in to the application
  so that I can access the settings pages.

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I log in with email "user@test.com" and password "Password123"
    Then I should be redirected to the settings page
```

### Tags
- `@desktop` — Runs only on desktop viewport (1920×1080)
- `@mobile` — Runs only on mobile viewport (375×812)
- `@smoke` — Critical path (minimum set to verify app is functional)
- `@login` / `@profile` / `@account` / `@navigation` / `@a11y` — Feature suites
- `@validation` — Form validation scenarios
- `@modal` — Modal dialog interaction scenarios
- `@auth` — Authentication and authorization scenarios

## Writing New Tests

### 1. Add Scenario to .feature File
```gherkin
Scenario: My new test
  Given I am on the login page
  When I fill in the email with "test@example.com"
  Then I should see the email input
```

### 2. Implement Step in .steps.ts File
```typescript
When("I fill in the email with {string}", async ({ loginPage }, email: string) => {
  await loginPage.fillEmail(email);
});
```

### 3. Add Locator/Action to Page Object (if needed)
```typescript
// In LoginPage.ts
async fillEmail(email: string) {
  await this.emailInput.fill(email);
}
```

### 4. Regenerate & Run
```bash
npx bddgen
npm test
```

## CI/CD Integration

A GitHub Actions workflow is provided at `.github/workflows/playwright.yml`.

### Trigger

The workflow runs automatically on:
- Every **push to `main`**
- Every **pull request targeting `main`**

### Workflow Steps

1. Checkout repository
2. Set up Node.js 20 with npm cache
3. `npm ci` — install all dependencies
4. `npx playwright install chromium --with-deps` — install browser
5. `npm test` — run all 46 E2E tests
6. Upload **HTML report** as a downloadable artifact (retained 30 days)
7. Write **job summary** with test suite breakdown and artifact link

### Running Locally in CI Mode

```bash
CI=true npm test
```

In CI mode:
- `retries: 2` — automatically retries flaky tests
- `forbidOnly: true` — fails if `.only` is accidentally left in tests
- `reporter: [["html"], ["github"]]` — GitHub PR annotations + HTML report

### HTML Report

After every run the HTML report is available as an artifact named `playwright-report-{run_id}` in the **Actions → Artifacts** section of the run. A direct link is added to the **Job Summary** tab of every workflow run.

## Accessibility Testing

Accessibility checks use [`@axe-core/playwright`](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) to run automated WCAG 2.1 AA audits.

### What Is Checked

Each accessibility scenario runs `axe-core` against the live page DOM and fails if any **critical** or **serious** violations are found. Lower-severity violations (minor, moderate) are reported but do not fail the test.

### Running Accessibility Tests Only

```bash
npx playwright test --grep @a11y
```

### Interpreting Violations

When a violation is found, the error message includes:
- Violation ID (e.g. `color-contrast`, `image-alt`)
- WCAG rule description
- Link to the axe-core help page
- List of affected DOM nodes

### Adding New Accessibility Checks

1. Add a new scenario to `tests/features/accessibility.feature` with `@a11y` tag
2. Navigate to the target page/state using existing Given/When steps
3. Use `Then the page should have no critical accessibility violations`

## Known Bugs

See [BUGS.md](BUGS.md) for a full list of bugs discovered during test development, with:
- Steps to reproduce
- Expected vs. actual behavior
- Root cause analysis
- Suggested fixes

Quick summary:

| ID | Title | Severity |
|----|-------|----------|
| BUG-001 | Missing non-intercepting routes for nickname/bio (direct URL) | Low |
| BUG-002 | Remember Me checkbox has no effect | Low |
| BUG-003 | Bio maxLength 400 vs schema max 300 | Low |
| BUG-004 | Bio cannot be cleared once set | Medium |
| BUG-005 | Missing page title (a11y) | Medium |
| BUG-006 | Insufficient color contrast (a11y) | Medium |

## Troubleshooting

### Tests Hang or Timeout
- Ensure app is running: `npm run dev`
- Check that json-server is running on port 3002
- Verify no port conflicts: `lsof -i :3001 :3002`

### "Cannot find module" Errors
```bash
# Regenerate BDD files
npx bddgen

# Clear cache
rm -rf .features-gen
npx bddgen
```

### Locator Strict Mode Errors
- Locators resolve to multiple elements
- Solution: Scope to specific container (dialog, page section)
```typescript
// ❌ Resolves to 2 elements (page + modal)
this.emailInput = page.getByLabel("Email");

// ✅ Scope to dialog only
this.emailInput = page.getByRole("dialog").getByLabel("Email");
```

### Database State Issues
- Reset manually via json-server:
```bash
curl -X PUT http://localhost:3002/profile -H "Content-Type: application/json" \
  -d '{"nickname":"testuser","bio":"","dateOfBirth":"1990-01-01","country":"","city":""}'
```

## Best Practices

1. **Use Page Objects** — Never query elements directly in tests
2. **Atomic Actions** — Each method does one thing
3. **Meaningful Names** — `loginWithCredentials()` not `doThing()`
4. **Wait for State** — Always expect visibility/navigation after actions
5. **Scope Locators** — Use dialog/container scope to avoid strict mode issues
6. **Test Data** — Use fixtures for default values, not hardcoded strings
7. **Clean Up** — Database auto-resets; no manual cleanup needed

## Resources

- **Playwright Docs**: https://playwright.dev
- **Cucumber Gherkin**: https://cucumber.io/docs/gherkin/
- **playwright-bdd**: https://github.com/vitalets/playwright-bdd
- **Page Object Pattern**: https://playwright.dev/docs/pom

## Test Maintenance

- Update Page Objects when UI elements change
- Update steps when business logic changes
- Update feature files when requirements change
- Keep locators specific and scoped to avoid flakiness
- Document known bugs in `BUGS.md`; use `@known-bug` tag if the test documents a broken behavior

---

**Last Updated**: February 2026
**Test Framework**: Playwright 1.53+, playwright-bdd
**TypeScript**: 5.7+
