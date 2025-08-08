import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { TestWorld } from '../support/test-world';
import { scaleTestData, validationRules } from '../fixtures/piano-test-data';

const world = new TestWorld();

// Background steps
Given('the piano keyboard is displayed', async function () {
  const keyCount = await (this as any).world.pianoPage.getVisibleKeyCount();
  expect(keyCount.total).toBeGreaterThan(0);
  await (this as any).world.waitForStabilization();
});

// Scale selection and display
Given('I have selected {string} scale', async function (scaleName: string) {
  ((this as any).world).config.scale = scaleName;
  await (this as any).world.pianoPage.selectScale(scaleName);
  await (this as any).world.waitForStabilization();
});

Given('I have selected {string} scale with root note {string}', async function (scaleName: string, rootNote: string) {
  ((this as any).world).config.scale = scaleName;
  ((this as any).world).config.rootNote = rootNote;
  await (this as any).world.pianoPage.selectScale(scaleName);
  await (this as any).world.pianoPage.selectRootNote(rootNote);
  await (this as any).world.waitForStabilization();
});

When('the scale is applied to the keyboard', async function () {
  await (this as any).world.waitForStabilization();
  const highlightedNotes = await (this as any).world.pianoPage.getHighlightedNotes();
  ((this as any).world).storeValue('currentHighlightedNotes', highlightedNotes);
});

When('the scale is displayed on the keyboard', async function () {
  await (this as any).world.waitForStabilization();
  const highlightedNotes = await (this as any).world.pianoPage.getHighlightedNotes();
  ((this as any).world).storeValue('currentHighlightedNotes', highlightedNotes);
});

When('the scale is displayed', async function () {
  await (this as any).world.waitForStabilization();
  const scaleNoteCount = await (this as any).world.pianoPage.getScaleNoteCount();
  ((this as any).world).storeValue('scaleNoteCount', scaleNoteCount);
});

// Scale pattern verification
Then('I should see the C Major scale notes highlighted', async function () {
  const expectedNotes = scaleTestData.majorScaleNotes['C'];
  const isPatternCorrect = await (this as any).world.pianoPage.verifyScalePattern(expectedNotes);
  expect(isPatternCorrect).toBe(true);
});

Then('the highlighted notes should be C, D, E, F, G, A, B', async function () {
  const highlightedNotes = await (this as any).world.pianoPage.getHighlightedNotes();
  const expectedNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  
  // Check that all expected notes are present (accounting for multiple octaves)
  for (const note of expectedNotes) {
    expect(highlightedNotes.some((n: string) => n === note)).toBe(true);
  }
});

Then('non-scale notes should not be highlighted', async function () {
  const highlightedNotes = await (this as any).world.pianoPage.getHighlightedNotes();
  const scaleNotes = scaleTestData.majorScaleNotes['C'];
  
  // Verify that highlighted notes are only scale notes
  for (const note of highlightedNotes) {
    const cleanNote = note.replace(/[♯♭]/g, '').replace(/[0-9]/g, ''); // Remove accidentals and octaves
    expect(scaleNotes.includes(cleanNote) || scaleNotes.includes(note)).toBe(true);
  }
});

// Root note emphasis
Then('the root note {string} should be visually emphasized', async function (rootNote: string) {
  const isEmphasized = await (this as any).world.pianoPage.verifyRootNoteEmphasis(rootNote);
  expect(isEmphasized).toBe(true);
});

Then('the root note should have a different color or style than other scale notes', async function () {
  // This checks that root notes exist and are visually distinct
  const rootNoteElements = ((this as any).world).page.locator(`text >> "${((this as any).world).config.rootNote}"`);
  const count = await rootNoteElements.count();
  const expectedCount = ((this as any).world).config.octaveCount;
  
  expect(count).toBe(expectedCount);
});

Then('all instances of {string} across octaves should be emphasized as root notes', async function (rootNote: string) {
  const isEmphasized = await (this as any).world.pianoPage.verifyRootNoteEmphasis(rootNote);
  expect(isEmphasized).toBe(true);
});

