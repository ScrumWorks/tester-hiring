# Bug Report

Bugs discovered during E2E test implementation. Each bug is tagged with `@known-bug` in the corresponding `.feature` file where applicable.

---

## BUG-001: Missing Non-Intercepting Modal Route for Nickname and Bio

**Severity:** Low  
**Component:** Profile Settings → Nickname modal, Bio modal  
**Feature file:** N/A — normal navigation (clicking the link) works correctly  
**Tag:** Not tagged — the normal user flow is not broken

### Description

The normal user flow for opening the Nickname/Bio modals (clicking the settings item link on the profile page) works correctly. The intercepting route `@modal/(.)profile/nickname` activates via client-side (soft) navigation and renders the modal.

However, navigating **directly** to `/settings/profile/nickname` via a full browser load (address bar, refresh, external link) renders a blank page because the non-intercepting route `@modal/profile/nickname` does not exist.

### Steps to Reproduce (direct URL only)

1. Open a new browser tab
2. Navigate directly to `http://localhost:3001/settings/profile/nickname`
3. Observe the page content

### Expected Behavior

A direct URL to `/settings/profile/nickname` should display the Change Nickname modal (same result as clicking the Nickname link from the profile page). Date of Birth and Location already support this.

### Actual Behavior

The page renders blank (sidebar visible, but no modal content). The `@modal` parallel slot falls through to `[...catchAll]` which returns `null`.

### Root Cause

The `@modal` slot has only:
- `@modal/(.)profile/nickname/page.tsx` — intercepting route (client-side nav only)

Missing:
- `@modal/profile/nickname/page.tsx` — non-intercepting route (direct URL)

Date of Birth and Location have both variants; Nickname and Bio only have the intercepting one.

### Affected Routes

| Route | Click navigation | Direct URL |
|-------|-----------------|------------|
| `/settings/profile/nickname` | ✅ Works | ❌ Blank page |
| `/settings/profile/bio` | ✅ Works | ❌ Blank page |
| `/settings/profile/date-of-birth` | ✅ Works | ✅ Works |
| `/settings/profile/location` | ✅ Works | ✅ Works |

### Fix

Create non-intercepting parallel route pages:
- `src/app/settings/@modal/profile/nickname/page.tsx`
- `src/app/settings/@modal/profile/bio/page.tsx`

---

## BUG-002: "Remember Me" Checkbox Has No Effect on Session Duration

**Severity:** Low  
**Component:** Login page  
**Feature file:** `tests/features/login.feature`

### Steps to Reproduce

1. Navigate to `/login`
2. Enter valid credentials (`user@test.com` / `Password123`)
3. Check the **Remember me** checkbox
4. Click **Sign in**
5. Inspect the `auth-token` cookie after login
6. Repeat without checking "Remember me" and compare

### Expected Behavior

- **Remember me checked**: Session should persist for an extended period (e.g. 30 days) or until explicit logout
- **Remember me unchecked**: Session should expire when the browser is closed (session cookie — no `Max-Age` or `Expires`)

### Actual Behavior

The `auth-token` cookie is **always** set with `maxAge: 60 * 60 * 24 * 7` (7 days) regardless of the "Remember me" checkbox state. The checkbox value (`rememberMe`) is collected by React Hook Form and included in the Zod schema, but:

1. `useLoginHook` does not pass `rememberMe` to the `login()` API function
2. The `/api/login` route only reads `email` and `password` from the request body
3. The cookie is hardcoded to 7-day expiry

### Impact

The "Remember me" feature is non-functional. Users who do not check "Remember me" still get a persistent 7-day session, which may be a security concern. The UI element creates a false expectation.

---

## BUG-003: Bio Textarea `maxLength` Attribute Inconsistent with Schema Validation

**Severity:** Low  
**Component:** Profile Settings → Bio modal  
**Feature file:** `tests/features/profile-settings.feature`

### Steps to Reproduce

1. Log in with valid credentials
2. Navigate to `/settings/profile`
3. Click the **Bio** settings item to open the bio modal
4. Type more than 300 characters into the bio textarea
5. Observe that the HTML textarea allows up to 400 characters
6. Click **Save**

### Expected Behavior

The textarea's `maxLength` attribute should match the schema's maximum allowed value (`BIO_MAX = 300`). The HTML attribute should prevent entering more than 300 characters, providing immediate feedback before form submission.

### Actual Behavior

