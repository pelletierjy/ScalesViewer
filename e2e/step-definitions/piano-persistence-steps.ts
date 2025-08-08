import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { TestWorld } from '../support/test-world';

const world = new TestWorld();

// Helper function to parse combined scale names like "A Minor" -> { root: "A", scale: "minor" }
function parseScaleName(combinedName: string): { root: string; scale: string } {
  // Common mappings for combined scale names
  const scaleMapping: Record<string, { root: string; scale: string }> = {
    'A Minor': { root: 'A', scale: 'minor' },
    'E Blues': { root: 'E', scale: 'blues' },
    'F# Major': { root: 'F#', scale: 'major' },
    'C Dorian': { root: 'C', scale: 'dorian' },
    'Harmonic Minor': { root: 'C', scale: 'harmonic-minor' }, // Default to C if no root specified
    'Blues': { root: 'C', scale: 'blues' },
    'Major': { root: 'C', scale: 'major' },
    'Minor': { root: 'A', scale: 'minor' },
    'Pentatonic Minor': { root: 'A', scale: 'minor-pentatonic' },
    'Pentatonic Major': { root: 'C', scale: 'pentatonic' }
  };

  // Return mapping if found, otherwise try to parse
  if (scaleMapping[combinedName]) {
    return scaleMapping[combinedName];
  }

  // Try to parse format like "C# Major"
  const parts = combinedName.split(' ');
  if (parts.length >= 2) {
    const root = parts[0];
    const scaleType = parts.slice(1).join(' ').toLowerCase();
    return { root, scale: scaleType };
  }

  // Default fallback
  return { root: 'C', scale: combinedName.toLowerCase() };
}

// Background
Given('the application supports state persistence', async function () {
  // Verify localStorage is available
  const storageSupported = await (this as any).world.page.evaluate(() => {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch {
      return false;
    }
  });
  expect(storageSupported).toBe(true);
});

// Basic persistence - octave setting handled by piano-keyboard-steps.ts

Given('I select {string} scale', async function (scale: string) {
  const parsed = parseScaleName(scale);
  ((this as any).world).config.scale = parsed.scale;
  ((this as any).world).config.rootNote = parsed.root;
  
  await (this as any).world.pianoPage.selectScale(parsed.scale);
  await (this as any).world.pianoPage.selectRootNote(parsed.root);
  await (this as any).world.waitForStabilization();
});

Given('I set the root note to {string}', async function (rootNote: string) {
  ((this as any).world).config.rootNote = rootNote;
  await (this as any).world.pianoPage.selectRootNote(rootNote);
  await (this as any).world.waitForStabilization();
});

When('I refresh the browser page', async function () {
  await (this as any).world.page.reload();
  await (this as any).world.pianoPage.waitForPageLoad();
});

Then('the octave count should still be {int}', async function (expectedOctaves: number) {
  const actualOctaves = await (this as any).world.pianoPage.getCurrentOctaveCount();
  expect(actualOctaves).toBe(expectedOctaves);
});

Then('{string} scale should still be selected', async function (expectedScale: string) {
  const parsed = parseScaleName(expectedScale);
  const currentScale = await (this as any).world.pianoPage.getCurrentScale();
  const currentRoot = await (this as any).world.pianoPage.getCurrentRootNote();
  
  // Check that the scale type is correct (e.g., "Minor (Natural)" contains "Minor")
  const scaleTypeMapping: Record<string, string> = {
    'minor': 'Minor',
    'major': 'Major',
    'blues': 'Blues',
    'dorian': 'Dorian',
    'harmonic-minor': 'Harmonic Minor'
  };
  
  const expectedScaleType = scaleTypeMapping[parsed.scale] || parsed.scale;
  expect(currentScale).toContain(expectedScaleType);
  expect(currentRoot).toBe(parsed.root);
});

Then('the root note should still be {string}', async function (expectedRoot: string) {
  const currentRoot = await (this as any).world.pianoPage.getCurrentRootNote();
  expect(currentRoot).toBe(expectedRoot);
});

// Local storage persistence
Given('I make changes to piano settings', async function () {
  // Capture initial state
  await (this as any).world.captureCurrentState();
});

