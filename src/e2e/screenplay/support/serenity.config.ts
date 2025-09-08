import { defineConfig } from '@playwright/test';
import { devices } from '@playwright/test';

export default defineConfig({
    testDir: '../..', // Root of e2e tests
    timeout: 30000,
    retries: 2,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
    },
    
    projects: [
        {
            name: 'chromium',
            use: { 
                ...devices['Desktop Chrome'],
                locale: 'en-US',
            },
        },
        {
            name: 'firefox',
            use: { 
                ...devices['Desktop Firefox'],
                locale: 'en-US',
            },
        },
        {
            name: 'webkit',
            use: { 
                ...devices['Desktop Safari'],
                locale: 'en-US',
            },
        },
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },
    ],
    
    reporter: [
        ['dot'],
        ['json', { outputFile: 'test-results.json' }],
        ['junit', { outputFile: 'test-results.xml' }],
        ['html'],
        // Uncomment for SerenityJS reports when fully configured
        // ['@serenity-js/playwright-test', {
        //     crew: [
        //         '@serenity-js/console-reporter',
        //         '@serenity-js/serenity-bdd',
        //         ['@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' }],
        //     ]
        // }]
    ],
    
    webServer: {
        command: 'pnpm run dev',
        port: 3000,
        reuseExistingServer: !process.env.CI,
    },
});