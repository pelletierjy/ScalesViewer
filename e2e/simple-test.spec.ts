import { test, expect } from '@playwright/test';

test.describe('Simple Browser Test', () => {
  test('can launch browser and navigate', async ({ page }) => {
    // This is a simple test to verify Playwright works
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example/);
  });
});