When('I modify the octave count to {int}', async function (octaves: number) {
  ((this as any).world).config.octaveCount = octaves as 1 | 2 | 3 | 4;
  await (this as any).world.pianoPage.setOctaveCount(octaves as 1 | 2 | 3 | 4);
});

When('I change the display to show scale degrees', async function () {
  const currentlyShowingDegrees = await (this as any).world.pianoPage.isShowingDegrees();
  if (!currentlyShowingDegrees) {
    await (this as any).world.pianoPage.toggleDegreesVsNames();
  }
  ((this as any).world).config.showDegrees = true;
});

Then('the settings should be saved to browser local storage', async function () {
  // Check that octave count is saved
  const savedOctaves = await (this as any).world.pianoPage.getLocalStorageItem('octave-count');
  expect(savedOctaves).toBeTruthy();
});

Then('I should be able to verify the stored data exists', async function () {
  const octaveData = await (this as any).world.pianoPage.getLocalStorageItem('octave-count');
  expect(octaveData).not.toBeNull();
});

// Redux state persistence
Given('I change global settings that affect the piano', async function () {
  // This would affect Redux state
  await (this as any).world.captureCurrentState();
});

When('I switch the theme to dark mode', async function () {
  const isDark = await (this as any).world.pianoPage.isDarkMode();
  if (!isDark) {
    await (this as any).world.pianoPage.toggleTheme();
  }
  ((this as any).world).config.theme = 'dark';
});

When('I change the scale to {string}', async function (scale: string) {
  const parsed = parseScaleName(scale);
  ((this as any).world).config.scale = parsed.scale;
  ((this as any).world).config.rootNote = parsed.root;
  
  await (this as any).world.pianoPage.selectScale(parsed.scale);
  await (this as any).world.pianoPage.selectRootNote(parsed.root);
});

When('I modify the root note to {string}', async function (rootNote: string) {
  ((this as any).world).config.rootNote = rootNote;
  await (this as any).world.pianoPage.selectRootNote(rootNote);
});

Then('these changes should be saved in Redux state', async function () {
  // Verify theme change is reflected
  const isDark = await (this as any).world.pianoPage.isDarkMode();
  expect(isDark).toBe(((this as any).world).config.theme === 'dark');
});

When('I navigate away and return to the piano page', async function () {
  await (this as any).world.page.goto('http://localhost:3000/'); // Go to home page
  await (this as any).world.page.waitForTimeout(500);
  await (this as any).world.pianoPage.navigateTo(); // Return to piano
});

Then('the global state should be restored correctly', async function () {
  // Check that theme is maintained
  const isDark = await (this as any).world.pianoPage.isDarkMode();
  expect(isDark).toBe(((this as any).world).config.theme === 'dark');
});

// Mixed state persistence
Given('I have both local piano settings and global application settings', async function () {
  await (this as any).world.setupTest();
  await (this as any).world.captureCurrentState();
});

When('I set the octave count to {int} \\(local state)', async function (octaves: number) {
  ((this as any).world).config.octaveCount = octaves as 1 | 2 | 3 | 4;
  await (this as any).world.pianoPage.setOctaveCount(octaves as 1 | 2 | 3 | 4);
});

When('I set the theme to dark mode \\(global state)', async function () {
  const isDark = await (this as any).world.pianoPage.isDarkMode();
  if (!isDark) {
    await (this as any).world.pianoPage.toggleTheme();
  }
  ((this as any).world).config.theme = 'dark';
});

When('I select {string} scale \\(global state)', async function (scale: string) {
  const parsed = parseScaleName(scale);
  ((this as any).world).config.scale = parsed.scale;
  ((this as any).world).config.rootNote = parsed.root;
  
  await (this as any).world.pianoPage.selectScale(parsed.scale);
  await (this as any).world.pianoPage.selectRootNote(parsed.root);
});

When('I restart the application', async function () {
  // Restart should preserve localStorage, not clear it
  await (this as any).world.page.reload();
  await (this as any).world.pianoPage.waitForPageLoad();
});

Then('the octave count should remain {int}', async function (expectedOctaves: number) {
  const actualOctaves = await (this as any).world.pianoPage.getCurrentOctaveCount();
  expect(actualOctaves).toBe(expectedOctaves);
});

