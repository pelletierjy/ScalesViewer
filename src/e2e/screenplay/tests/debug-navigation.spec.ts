import { test, expect } from '@playwright/test';
import { Actor } from '@serenity-js/core';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { BasicNavigation } from '../tasks/common/BasicNavigation';

test.describe('Debug Navigation', () => {
    test('should navigate to home page', async ({ page }) => {
        console.log('Starting navigation test...');
        console.log('Server should be running on http://localhost:3000');
        
        // Try direct navigation first
        await page.goto('http://localhost:3000');
        console.log('Current URL after direct navigation:', page.url());
        
        // Check if page loaded
        const title = await page.title();
        console.log('Page title:', title);
        
        // Take a screenshot for debugging
        await page.screenshot({ path: 'debug-homepage.png' });
        
        // Now try using the SerenityJS approach - give the actor the BrowseTheWeb ability
        const actor = new Actor('Test User')
            .whoCan(
                BrowseTheWeb.using(page)
            );
        
        await actor.attemptsTo(
            ...BasicNavigation.toHomePage()
        );
        
        console.log('Current URL after SerenityJS navigation:', page.url());
        await page.screenshot({ path: 'debug-after-serenity.png' });
        
        // Basic assertion to verify we're on the right page (app redirects to instrument)
        await expect(page).toHaveURL(/localhost:3000\/(piano|guitar|kalimba|harmonica)/);
    });
});