The textarea has `maxLength={BIO_MAX + 100}` = **400 characters**, but the Zod schema (`changeBioSchema`) enforces a maximum of **300 characters** (`BIO_MAX`). Users can type 301–400 characters without any HTML-level restriction but receive a validation error "Bio must be at most 300 characters" only after attempting to save.

### Root Cause

In `ChangeBioDialog.tsx`:

```tsx
<Textarea
  maxLength={BIO_MAX + 100}   // ← should be maxLength={BIO_MAX}
  ...
/>
```

The `+ 100` offset is unexplained and creates a discrepancy between the perceived input limit and the actual validation limit.

### Fix

Change `maxLength={BIO_MAX + 100}` to `maxLength={BIO_MAX}` in `ChangeBioDialog.tsx`.

---

## BUG-004: Bio Cannot Be Cleared Once Set

**Severity:** Medium  
**Component:** Profile Settings → Bio modal  
**Feature file:** `tests/features/profile-settings.feature`

### Steps to Reproduce

1. Log in and navigate to `/settings/profile`
2. Open the **Bio** modal
3. Enter a bio of at least 10 characters (e.g. "Hello World!!")
4. Click **Save** — bio is saved successfully
5. Open the **Bio** modal again
6. Clear the bio field (select all and delete)
7. Click **Save**

### Expected Behavior

Users should be able to clear their bio — setting it back to empty (no bio). An alternative is a dedicated "Clear bio" button.

### Actual Behavior

Clicking **Save** with an empty bio shows the validation error: *"Bio must be at least 10 characters"*. There is no way to remove a bio once it has been set. The schema enforces `min(10)` unconditionally with no option for an empty/null value.

### Impact

Once a bio is set, it is permanently locked in (cannot be removed). This is a data ownership issue — users should always be able to remove their own data.

### Suggested Fix

Make bio optional in the schema (allow empty string as valid):

```typescript
bio: z.string().max(BIO_MAX).refine(
  (val) => val === "" || val.length >= BIO_MIN,
  { message: `Bio must be at least ${BIO_MIN} characters or empty` }
)
```

---

## BUG-005: Missing Page Title (Accessibility)

**Severity:** Medium  
**Component:** All pages (global)  
**Category:** Accessibility — WCAG 2.1 Level A, Rule 2.4.2

### Description

No page in the application has an HTML `<title>` element. Screen readers and browser tabs show no meaningful page title. This is a WCAG 2.1 Level A violation (`document-title` rule).

### Steps to Reproduce

1. Open any page in the application (e.g. `/login`, `/settings/profile`)
2. Check the browser tab title
3. Or run `document.title` in the browser console

### Expected Behavior

Each page should have a descriptive `<title>` element (e.g. "Login — UserHub", "Profile Settings — UserHub").

### Actual Behavior

The `<title>` is empty or missing on all pages.

### Fix

Add a `<title>` via Next.js Metadata API in each layout/page:

```typescript
export const metadata = { title: "Login — UserHub" };
```

---

## BUG-006: Insufficient Color Contrast on Settings Pages (Accessibility)

**Severity:** Medium  
**Component:** Profile Settings, Account Settings  
**Category:** Accessibility — WCAG 2.1 Level AA, Rule 1.4.3

### Description

Some UI elements on the settings pages do not meet the WCAG 2.1 AA minimum contrast ratio of 4.5:1 for normal text. This makes text difficult to read for users with low vision.

### Steps to Reproduce

1. Log in and navigate to `/settings/profile` or `/settings/account`
2. Run an automated accessibility audit (axe-core or Lighthouse)
3. Observe `color-contrast` violations on badge/tag elements

### Expected Behavior

All text should have a contrast ratio of at least 4.5:1 against its background (WCAG AA).

### Actual Behavior

Badge-style elements (e.g. `.inline-flex`, `.focus\:ring-gray-500`) have insufficient contrast ratios.

---

## Summary Table

| ID | Title | Severity | Component | Tagged |
|----|-------|----------|-----------|--------|
| BUG-001 | Missing non-intercepting route for nickname/bio (direct URL) | Low | Profile → Modal routing | ✅ @known-bug |
| BUG-002 | Remember Me checkbox has no effect | Low | Login | ❌ |
| BUG-003 | Bio maxLength allows 400 chars, schema allows 300 | Low | Profile → Bio | ❌ |
| BUG-004 | Bio cannot be cleared once set | Medium | Profile → Bio | ❌ |
| BUG-005 | Missing page title (a11y) | Medium | All pages | ❌ |
| BUG-006 | Insufficient color contrast (a11y) | Medium | Settings pages | ❌ |
