# Candidate Tasks — Playwright E2E Testing

This document describes the tasks you need to complete. Clone the repository, implement the tests as specified, and submit your solution as a pull request.

## Prerequisites

- Node.js 20+
- npm or pnpm
- Familiarity with Playwright and TypeScript

## Test Credentials

Credentials are stored in `db.json` and can be changed via the app. Initial values:

- **Email:** `user@test.com`
- **Password:** `Password123`

## Task 1: Login Flow Tests (Required)

Write E2E tests covering the login page at `/login`.

## Task 2: Profile Settings Tests (Required)

Write E2E tests covering the profile settings page at `/settings/profile`.

## Task 3: Account Settings Tests (Required)

Write E2E tests covering the account settings page at `/settings/account`.

## Task 4: Responsive & Navigation Tests (Required)

Write E2E tests covering responsive behavior and navigation.

## Task 5: CI Pipeline (Bonus)

Create a GitHub Actions workflow that runs the Playwright tests on every pull request to `main`:

- The workflow should install dependencies, build the app, and run the full test suite
- Playwright test results should be visible in the PR (e.g. as a check, summary, or artifact)
- The workflow should upload the Playwright HTML report as an artifact on failure
- Tests should run in a CI-appropriate configuration (consider browser installation, workers, retries)

## Task 6: Test Infrastructure (Bonus)

- Create reusable page helpers or fixtures
- Add basic accessibility checks (axe-core or manual)
- Demonstrate proper test isolation
- Add meaningful test descriptions/tags

## Submission

1. Create a branch for your work
2. Implement all required tasks (Tasks 1–4)
3. Optionally include Tasks 5 and 6
4. Ensure all tests pass locally: `npm run test`
5. Submit a pull request with a clear description of your approach

## Notes

- The app uses **React Hook Form** with **Zod** (via `zodResolver`) for client-side validation. Forms use `mode: "onBlur"` and display error messages via `role="alert"` elements.
- Settings modals use **Next.js parallel routes** and **intercepting routes**. Each form has its own route (e.g. `/settings/profile/nickname`, `/settings/profile/bio`). When clicked from the profile page, the modal opens via an intercepting route that overlays the current page. When navigated to directly (e.g. via URL or page refresh), the modal should also open and display the form. See [Next.js Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#modals) and [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes) for the pattern.
- The app is intentionally minimal. Use the locators and patterns you consider best practice.
- Organize your test files in a way that makes sense to you.
- Document any assumptions or trade-offs in your PR description.

