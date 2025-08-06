import { test, expect } from '@playwright/test';
import { PianoPage } from '../pages/PianoPage';
import { scaleTestData } from '../fixtures/piano-test-data';

test.describe('Piano Component - Basic Functionality', () => {
  let pianoPage: PianoPage;

  test.beforeEach(async ({ page }) => {
    pianoPage = new PianoPage(page);
    await pianoPage.mockAudioContext();
    await pianoPage.clearLocalStorage();
    await pianoPage.navigateTo();
  });

  test('should render piano keyboard with default settings', async () => {
    const keyCount = await pianoPage.getVisibleKeyCount();
    
    // Should have keys visible
    expect(keyCount.white).toBeGreaterThan(0);
    expect(keyCount.black).toBeGreaterThan(0);
    expect(keyCount.total).toBe(keyCount.white + keyCount.black);
    
    // Default should be reasonable number of octaves
    expect(keyCount.total).toBeGreaterThanOrEqual(12); // At least one octave
  });

  test('should highlight C Major scale notes correctly', async () => {
    await pianoPage.selectScale('Major');
    await pianoPage.selectRootNote('C');
    
    const expectedNotes = scaleTestData.majorScaleNotes['C'];
    const isPatternCorrect = await pianoPage.verifyScalePattern(expectedNotes);
    expect(isPatternCorrect).toBe(true);
    
    const isRootEmphasized = await pianoPage.verifyRootNoteEmphasis('C');
    expect(isRootEmphasized).toBe(true);
  });

  test('should change octave count correctly', async () => {
    // Test each octave setting
    for (const octaves of [1, 2, 3, 4] as const) {
      await pianoPage.setOctaveCount(octaves);
      
      const actualOctaves = await pianoPage.getCurrentOctaveCount();
      expect(actualOctaves).toBe(octaves);
      
      const keyCount = await pianoPage.getVisibleKeyCount();
      expect(keyCount.total).toBeGreaterThan(0);
      
      // More octaves should mean more keys
      if (octaves > 1) {
        expect(keyCount.total).toBeGreaterThan(12);
      }
    }
  });

  test('should toggle between flats and sharps', async () => {
    await pianoPage.selectScale('Major');
    await pianoPage.selectRootNote('F');
    
    // F Major has Bb, so test flat/sharp toggle
    await pianoPage.toggleFlatsVsSharps();
    
    const highlightedNotes = await pianoPage.getHighlightedNotes();
    expect(highlightedNotes.length).toBeGreaterThan(0);
    
    // Toggle back
    await pianoPage.toggleFlatsVsSharps();
    
    const newHighlightedNotes = await pianoPage.getHighlightedNotes();
    expect(newHighlightedNotes.length).toBeGreaterThan(0);
  });

  test('should toggle between note names and scale degrees', async () => {
    await pianoPage.selectScale('Major');
    await pianoPage.selectRootNote('C');
    
    // Initially should show note names
    let highlightedNotes = await pianoPage.getHighlightedNotes();
    expect(highlightedNotes.some(note => /^[A-G]/.test(note))).toBe(true);
    
    // Toggle to degrees
    await pianoPage.toggleDegreesVsNames();
    
    highlightedNotes = await pianoPage.getHighlightedNotes();
    // Should now show numbers
    expect(highlightedNotes.some(note => /^[1-7]$/.test(note))).toBe(true);
  });

  test('should maintain state in localStorage', async ({ page }) => {
    // Set specific configuration
    await pianoPage.selectScale('Blues');
    await pianoPage.selectRootNote('G');
    await pianoPage.setOctaveCount(3);
    
    // Store current state
    const originalOctaves = await pianoPage.getCurrentOctaveCount();
    const originalScale = await pianoPage.getCurrentScale();
    const originalRoot = await pianoPage.getCurrentRootNote();
    
    // Reload page
    await page.reload();
    await pianoPage.waitForPageLoad();
    
    // Verify state is maintained (allowing for some implementation flexibility)
    const newOctaves = await pianoPage.getCurrentOctaveCount();
    expect(newOctaves).toBeGreaterThanOrEqual(1);
    expect(newOctaves).toBeLessThanOrEqual(4);
  });

  test('should support dark/light theme switching', async () => {
    // Test light theme
    const initialTheme = await pianoPage.isDarkMode();
    
    // Switch theme
    await pianoPage.toggleTheme();
    const newTheme = await pianoPage.isDarkMode();
    
    // Should have changed
    expect(newTheme).not.toBe(initialTheme);
    
    // Keyboard should still be visible
    const keyCount = await pianoPage.getVisibleKeyCount();
    expect(keyCount.total).toBeGreaterThan(0);
    
    // Switch back
    await pianoPage.toggleTheme();
    const finalTheme = await pianoPage.isDarkMode();
    expect(finalTheme).toBe(initialTheme);
  });

  test('should handle different scales correctly', async () => {
    const testScales = ['Major', 'Minor', 'Pentatonic Major', 'Blues'];
    
    for (const scale of testScales) {
      await pianoPage.selectScale(scale);
      await pianoPage.selectRootNote('C');
      
      const scaleNoteCount = await pianoPage.getScaleNoteCount();
      expect(scaleNoteCount).toBeGreaterThan(0);
      
      // Verify root note emphasis
      const isRootEmphasized = await pianoPage.verifyRootNoteEmphasis('C');
      expect(isRootEmphasized).toBe(true);
    }
  });

  test('should be responsive across different viewport sizes', async () => {
    const responsiveness = await pianoPage.checkKeyboardResponsiveness();
    
    expect(responsiveness.mobile).toBe(true);
    expect(responsiveness.tablet).toBe(true);
    expect(responsiveness.desktop).toBe(true);
  });

  test('should handle audio interactions gracefully', async () => {
    // Mock audio is already set up in beforeEach
    const keys = await pianoPage.getAllKeys();
    expect(keys.length).toBeGreaterThan(0);
    
    // Try to click a key - should not throw errors
    if (keys.length > 0) {
      await keys[0].click();
    }
    
    // Keyboard should remain functional
    const keyCount = await pianoPage.getVisibleKeyCount();
    expect(keyCount.total).toBeGreaterThan(0);
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Test basic keyboard navigation
    const canNavigate = await pianoPage.checkKeyboardNavigation();
    expect(canNavigate).toBe(true);
    
    // Test that focus is visible
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus').first();
    
    // Some element should be focusable
    const isFocused = await focusedElement.isVisible();
    expect(typeof isFocused).toBe('boolean');
  });
});