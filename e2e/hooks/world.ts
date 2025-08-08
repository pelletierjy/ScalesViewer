import { Before, After, BeforeAll, AfterAll, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { TestWorld } from '../support/test-world';

// Custom World class for Cucumber
class CucumberWorld extends TestWorld {
  constructor() {
    super();
  }

  async init(): Promise<void> {
    // Browser will be initialized by hooks
  }
}

setWorldConstructor(CucumberWorld);

let browser: Browser;
let context: BrowserContext;
let page: Page;
let world: CucumberWorld;

BeforeAll(async function() {
  // Launch browser once for all scenarios
  browser = await chromium.launch({
    headless: process.env.CI === 'true',
    args: ['--autoplay-policy=no-user-gesture-required']
  });
});

Before(async function() {
  // Create new context and page for each scenario
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    recordVideo: process.env.CI ? {
      dir: 'test-results/videos/',
      size: { width: 1920, height: 1080 }
    } : undefined
  });
  
  page = await context.newPage();
  
  // Initialize world with page
  world = new CucumberWorld();
  await world.initialize(page);
  await world.setupTest();
  
  // Set up console error tracking
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      world.addError(new Error(`Console error: ${msg.text()}`));
    }
  });

  // Set up page error tracking
  page.on('pageerror', (error) => {
    world.addError(error);
  });

  // Attach world to this context for step definitions
  (this as any).world = world;
});

After(async function() {
  // Take screenshot on failure
  if (this.result?.status === 'FAILED' && page) {
    const screenshot = await page.screenshot({ 
      path: `screenshots/failed-${Date.now()}.png`,
      fullPage: true 
    });
    
    // Attach screenshot to Cucumber report if running in CI
    if (process.env.CI && this.attach) {
      this.attach(screenshot, 'image/png');
    }
  }

  // Clean up world
  if (world) {
    await world.teardownTest();
  }

  // Close context and page
  if (context) {
    await context.close();
  }
});

AfterAll(async function() {
  // Close browser after all scenarios
  if (browser) {
    await browser.close();
  }
});

// Export world for step definitions to use
export { world };