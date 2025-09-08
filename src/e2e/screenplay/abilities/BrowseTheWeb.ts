import { Ability, Actor } from '@serenity-js/core';
import { Page } from '@playwright/test';

/**
 * BrowseTheWeb ability allows actors to interact with web pages using Playwright
 */
export class BrowseTheWeb extends Ability {
    constructor(private page: Page) {
        super();
    }

    static using(page: Page): BrowseTheWeb {
        return new BrowseTheWeb(page);
    }

    static asActor(actor: Actor): BrowseTheWeb {
        return actor.abilityTo(BrowseTheWeb);
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async getPage(): Promise<Page> {
        return this.page;
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async getPageTitle(): Promise<string> {
        return this.page.title();
    }

    async waitForLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async waitForSelector(selector: string, timeout?: number): Promise<void> {
        await this.page.waitForSelector(selector, { timeout });
    }

    async screenshot(options?: { path?: string; fullPage?: boolean }): Promise<Buffer> {
        return await this.page.screenshot(options);
    }
}