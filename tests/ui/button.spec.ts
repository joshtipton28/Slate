import { test, expect } from "@playwright/test";
const BASE = process.env.BASE_URL || "http://localhost:4173/Slate";
test("Button: secondary variant renders with background", async ({ page }) => {
  await page.goto(`${BASE}/components/button/`);
  const secondary = page.locator(".btn.btn--secondary").first();
  const bg = await secondary.evaluate(el => getComputedStyle(el).backgroundColor);
  expect(bg).not.toBe("rgba(0, 0, 0, 0)");
});
