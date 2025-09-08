import { Question } from '@serenity-js/core';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Questions about the piano keyboard state
 */
export class PianoKeyboard {
    static visibleKeyCount() {
        return Question.about('the number of visible keys', async (actor) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const browse = BrowseTheWeb.asActor(actor as any);
            const page = await browse.getPage();
            
            const whiteKeys = await page.locator('[data-testid="piano-key-white"]').count();
            const blackKeys = await page.locator('[data-testid="piano-key-black"]').count();
            
            return {
                white: whiteKeys,
                black: blackKeys,
                total: whiteKeys + blackKeys
            };
        });
    }

    static currentOctaveCount() {
        return Question.about('the current octave count', async (actor) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const browse = BrowseTheWeb.asActor(actor as any);
            const page = await browse.getPage();
            
            const octaveValue = await page.inputValue('[data-testid="octave-count-selector"]');
            return parseInt(octaveValue, 10);
        });
    }

    static currentScale() {
        return Question.about('the currently selected scale', async (actor) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const browse = BrowseTheWeb.asActor(actor as any);
            const page = await browse.getPage();
            
            return await page.textContent('[data-testid="selected-scale-display"]');
        });
    }

    static currentRootNote() {
        return Question.about('the current root note', async (actor) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const browse = BrowseTheWeb.asActor(actor as any);
            const page = await browse.getPage();
            
            return await page.textContent('[data-testid="selected-root-note"]');
        });
    }

    static highlightedNotes() {
        return Question.about('the highlighted notes', async (actor) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const browse = BrowseTheWeb.asActor(actor as any);
            const page = await browse.getPage();
            
            return await page.locator('.highlighted').count();
        });
    }

    static isRootNoteEmphasized(rootNote: string) {
        return Question.about(`whether ${rootNote} is emphasized as root note`, async (actor) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const browse = BrowseTheWeb.asActor(actor as any);
            const page = await browse.getPage();
            
            const emphasizedRoot = await page.locator('[data-testid="emphasized-root-note"]').textContent();
            return emphasizedRoot === rootNote;
        });
    }
}