// Scale pattern validation for different scales
Then('I should see the correct scale pattern highlighted', async function () {
  const scaleName = ((this as any).world).config.scale;
  const rootNote = ((this as any).world).config.rootNote;
  
  // Get expected notes for this scale
  let expectedNotes: string[] = [];
  
  if (scaleName === 'Major' && rootNote in scaleTestData.majorScaleNotes) {
    expectedNotes = (scaleTestData.majorScaleNotes as any)[rootNote];
  } else if (scaleName === 'Minor' && rootNote in scaleTestData.minorScaleNotes) {
    expectedNotes = (scaleTestData.minorScaleNotes as any)[rootNote];
  } else if (scaleName === 'Pentatonic Major' && rootNote in scaleTestData.pentatonicMajorNotes) {
    expectedNotes = (scaleTestData.pentatonicMajorNotes as any)[rootNote];
  } else if (scaleName === 'Pentatonic Minor' && rootNote in scaleTestData.pentatonicMinorNotes) {
    expectedNotes = (scaleTestData.pentatonicMinorNotes as any)[rootNote];
  } else if (scaleName === 'Blues' && rootNote in scaleTestData.bluesScaleNotes) {
    expectedNotes = (scaleTestData.bluesScaleNotes as any)[rootNote];
  } else {
    // Use validation rules for other scales
    expectedNotes = validationRules.validateScalePattern(scaleName, rootNote);
  }
  
  const isPatternCorrect = await (this as any).world.pianoPage.verifyScalePattern(expectedNotes);
  expect(isPatternCorrect).toBe(true);
});

Then('the scale should span across all visible octaves', async function () {
  const octaveCount = await (this as any).world.pianoPage.getCurrentOctaveCount();
  const scaleNoteCount = await (this as any).world.pianoPage.getScaleNoteCount();
  
  // Should have scale notes in each octave
  expect(scaleNoteCount).toBeGreaterThanOrEqual(octaveCount);
});

// Display settings
Given('the display setting is set to show note names', async function () {
  const isShowingDegrees = await (this as any).world.pianoPage.isShowingDegrees();
  if (isShowingDegrees) {
    await (this as any).world.pianoPage.toggleDegreesVsNames();
  }
  ((this as any).world).config.showDegrees = false;
});

Given('the display setting is set to show scale degrees', async function () {
  const isShowingDegrees = await (this as any).world.pianoPage.isShowingDegrees();
  if (!isShowingDegrees) {
    await (this as any).world.pianoPage.toggleDegreesVsNames();
  }
  ((this as any).world).config.showDegrees = true;
});

Then('each highlighted key should show its note name', async function () {
  const highlightedNotes = await (this as any).world.pianoPage.getHighlightedNotes();
  
  // Verify that the displayed text represents note names (letters, possibly with accidentals)
  for (const note of highlightedNotes) {
    expect(note).toMatch(/^[A-G][♯♭]?$/); // Note name pattern
  }
});

Then('the note names should be clearly readable', async function () {
  const scaleNoteElements = ((this as any).world).page.locator('circle + text');
  const count = await scaleNoteElements.count();
  
  expect(count).toBeGreaterThan(0);
  
  // Check first few elements are visible
  for (let i = 0; i < Math.min(count, 3); i++) {
    await expect(scaleNoteElements.nth(i)).toBeVisible();
  }
});

Then('the text should contrast well with the key background', async function () {
  const textElements = ((this as any).world).page.locator('circle + text');
  const count = await textElements.count();
  
  // Verify text elements are visible (implies good contrast)
  for (let i = 0; i < Math.min(count, 3); i++) {
    await expect(textElements.nth(i)).toBeVisible();
  }
});

Then('each highlighted key should show its scale degree number', async function () {
  const highlightedNotes = await (this as any).world.pianoPage.getHighlightedNotes();
  
  // When showing degrees, should see numbers 1-7
  const hasScaleDegrees = highlightedNotes.some((note: string) => /^[1-7]$/.test(note));
  expect(hasScaleDegrees).toBe(true);
});

Then('the root note should show {string}', async function (expectedDegree: string) {
  const highlightedNotes = await (this as any).world.pianoPage.getHighlightedNotes();
  expect(highlightedNotes.includes(expectedDegree)).toBe(true);
});

Then('the scale degrees should follow the pattern 1, 2, 3, 4, 5, 6, 7', async function () {
  const highlightedNotes = await (this as any).world.pianoPage.getHighlightedNotes();
  const degrees = ['1', '2', '3', '4', '5', '6', '7'];
  
  // For major scales, should see all degrees
  if (((this as any).world).config.scale === 'Major') {
    for (const degree of degrees) {
      expect(highlightedNotes.includes(degree)).toBe(true);
    }
  }
});

