import { test, expect } from '@playwright/test';
import { Actor } from '@serenity-js/core';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

test.describe('Working SerenityJS Test', () => {
    test('should navigate to piano page using SerenityJS', async ({ page }) => {
        console.log('Testing SerenityJS navigation to piano page...');
        
        // Create actor with BrowseTheWeb ability
        const actor = new Actor('Test User')
            .whoCan(
                BrowseTheWeb.using(page)
            );
        
        // Navigate to piano page using the simplified task
        await actor.attemptsTo(
            page.goto('http://localhost:3000/piano')
        );
        
        // Wait for page to load
        await page.waitForLoadState('networkidle');
        
        console.log('Current URL:', page.url());
        console.log('Page title:', await page.title());
        
        // Take a screenshot
        await page.screenshot({ path: 'serenity-piano-test.png' });
        
        // Basic assertions
        await expect(page).toHaveURL(/piano/);
        
        console.log('SerenityJS test completed successfully!');
    });
});