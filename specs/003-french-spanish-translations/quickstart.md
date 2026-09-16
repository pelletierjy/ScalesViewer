# Quickstart: French and Spanish Translations

**Feature**: French and Spanish Translations
**Date**: 2026-08-03
**Purpose**: Validation scenarios to verify the feature works end-to-end

## Prerequisites

- Node.js >= 18
- Dependencies installed: `npm install`
- Development server: `npm run dev`

## Scenario 1: Verify French Language Display

**Steps**:
1. Start the dev server: `npm run dev`
2. Open `http://localhost:3000/?lang=fr`
3. Observe the header: "Scales Viewer" should appear as the French equivalent.
4. Open the instrument dropdown: options should display in French (Guitare, Piano, Kalimba, etc.).
5. Open the scale dropdown: scale names and groups should display in French.
6. Open the help modal (❓): all slides should be in French.
7. Open settings (⚙️): all labels and descriptions should be in French.

**Expected outcome**: No English text is visible anywhere in the UI.

## Scenario 2: Verify Spanish Language Display

**Steps**:
1. Open `http://localhost:3000/?lang=es`
2. Repeat the checks from Scenario 1.

**Expected outcome**: All text is in Spanish; no English text is visible.

## Scenario 3: Verify Language Switching

**Steps**:
1. Open `http://localhost:3000/`
2. Use the language selector in the header to switch to French.
3. Observe that the URL updates to `?lang=fr`.
4. Switch to Spanish; URL updates to `?lang=es`.
5. Switch back to English; URL updates to `?lang=en` or drops the param.

**Expected outcome**: Language changes immediately without page reload; URL reflects the selection.

## Scenario 4: Verify Solfège Note Names

**Steps**:
1. Open `http://localhost:3000/?lang=fr`
2. Select any scale with root C.
3. Observe the root selector and highlighted notes: they should show "Do" instead of "C".
4. Toggle sharps/flats: notes should show "Do♯" or "Ré♭" instead of "C♯" or "D♭".
5. Switch to Spanish: notes should show "Do", "Re", "Mi", etc.
6. Switch to English: notes should revert to "C", "D", "E", etc.

**Expected outcome**: Note naming convention follows the active locale.

## Scenario 5: Verify Shareable URLs

**Steps**:
1. Open `http://localhost:3000/?instrument=guitar&scale=major&root=C&lang=fr`
2. Copy the URL and open it in an incognito window.
3. Observe that the app opens in French with Guitar, Major scale, and root C preselected.

**Expected outcome**: All URL params (including `lang`) are respected on first load.

## Scenario 6: Verify Browser Language Detection

**Steps**:
1. Set your browser's primary language to Spanish (es-ES).
2. Open `http://localhost:3000/` with no `lang` param.
3. Observe the initial language.

**Expected outcome**: App initially displays in Spanish.

## Scenario 7: Verify Persistence

**Steps**:
1. Open the app and select French.
2. Close the browser tab completely.
3. Reopen `http://localhost:3000/`.

**Expected outcome**: App displays in French without manual selection.

## Scenario 8: Run Tests

**Steps**:
1. Run the test suite: `npm test`
2. Run tests for i18n utilities: `npm test -- src/__tests__/i18n/`

**Expected outcome**: All tests pass, including new translation tests.
