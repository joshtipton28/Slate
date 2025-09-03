import { test, expect } from "@playwright/test";

test("tabs toggles aria-selected and hidden states", async ({ page }) => {
  const html = require('fs').readFileSync('tests/a11y/fixtures/tabs.html','utf8');
  await page.setContent(html);
  // initial: first selected, second hidden
  await expect(await page.getAttribute(".tabs__tab:nth-of-type(1)", "aria-selected")).resolves?.toBe("true");
  await expect(await page.$(".tabs__panel:nth-of-type(2)[hidden]")).not.toBeNull();
  // click second tab
  await page.click(".tabs__tab:nth-of-type(2)");
  // now: second selected, first hidden
  await expect(await page.getAttribute(".tabs__tab:nth-of-type(2)", "aria-selected")).resolves?.toBe("true");
  const firstHidden = await page.$(".tabs__panel:nth-of-type(1)[hidden]");
  const secondVisible = await page.$(".tabs__panel:nth-of-type(2):not([hidden])");
  await expect(firstHidden).not.toBeNull();
  await expect(secondVisible).not.toBeNull();
});
