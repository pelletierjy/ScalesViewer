import { test, expect } from '@playwright/test';

test.describe('Simple Playwright Test', () => {
    test('should load the home page', async ({ page }) => {
        console.log('Testing basic navigation to http://localhost:3000');
        
        // Simple navigation
        await page.goto('http://localhost:3000');
        
        // Wait for the page to load
        await page.waitForLoadState('networkidle');
        
        // Check the title
        const title = await page.title();
        console.log('Page title:', title);
        
        // Take a screenshot
        await page.screenshot({ path: 'simple-test-result.png' });
        
        // Basic assertions - app redirects to default instrument (piano)
        await expect(page).toHaveURL(/localhost:3000\/(piano|guitar|kalimba|harmonica)/);
        await expect(page.locator('body')).toContainText('Scales');
        
        console.log('Test completed successfully!');
    });

    test('should navigate to guitar page', async ({ page }) => {
        console.log('Testing navigation to guitar page');
        
        // Navigate to home first
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        // Look for a guitar link and click it (or navigate directly)
        await page.goto('http://localhost:3000/guitar');
        await page.waitForLoadState('networkidle');
        
        console.log('Current URL:', page.url());
        
        // Take a screenshot
        await page.screenshot({ path: 'guitar-test-result.png' });
        
        // Basic assertions
        await expect(page).toHaveURL(/guitar/);
        
        console.log('Guitar page test completed successfully!');
    });
});