import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  
  // Create a browser instance for setup operations
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Wait for the Next.js dev server to be ready
  if (baseURL) {
    console.log('Waiting for Next.js server to be ready...');
    try {
      await page.goto(baseURL);
      
      // Wait for the app to be fully loaded
      await page.waitForSelector('body', { timeout: 30000 });
      console.log('Next.js server is ready');
    } catch (error) {
      console.error('Failed to connect to Next.js server:', error);
      throw error;
    }
  }

  await browser.close();
}

export default globalSetup;