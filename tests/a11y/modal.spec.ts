import { test, expect } from "@playwright/test";
test("modal open/close markers present", async ({ page }) => {
  await page.setContent(require('fs').readFileSync('tests/a11y/fixtures/modal.html','utf8'));
  await expect(await page.$(".modal")).not.toBeNull();
});
