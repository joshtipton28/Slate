import { test, expect } from "@playwright/test";
const BASE = process.env.BASE_URL || "http://localhost:4173/Slate";
test("Modal: opens and closes", async ({ page }) => {
  await page.goto(`${BASE}/components/modal/`);
  await page.getByRole("button", { name: "Open modal" }).click();
  const dialog = page.locator(".modal[role='dialog']");
  await expect(dialog).toBeVisible();
  // close
  await page.getByRole("button", { name: "Close" }).click();
  await expect(dialog).toBeHidden();
});