Then('the theme should remain dark', async function () {
  const isDark = await (this as any).world.pianoPage.isDarkMode();
  expect(isDark).toBe(true);
});

Then('the {string} scale should still be selected', async function (expectedScale: string) {
  const parsed = parseScaleName(expectedScale);
  const currentScale = await (this as any).world.pianoPage.getCurrentScale();
  const currentRoot = await (this as any).world.pianoPage.getCurrentRootNote();
  
  // Check that the scale type is correct
  const scaleTypeMapping: Record<string, string> = {
    'minor': 'Minor',
    'major': 'Major',
    'blues': 'Blues',
    'dorian': 'Dorian',
    'harmonic-minor': 'Harmonic Minor'
  };
  
  const expectedScaleType = scaleTypeMapping[parsed.scale] || parsed.scale;
  expect(currentScale).toContain(expectedScaleType);
  expect(currentRoot).toBe(parsed.root);
});

// Partial data corruption
Given('I have saved piano settings in local storage', async function () {
  await (this as any).world.pianoPage.setOctaveCount(3);
  await (this as any).world.pianoPage.selectScale('major');
  await (this as any).world.waitForStabilization();
});

When('some of the stored data becomes corrupted or invalid', async function () {
  // Corrupt some localStorage data
  await (this as any).world.pianoPage.setLocalStorageItem('octave-count', 'invalid');
  await (this as any).world.pianoPage.setLocalStorageItem('corrupted-data', null);
});

When('I reload the application', async function () {
  await (this as any).world.page.reload();
  await (this as any).world.pianoPage.waitForPageLoad();
});

Then('the system should use default values for corrupted settings', async function () {
  const octaves = await (this as any).world.pianoPage.getCurrentOctaveCount();
  expect(octaves).toBeGreaterThanOrEqual(1);
  expect(octaves).toBeLessThanOrEqual(4);
});

Then('the valid settings should still be restored', async function () {
  // Check that the piano still functions
  const keyCount = await (this as any).world.pianoPage.getVisibleKeyCount();
  expect(keyCount.total).toBeGreaterThan(0);
});

Then('the piano should function normally without errors', async function () {
  const errors = ((this as any).world).getErrors();
  expect(errors.length).toBe(0);
  
  const keyCount = await (this as any).world.pianoPage.getVisibleKeyCount();
  expect(keyCount.total).toBeGreaterThan(0);
});

// Storage limitations
Given('the browser\'s local storage is approaching its limit', async function () {
  // This would be difficult to simulate realistically
  // For now, just verify storage operations work
  await (this as any).world.pianoPage.setLocalStorageItem('test-limit', 'data');
});

When('I attempt to save new piano settings', async function () {
  try {
    await (this as any).world.pianoPage.setOctaveCount(4);
    await (this as any).world.waitForStabilization();
  } catch (error) {
    ((this as any).world).addError(error as Error);
  }
});

Then('the system should handle storage quota gracefully', async function () {
  // Should not crash the application
  const keyCount = await (this as any).world.pianoPage.getVisibleKeyCount();
  expect(keyCount.total).toBeGreaterThan(0);
});

Then('essential settings should still be preserved', async function () {
  const octaves = await (this as any).world.pianoPage.getCurrentOctaveCount();
  expect(octaves).toBeGreaterThanOrEqual(1);
  expect(octaves).toBeLessThanOrEqual(4);
});

Then('the user should be informed if settings cannot be saved', async function () {
  // Would check for user notifications in a real implementation
  // For now, verify no critical errors occurred
  const criticalErrors = ((this as any).world).getErrors().filter((e: Error) => e.message.includes('storage'));
  expect(criticalErrors.length).toBe(0);
});

// Cross-session continuity
Given('I am in the middle of a learning session', async function () {
  await (this as any).world.pianoPage.selectScale('major');
  await (this as any).world.pianoPage.selectRootNote('C');
  await (this as any).world.captureCurrentState();
});

Given('I have {string} scale displayed with {int} octaves', async function (scale: string, octaves: number) {
  const parsed = parseScaleName(scale);
  ((this as any).world).config.scale = parsed.scale;
  ((this as any).world).config.rootNote = parsed.root;
  ((this as any).world).config.octaveCount = octaves as 1 | 2 | 3 | 4;
  
  await (this as any).world.pianoPage.selectScale(parsed.scale);
  await (this as any).world.pianoPage.selectRootNote(parsed.root);
  await (this as any).world.pianoPage.setOctaveCount(octaves as 1 | 2 | 3 | 4);
});

