import { test, expect } from "@playwright/test";
const BASE = process.env.BASE_URL || "http://localhost:4173/Slate";
test("Tabs: click switches panels and manages aria", async ({ page }) => {
  await page.goto(`${BASE}/components/tabs/`);
  const tabs = page.locator(".tabs__tab");
  const panels = page.locator(".tabs__panel");
  await expect(tabs).toHaveCount(2);
  await expect(panels.nth(0)).toBeVisible();
  await expect(panels.nth(1)).toBeHidden();
  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected","true");
  await expect(panels.nth(1)).toBeVisible();
  await expect(panels.nth(0)).toBeHidden();
});
