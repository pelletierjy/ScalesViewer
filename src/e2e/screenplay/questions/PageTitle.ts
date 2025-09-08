import { Question } from '@serenity-js/core';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Question to get the current page title
 */
export class PageTitle {
    static ofCurrentPage() {
        return Question.about('the current page title', async (actor) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const browse = BrowseTheWeb.asActor(actor as any);
            return await browse.getPageTitle();
        });
    }

    static matches(expectedTitle: string | RegExp) {
        return Question.about(`page title matches ${expectedTitle}`, async (actor) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const browse = BrowseTheWeb.asActor(actor as any);
            const title = await browse.getPageTitle();
            
            if (typeof expectedTitle === 'string') {
                return title.includes(expectedTitle);
            } else {
                return expectedTitle.test(title);
            }
        });
    }
}