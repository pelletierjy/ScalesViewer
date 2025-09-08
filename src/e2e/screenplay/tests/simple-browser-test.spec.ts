import { test } from '@playwright/test';
import { Actor } from '@serenity-js/core';
import { Ensure, equals } from '@serenity-js/assertions';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { BasicNavigation } from '../tasks/common/BasicNavigation';
import { PageTitle } from '../questions/PageTitle';

test.describe('Simple Browser Test', () => {
    test('can launch browser and navigate to example site', async ({ page }) => {
        const actor = new Actor('Regular User')
            .whoCan(
                BrowseTheWeb.using(page)
            );
            
        await actor.attemptsTo(
            ...BasicNavigation.toInstrumentPage('https://example.com'),
            Ensure.that(PageTitle.ofCurrentPage(), equals('Example Domain'))
        );
    });

    test('can navigate to ScalesViewer home page', async ({ page }) => {
        const actor = new Actor('Jean-Yves')
            .whoCan(
                BrowseTheWeb.using(page)
            );
            
        await actor.attemptsTo(
            ...BasicNavigation.toHomePage(),
            Ensure.that(PageTitle.matches(/ScalesViewer/), equals(true))
        );
    });

    test('can navigate to guitar page as expert user', async ({ page }) => {
        const actor = new Actor('Jean-Yves')
            .whoCan(
                BrowseTheWeb.using(page)
            );
            
        await actor.attemptsTo(
            ...BasicNavigation.toGuitarPage(),
            Ensure.that(PageTitle.matches(/Guitar/), equals(true))
        );
    });
});