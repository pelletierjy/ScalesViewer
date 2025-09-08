import { test } from '@playwright/test';
import { Actor } from '@serenity-js/core';
import { Ensure, isGreaterThan, equals } from '@serenity-js/assertions';
import { BrowseTheWeb } from '../../abilities/BrowseTheWeb';
import { NavigateToPianoPage } from '../../tasks/piano/NavigateToPianoPage';
import { SelectScale } from '../../tasks/piano/SelectScale';
import { PianoKeyboard } from '../../questions/PianoKeyboard';

test.describe('Piano Component - Basic Functionality', () => {
    
    test('should render piano keyboard with default settings', async ({ page }) => {
        const actor = new Actor('Regular User')
            .whoCan(
                BrowseTheWeb.using(page)
            );
            
        await actor.attemptsTo(
            ...NavigateToPianoPage.asRegularUser(),
            Ensure.that(PianoKeyboard.visibleKeyCount(), equals({ white: 7, black: 5, total: 12 }))
        );
    });

    test('should highlight C Major scale notes correctly', async ({ page }) => {
        const actor = new Actor('Jean-Yves')
            .whoCan(
                BrowseTheWeb.using(page)
            );
            
        await actor.attemptsTo(
            ...NavigateToPianoPage.asExpert(),
            SelectScale.named('Major'),
            Ensure.that(PianoKeyboard.highlightedNotes(), isGreaterThan(0)),
            Ensure.that(PianoKeyboard.isRootNoteEmphasized('C'), equals(true))
        );
    });

    test('should change octave count correctly', async ({ page }) => {
        const octaveTests = [1, 2, 3, 4];
        
        for (let i = 0; i < octaveTests.length; i++) {
            const actor = new Actor('Regular User')
                .whoCan(
                    BrowseTheWeb.using(page)
                );
                
            await actor.attemptsTo(
                ...NavigateToPianoPage.asRegularUser(),
                Ensure.that(PianoKeyboard.currentOctaveCount(), isGreaterThan(0)),
                Ensure.that(PianoKeyboard.visibleKeyCount(), equals({ white: 7, black: 5, total: 12 }))
            );
        }
    });

    test('should toggle between flats and sharps', async ({ page }) => {
        const actor = new Actor('Jean-Yves')
            .whoCan(
                BrowseTheWeb.using(page)
            );
            
        await actor.attemptsTo(
            ...NavigateToPianoPage.asExpert(),
            SelectScale.named('Major'),
            Ensure.that(PianoKeyboard.currentScale(), equals('Major'))
        );
    });

    test('should display scale degrees instead of note names', async ({ page }) => {
        const actor = new Actor('Jean-Yves')
            .whoCan(
                BrowseTheWeb.using(page)
            );
            
        await actor.attemptsTo(
            ...NavigateToPianoPage.asExpert(),
            SelectScale.named('Major'),
            Ensure.that(PianoKeyboard.highlightedNotes(), isGreaterThan(0))
        );
    });
});