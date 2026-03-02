import { createBdd } from "playwright-bdd";
import { test } from "../fixtures/fixtures";
import AxeBuilder from "@axe-core/playwright";

const { Then } = createBdd(test);

// Known app-level accessibility issues that are documented in BUGS.md.
// Excluded so tests catch new regressions without failing on pre-existing issues.
const KNOWN_APP_A11Y_ISSUES = ["document-title", "color-contrast"];

Then("the page should have no critical accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .disableRules(KNOWN_APP_A11Y_ISSUES)
    .analyze();

  const critical = results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious"
  );

  if (critical.length > 0) {
    const messages = critical.map(
      (v) =>
        `[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}\n  Help: ${v.helpUrl}\n  Nodes: ${v.nodes.map((n) => n.target).join(", ")}`
    );
    throw new Error(
      `Found ${critical.length} critical/serious accessibility violation(s):\n\n${messages.join("\n\n")}`
    );
  }
});
