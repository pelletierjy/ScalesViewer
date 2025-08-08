import { Page, Locator } from '@playwright/test';

export class GuitarPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Selectors
  private get guitarNeck() {
    return this.page.locator('svg'); // Main guitar neck SVG
  }

  // Navigation methods
  async navigateTo(baseURL: string = 'http://localhost:3000'): Promise<void> {
    await this.page.goto(`${baseURL}/guitar`);
    await this.waitForPageLoad();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.guitarNeck.waitFor({ state: 'visible' });
  }

  // Assertion methods
  async isGuitarNeckVisible(): Promise<boolean> {
    return await this.guitarNeck.isVisible();
  }
}
