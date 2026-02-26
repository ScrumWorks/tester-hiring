# Candidate Tasks — Playwright E2E Testing

This document describes the tasks you need to complete. Clone the repository, implement the tests as specified, and submit your solution as a pull request.

## Notes

- **Unexpected behavior:** The app may contain bugs. If you encounter behavior that doesn't match the spec or what you'd expect, document it in your PR description — a failing test may indicate an app issue rather than a test error.
- The app uses **React Hook Form** with **Zod** (via `zodResolver`) for client-side validation. Forms use `mode: "onBlur"` and display error messages via `role="alert"` elements.
- Settings modals use **Next.js parallel routes** and **intercepting routes**. Each form has its own route (e.g. `/settings/profile/nickname`, `/settings/profile/bio`). When clicked from the profile page, the modal opens via an intercepting route that overlays the current page. When navigated to directly (e.g. via URL or page refresh), the modal also opens and displays the form. See [Next.js Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#modals) and [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes) for the pattern.
- The app is intentionally minimal. Use the locators and patterns you consider best practice.
- Organize your test files in a way that makes sense to you.
- Document any assumptions or trade-offs in your PR description.

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

Create a GitHub Actions workflow that runs on every pull request to `main`. Design a CI pipeline that would be optimal for us. Upload the Playwright HTML report as an artifact and ensure links to it are visible in the action (e.g. in the PR checks or workflow summary).

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