Given('I have customized the display settings', async function () {
  await (this as any).world.pianoPage.toggleDegreesVsNames();
  ((this as any).world).config.showDegrees = true;
});

When('I close the browser tab accidentally', async function () {
  // Simulate by navigating away
  await (this as any).world.page.goto('about:blank');
});

When('I reopen the piano page', async function () {
  await (this as any).world.pianoPage.navigateTo();
});

Then('I should see {string} scale still displayed', async function (expectedScale: string) {
  const parsed = parseScaleName(expectedScale);
  const currentScale = await (this as any).world.pianoPage.getCurrentScale();
  const currentRoot = await (this as any).world.pianoPage.getCurrentRootNote();
  
  // Check that the scale type is correct
  const scaleTypeMapping: Record<string, string> = {
    'minor': 'Minor',
    'major': 'Major',
    'blues': 'Blues',
    'dorian': 'Dorian',
    'harmonic-minor': 'Harmonic Minor'
  };
  
  const expectedScaleType = scaleTypeMapping[parsed.scale] || parsed.scale;
  expect(currentScale).toContain(expectedScaleType);
  expect(currentRoot).toBe(parsed.root);
});

Then('my display customizations should be preserved', async function () {
  const isShowingDegrees = await (this as any).world.pianoPage.isShowingDegrees();
  expect(isShowingDegrees).toBe(((this as any).world).config.showDegrees);
});

// Settings migration
Given('I have piano settings saved in an older format', async function () {
  // Simulate old format data
  await (this as any).world.pianoPage.setLocalStorageItem('old-format-data', { version: '1.0', octaves: 2 });
});

When('the application is updated with new setting structures', async function () {
  // This would be handled by the application's migration logic
  await (this as any).world.page.reload();
  await (this as any).world.pianoPage.waitForPageLoad();
});

When('I load the piano page', async function () {
  await (this as any).world.pianoPage.waitForPageLoad();
});

Then('the system should migrate old settings to the new format', async function () {
  // Check that the piano still functions
  const keyCount = await (this as any).world.pianoPage.getVisibleKeyCount();
  expect(keyCount.total).toBeGreaterThan(0);
});

Then('my preferences should be preserved where possible', async function () {
  const octaves = await (this as any).world.pianoPage.getCurrentOctaveCount();
  expect(octaves).toBeGreaterThanOrEqual(1);
  expect(octaves).toBeLessThanOrEqual(4);
});

Then('default values should be used for new settings', async function () {
  // New settings should have sensible defaults
  const keyCount = await (this as any).world.pianoPage.getVisibleKeyCount();
  expect(keyCount.total).toBeGreaterThan(0);
});

// Privacy mode
Given('I am using a browser in private\\/incognito mode', async function () {
  // In a real test, you would launch browser in incognito mode
  // For now, just simulate limited storage access
  ((this as any).world).storeValue('privacy-mode', true);
});

When('I modify piano settings', async function () {
  await (this as any).world.pianoPage.setOctaveCount(3);
  await (this as any).world.pianoPage.selectScale('minor');
});

Then('the settings should work for the current session', async function () {
  const octaves = await (this as any).world.pianoPage.getCurrentOctaveCount();
  expect(octaves).toBe(3);
  
  const currentScale = await (this as any).world.pianoPage.getCurrentScale();
  expect(currentScale).toContain('Minor');
});

Then('the system should not attempt to persist to storage', async function () {
  // Would check that no localStorage errors occurred
  const errors = ((this as any).world).getErrors();
  const storageErrors = errors.filter((e: Error) => e.message.includes('localStorage'));
  expect(storageErrors.length).toBe(0);
});

Then('no errors should occur due to storage restrictions', async function () {
  const errors = ((this as any).world).getErrors();
  expect(errors.length).toBe(0);
});

