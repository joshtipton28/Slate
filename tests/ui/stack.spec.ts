import { test, expect } from "@playwright/test";
const BASE = process.env.BASE_URL || "http://localhost:4173/Slate";
test("Stack: toggles sections via header buttons", async ({ page }) => {
  await page.goto(`${BASE}/components/stack/`);
  const items = page.locator(".stack__item");
  await expect(items).toHaveCount(2);
  const b = items.nth(1).locator(".stack__header");
  const panel = items.nth(1).locator(".stack__panel");
  await expect(panel).toBeHidden();
  await b.click();
  await expect(b).toHaveAttribute("aria-expanded","true");
  await expect(panel).toBeVisible();
});