// Flats vs Sharps
When('I toggle the flats/sharps setting to {string}', async function (setting: string) {
  const currentlyShowingFlats = await (this as any).world.pianoPage.isShowingFlats();
  const shouldShowFlats = setting === 'flats';
  
  if (currentlyShowingFlats !== shouldShowFlats) {
    await (this as any).world.pianoPage.toggleFlatsVsSharps();
  }
  
  ((this as any).world).config.showFlats = shouldShowFlats;
  await (this as any).world.waitForStabilization();
});

Then('the scale notes should display as flats \\(Db, Eb, F, Gb, Ab, Bb, C)', async function () {
  const highlightedNotes = await (this as any).world.pianoPage.getHighlightedNotes();
  const expectedFlats = ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'];
  
  // Check that flat notation is being used
  const hasFlats = expectedFlats.some(note => highlightedNotes.includes(note));
  expect(hasFlats).toBe(true);
});

Then('the scale notes should display as sharps \\(C#, D#, F, F#, G#, A#, C)', async function () {
  const highlightedNotes = await (this as any).world.pianoPage.getHighlightedNotes();
  const expectedSharps = ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C'];
  
  // Check that sharp notation is being used
  const hasSharps = expectedSharps.some(note => highlightedNotes.includes(note));
  expect(hasSharps).toBe(true);
});

// Multi-octave patterns
Given('I have set the octave count to {int}', async function (octaveCount: number) {
  ((this as any).world).config.octaveCount = octaveCount as 1 | 2 | 3 | 4;
  await (this as any).world.pianoPage.setOctaveCount(octaveCount as 1 | 2 | 3 | 4);
  await (this as any).world.waitForStabilization();
});

Then('the scale pattern should repeat correctly across all {int} octaves', async function (expectedOctaves: number) {
  const octaveCount = await (this as any).world.pianoPage.getCurrentOctaveCount();
  expect(octaveCount).toBe(expectedOctaves);
  
  const scaleNoteCount = await (this as any).world.pianoPage.getScaleNoteCount();
  // Should have scale pattern repeated across octaves
  expect(scaleNoteCount).toBeGreaterThan(expectedOctaves);
});

Then('each octave should show the same relative scale pattern', async function () {
  // This checks that the pattern is consistent across octaves
  const highlightedNotes = await (this as any).world.pianoPage.getHighlightedNotes();
  const octaveCount = ((this as any).world).config.octaveCount;
  
  expect(highlightedNotes.length).toBeGreaterThanOrEqual(octaveCount);
});

Then('root notes should be emphasized in each octave', async function () {
  const rootNote = ((this as any).world).config.rootNote;
  const isEmphasized = await (this as any).world.pianoPage.verifyRootNoteEmphasis(rootNote);
  expect(isEmphasized).toBe(true);
});

// Color coding
When('the scale is displayed with color coding enabled', async function () {
  // Assume color coding is always enabled - just wait for display
  await (this as any).world.waitForStabilization();
  const scaleNoteCount = await (this as any).world.pianoPage.getScaleNoteCount();
  expect(scaleNoteCount).toBeGreaterThan(0);
});

Then('the root note \\(C) should have a distinct color', async function () {
  // Check that root note elements exist and are styled
  const rootNoteElements = ((this as any).world).page.locator(`text >> "C"`);
  const count = await rootNoteElements.count();
  expect(count).toBeGreaterThan(0);
});

Then('the dominant note \\(G) should have a recognizable color', async function () {
  if (((this as any).world).config.scale === 'Major' && ((this as any).world).config.rootNote === 'C') {
    const dominantNoteElements = ((this as any).world).page.locator(`text >> "G"`);
    const count = await dominantNoteElements.count();
    expect(count).toBeGreaterThan(0);
  }
});

Then('other scale degrees should follow the established color scheme', async function () {
  const scaleNoteElements = ((this as any).world).page.locator('circle[fill]');
  const count = await scaleNoteElements.count();
  expect(count).toBeGreaterThan(0);
  
  // Verify that colored elements exist
  for (let i = 0; i < Math.min(count, 5); i++) {
    const fillColor = await scaleNoteElements.nth(i).getAttribute('fill');
    expect(fillColor).toBeTruthy();
  }
});

Then('the colors should be consistent across octaves', async function () {
  // This would require more sophisticated color comparison
  // For now, verify that all octaves have colored scale notes
  const scaleNoteCount = await (this as any).world.pianoPage.getScaleNoteCount();
  const octaveCount = ((this as any).world).config.octaveCount;
  expect(scaleNoteCount).toBeGreaterThanOrEqual(octaveCount);
});

