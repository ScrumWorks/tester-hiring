# UserHub Demo

A simplified Next.js application for testing and QA evaluation. This demo app includes login, profile settings, and account management features.

## Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd tester-hiring
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3001](http://localhost:3001).

4. **Run tests**
   ```bash
   npm run test
   ```
   Tests will start the dev server automatically. If you already have the dev server running on port 3001, tests will reuse it.

## Test Credentials

Credentials are stored in `db.json` and can be changed via the app. Initial values:

- **Email:** `user@test.com`
- **Password:** `Password123`

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Playwright (for E2E testing)

## Project Structure

```
├── src/
│   ├── app/           # Next.js App Router pages and API routes
│   ├── components/    # Shared UI components
│   └── lib/           # Utilities and auth helpers
└── ...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run Playwright tests
- `npm run test:ui` - Run Playwright tests with UI mode
