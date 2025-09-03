import { test, expect } from "@playwright/test";
// @ts-ignore: axe available in CI
  test("tabs renders and toggles", async ({ page }) => {
    await page.setContent(require('fs').readFileSync('tests/a11y/fixtures/tabs.html','utf8'));
    await page.click(".tabs__tab:nth-of-type(2)");
    await expect(await page.$(".tabs__panel[hidden]")).toBeNull();
  });