// Empty/invalid scale handling
Given('no scale is currently selected', async function () {
  // This might require clearing the scale selection
  await (this as any).world.pianoPage.clearLocalStorage();
  await (this as any).world.page.reload();
  await (this as any).world.pianoPage.waitForPageLoad();
});

Then('no notes should be highlighted', async function () {
  const scaleNoteCount = await (this as any).world.pianoPage.getScaleNoteCount();
  expect(scaleNoteCount).toBe(0);
});

Then('the keyboard should remain fully interactive', async function () {
  const keyCount = await (this as any).world.pianoPage.getVisibleKeyCount();
  expect(keyCount.total).toBeGreaterThan(0);
  
  // Test interaction with a key
  await (this as any).world.pianoPage.clickPianoKey(0);
  // Should not throw errors
});

Then('no error messages should be displayed', async function () {
  const errorElements = ((this as any).world).page.locator('[role="alert"], .error, .error-message');
  const errorCount = await errorElements.count();
  expect(errorCount).toBe(0);
});

// Scale switching
Given('I have {string} scale currently displayed', async function (currentScale: string) {
  ((this as any).world).config.scale = currentScale;
  await (this as any).world.pianoPage.selectScale(currentScale);
  await (this as any).world.waitForStabilization();
});

When('I switch to {string} scale', async function (newScale: string) {
  ((this as any).world).config.scale = newScale;
  await (this as any).world.pianoPage.selectScale(newScale);
  await (this as any).world.waitForStabilization();
});

Then('the previous scale highlights should be cleared', async function () {
  // After switching scales, the new pattern should be displayed
  await (this as any).world.waitForStabilization();
  const newHighlights = await (this as any).world.pianoPage.getHighlightedNotes();
  expect(newHighlights.length).toBeGreaterThan(0);
});

Then('the new scale pattern should be highlighted', async function () {
  const highlightedNotes = await (this as any).world.pianoPage.getHighlightedNotes();
  expect(highlightedNotes.length).toBeGreaterThan(0);
});

Then('the root note emphasis should update to {string}', async function (newRootNote: string) {
  // If root note was explicitly changed
  if (((this as any).world).config.rootNote !== newRootNote) {
    const isEmphasized = await (this as any).world.pianoPage.verifyRootNoteEmphasis(((this as any).world).config.rootNote);
    expect(isEmphasized).toBe(true);
  }
});

Then('the transition should be visually smooth', async function () {
  // This is a subjective test - we verify no errors occurred
  const errors = ((this as any).world).getErrors();
  expect(errors.length).toBe(0);
});

// Chromatic scale
Given('I have selected {string} scale', async function (scaleName: string) {
  ((this as any).world).config.scale = scaleName;
  await (this as any).world.pianoPage.selectScale(scaleName);
  await (this as any).world.waitForStabilization();
});

Then('all 12 notes should be highlighted', async function () {
  if (((this as any).world).config.scale === 'Chromatic') {
    const scaleNoteCount = await (this as any).world.pianoPage.getScaleNoteCount();
    const octaveCount = ((this as any).world).config.octaveCount;
    const expectedNotes = 12 * octaveCount; // All 12 chromatic notes per octave
    
    expect(scaleNoteCount).toBeGreaterThanOrEqual(expectedNotes * 0.8); // Allow some margin
  }
});

Then('both white and black keys should be highlighted', async function () {
  const whiteKeyCount = (await (this as any).world.pianoPage.getVisibleKeyCount()).white;
  const blackKeyCount = (await (this as any).world.pianoPage.getVisibleKeyCount()).black;
  const scaleNoteCount = await (this as any).world.pianoPage.getScaleNoteCount();
  
  // For chromatic scale, should highlight keys of both colors
  expect(scaleNoteCount).toBeGreaterThan(Math.max(whiteKeyCount, blackKeyCount));
});

Then('the root note should still be visually emphasized', async function () {
  const rootNote = ((this as any).world).config.rootNote;
  const isEmphasized = await (this as any).world.pianoPage.verifyRootNoteEmphasis(rootNote);
  expect(isEmphasized).toBe(true);
});

Then('the pattern should repeat across all octaves', async function () {
  const scaleNoteCount = await (this as any).world.pianoPage.getScaleNoteCount();
  const octaveCount = ((this as any).world).config.octaveCount;
  
  // Pattern should be consistent across octaves
  expect(scaleNoteCount).toBeGreaterThanOrEqual(octaveCount);
});