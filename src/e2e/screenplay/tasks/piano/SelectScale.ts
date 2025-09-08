import { BrowseTheWeb } from '../../abilities/BrowseTheWeb';

/**
 * Select a specific scale on the piano page
 * Simplified implementation to avoid SerenityJS Task API issues
 */
export class SelectScale {
    static named(scaleName: string) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return async (actor: any) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const browse = BrowseTheWeb.asActor(actor as any);
            const page = await browse.getPage();

            // Click on scale selector
            await page.click('[data-testid="scale-selector"]');
            
            // Select the specific scale
            await page.click(`[data-testid="scale-option-${scaleName}"]`);
            
            // Wait for the scale to be applied
            await page.waitForSelector(`[data-testid="selected-scale-${scaleName}"]`);
        };
    }
}