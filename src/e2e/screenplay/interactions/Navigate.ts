import { Interaction } from '@serenity-js/core';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Navigate to a specific URL
 */
export class Navigate {
    static to(url: string): Interaction {
        return Interaction.where(`#actor navigates to ${url}`, async (actor) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const browse = BrowseTheWeb.asActor(actor as any);
            await browse.navigateTo(url);
        });
    }
}

/**
 * Wait for page to load
 */
export class WaitForLoad {
    static toComplete(): Interaction {
        return Interaction.where(`#actor waits for page to load`, async (actor) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const browse = BrowseTheWeb.asActor(actor as any);
            await browse.waitForLoad();
        });
    }
}