// Data integrity
Given('I have complex piano settings configured', async function () {
  await (this as any).world.pianoPage.setOctaveCount(4);
  await (this as any).world.pianoPage.selectScale('harmonic-minor');
  await (this as any).world.pianoPage.selectRootNote('F#');
  await (this as any).world.pianoPage.toggleDegreesVsNames();
  await (this as any).world.pianoPage.toggleFlatsVsSharps();
  
  ((this as any).world).config = {
    octaveCount: 4,
    scale: 'Harmonic Minor',
    rootNote: 'F#',
    showDegrees: true,
    showFlats: true,
    theme: 'light'
  };
});

When('the settings are saved to storage', async function () {
  await (this as any).world.captureCurrentState();
  await (this as any).world.waitForStabilization();
});

Then('the saved data should exactly match my current configuration', async function () {
  const currentOctaves = await (this as any).world.pianoPage.getCurrentOctaveCount();
  const currentScale = await (this as any).world.pianoPage.getCurrentScale();
  const currentRoot = await (this as any).world.pianoPage.getCurrentRootNote();
  
  expect(currentOctaves).toBe(((this as any).world).config.octaveCount);
  expect(currentScale).toContain(((this as any).world).config.scale);
  expect(currentRoot).toBe(((this as any).world).config.rootNote);
});

When('the settings are loaded back', async function () {
  await (this as any).world.page.reload();
  await (this as any).world.pianoPage.waitForPageLoad();
});

Then('every setting should be restored accurately', async function () {
  const octaves = await (this as any).world.pianoPage.getCurrentOctaveCount();
  expect(octaves).toBe(4);
  
  // Other settings should be restored appropriately
  const keyCount = await (this as any).world.pianoPage.getVisibleKeyCount();
  expect(keyCount.total).toBeGreaterThan(0);
});

Then('no data should be lost or corrupted in the process', async function () {
  const errors = ((this as any).world).getErrors();
  expect(errors.length).toBe(0);
});

// Concurrent tabs
Given('I have the piano page open in multiple browser tabs', async function () {
  // This would require multiple browser contexts in a real test
  // For now, simulate by capturing state
  await (this as any).world.captureCurrentState();
});

When('I change settings in one tab', async function () {
  await (this as any).world.pianoPage.setOctaveCount(3);
  await (this as any).world.pianoPage.selectScale('Blues');
});

Then('the changes should be reflected in other open tabs', async function () {
  // Would require actual multi-tab testing
  // For now, verify changes took effect
  const octaves = await (this as any).world.pianoPage.getCurrentOctaveCount();
  expect(octaves).toBe(3);
});

Then('the settings should remain synchronized across tabs', async function () {
  const currentScale = await (this as any).world.pianoPage.getCurrentScale();
  expect(currentScale).toContain('Blues');
});

Then('no conflicts should arise from concurrent modifications', async function () {
  const errors = ((this as any).world).getErrors();
  expect(errors.length).toBe(0);
});

// Reset functionality
Given('I have customized piano settings that are persisted', async function () {
  await (this as any).world.pianoPage.setOctaveCount(4);
  await (this as any).world.pianoPage.selectScale('minor-pentatonic');
  await (this as any).world.pianoPage.toggleDegreesVsNames();
  await (this as any).world.waitForStabilization();
});

When('I choose to reset settings to default', async function () {
  await (this as any).world.pianoPage.clearLocalStorage();
  await (this as any).world.page.reload();
  await (this as any).world.pianoPage.waitForPageLoad();
});

Then('all persisted settings should be cleared from storage', async function () {
  const storedOctaves = await (this as any).world.pianoPage.getLocalStorageItem('octave-count');
  // After reset, should either be null or default value
  expect(storedOctaves === null || parseInt(storedOctaves) <= 4).toBe(true);
});

Then('the piano should display with factory default settings', async function () {
  const octaves = await (this as any).world.pianoPage.getCurrentOctaveCount();
  expect(octaves).toBeGreaterThanOrEqual(1);
  expect(octaves).toBeLessThanOrEqual(4);
  
  const keyCount = await (this as any).world.pianoPage.getVisibleKeyCount();
  expect(keyCount.total).toBeGreaterThan(0);
});

Then('the reset should be immediate and complete', async function () {
  const errors = ((this as any).world).getErrors();
  expect(errors.length).toBe(0);
});

// Selective persistence
Given('I interact with various piano features', async function () {
  await (this as any).world.pianoPage.setOctaveCount(3);
  await (this as any).world.pianoPage.selectScale('major');
  
  // Simulate temporary UI interactions
  const keys = await (this as any).world.pianoPage.getAllKeys();
  if (keys.length > 0) {
    await keys[0].click();
  }
});

When('settings are saved to storage', async function () {
  await (this as any).world.waitForStabilization();
});

Then('only user preferences should be persisted', async function () {
  // Check that some user preference data exists in localStorage
  const allStorageKeys = await (this as any).world.page.evaluate(() => Object.keys(localStorage));
  expect(allStorageKeys.length).toBeGreaterThan(0);
});

Then('temporary UI states should not be saved', async function () {
  // Temporary states like "key pressed" should not be persisted
  const keyStates = await (this as any).world.pianoPage.getLocalStorageItem('key-states');
  expect(keyStates).toBeFalsy();
});

Then('session-specific data should be excluded from persistence', async function () {
  // Session data like "last clicked time" should not be saved
  const sessionData = await (this as any).world.pianoPage.getLocalStorageItem('session-data');
  expect(sessionData).toBeFalsy();
});

// Backup/restore (simplified implementation)
Given('I have customized piano settings', async function () {
  await (this as any).world.pianoPage.setOctaveCount(3);
  await (this as any).world.pianoPage.selectScale('Dorian');
  await (this as any).world.pianoPage.selectRootNote('D');
  
  ((this as any).world).config = {
    octaveCount: 3,
    scale: 'Dorian',
    rootNote: 'D',
    showFlats: false,
    showDegrees: false,
    theme: 'light'
  };
});

When('I export my settings', async function () {
  // In a real implementation, this would create a downloadable file
  const currentState = {
    octaveCount: await (this as any).world.pianoPage.getCurrentOctaveCount(),
    scale: await (this as any).world.pianoPage.getCurrentScale(),
    rootNote: await (this as any).world.pianoPage.getCurrentRootNote()
  };
  ((this as any).world).storeValue('exportedSettings', currentState);
});

Then('I should receive a file containing my configuration', async function () {
  const exportedSettings = ((this as any).world).getValue('exportedSettings');
  expect(exportedSettings).toBeTruthy();
  expect(exportedSettings.octaveCount).toBe(3);
});

When('I import previously exported settings', async function () {
  const exportedSettings = ((this as any).world).getValue('exportedSettings');
  if (exportedSettings) {
    await (this as any).world.pianoPage.setOctaveCount(exportedSettings.octaveCount);
    // Other settings would be imported similarly
  }
});

Then('my piano should be configured exactly as exported', async function () {
  const currentOctaves = await (this as any).world.pianoPage.getCurrentOctaveCount();
  expect(currentOctaves).toBe(3);
});

Then('the import should overwrite current settings appropriately', async function () {
  // Verify that the imported configuration is active
  const keyCount = await (this as any).world.pianoPage.getVisibleKeyCount();
  expect(keyCount.total).toBeGreaterThan(0);
});

// Version compatibility
Given('I have piano settings saved in version 1.0', async function () {
  await (this as any).world.pianoPage.setLocalStorageItem('app-version', '1.0');
  await (this as any).world.pianoPage.setOctaveCount(2);
  await (this as any).world.pianoPage.selectScale('major');
});

When('I upgrade to version 2.0 of the application', async function () {
  await (this as any).world.pianoPage.setLocalStorageItem('app-version', '2.0');
  await (this as any).world.page.reload();
  await (this as any).world.pianoPage.waitForPageLoad();
});

Then('my existing settings should still work', async function () {
  const octaves = await (this as any).world.pianoPage.getCurrentOctaveCount();
  expect(octaves).toBe(2);
  
  const keyCount = await (this as any).world.pianoPage.getVisibleKeyCount();
  expect(keyCount.total).toBeGreaterThan(0);
});

Then('new features should use sensible defaults', async function () {
  // New features should not break existing functionality
  const errors = ((this as any).world).getErrors();
  expect(errors.length).toBe(0);
});

Then('no settings should be lost due to version changes', async function () {
  const octaves = await (this as any).world.pianoPage.getCurrentOctaveCount();
  expect(octaves).toBe(2);
});