import { Page, Locator, expect } from '@playwright/test';

export class PianoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Selectors
  private get pianoKeyboard() {
    return this.page.locator('svg').first(); // Main piano SVG
  }

  private get whiteKeys() {
    return this.page.locator('rect[fill="#ffffff"], rect[fill="#4b5563"]'); // White keys in light/dark mode
  }

  private get blackKeys() {
    return this.page.locator('rect[fill="#000000"], rect[fill="#1f2937"]'); // Black keys in light/dark mode
  }

  private get scaleNotes() {
    return this.page.locator('circle'); // Highlighted notes are circles
  }

  private get octaveSelector() {
    return this.page.locator('#octave-count');
  }

  private get scaleSelector() {
    return this.page.locator('#scale-type');
  }

  private get rootNoteSelector() {
    return this.page.locator('#root-note');
  }

  private get flatsToggle() {
    return this.page.locator('button').filter({ hasText: /[♯♭]/ });
  }

  private get degreesToggle() {
    return this.page.locator('button').filter({ hasText: /[ABC123]/ });
  }

  private get themeToggle() {
    return this.page.locator('button').filter({ hasText: /[☀️🌙]/ });
  }

  // Navigation methods
  async navigateTo(baseURL: string = 'http://localhost:3000'): Promise<void> {
    await this.page.goto(`${baseURL}/piano`);
    await this.waitForPageLoad();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.pianoKeyboard.waitFor({ state: 'visible' });
    // Wait for Redux to initialize
    await this.page.waitForFunction(() => {
      return typeof window !== 'undefined';
    });
  }

  // Keyboard interaction methods
  async clickPianoKey(keyIndex: number): Promise<void> {
    const keys = await this.getAllKeys();
    if (keyIndex < keys.length) {
      await keys[keyIndex].click();
    }
  }

  async clickNoteByName(noteName: string): Promise<void> {
    // Find the note by looking for text content in circles
    const note = this.page.locator(`text >> "${noteName}"`).first();
    await note.click();
  }

  async getVisibleKeyCount(): Promise<{ white: number; black: number; total: number }> {
    const whiteCount = await this.whiteKeys.count();
    const blackCount = await this.blackKeys.count();
    return {
      white: whiteCount,
      black: blackCount,
      total: whiteCount + blackCount
    };
  }

  async getAllKeys(): Promise<Locator[]> {
    const whiteKeys = await this.whiteKeys.all();
    const blackKeys = await this.blackKeys.all();
    return [...whiteKeys, ...blackKeys];
  }

  // Configuration methods
  async setOctaveCount(count: 1 | 2 | 3 | 4): Promise<void> {
    await this.octaveSelector.selectOption(count.toString());
    await this.page.waitForTimeout(300); // Wait for re-render
  }

  async selectScale(scaleName: string): Promise<void> {
    if (await this.scaleSelector.isVisible()) {
      await this.scaleSelector.selectOption(scaleName);
      await this.page.waitForTimeout(300);
    }
  }

  async selectRootNote(rootNote: string): Promise<void> {
    if (await this.rootNoteSelector.isVisible()) {
      await this.rootNoteSelector.selectOption(rootNote);
      await this.page.waitForTimeout(300);
    }
  }

  async toggleFlatsVsSharps(): Promise<void> {
    if (await this.flatsToggle.isVisible()) {
      await this.flatsToggle.click();
      await this.page.waitForTimeout(200);
    }
  }

  async toggleDegreesVsNames(): Promise<void> {
    if (await this.degreesToggle.isVisible()) {
      await this.degreesToggle.click();
      await this.page.waitForTimeout(200);
    }
  }

  async toggleTheme(): Promise<void> {
    if (await this.themeToggle.isVisible()) {
      await this.themeToggle.click();
      await this.page.waitForTimeout(500); // Wait for theme transition
    }
  }

  // State inspection methods
  async getCurrentOctaveCount(): Promise<number> {
    const value = await this.octaveSelector.inputValue();
    return parseInt(value, 10);
  }

  async getCurrentScale(): Promise<string> {
    if (await this.scaleSelector.isVisible()) {
      // For select elements, get the selected option text
      const selectedValue = await this.scaleSelector.locator('option:checked').textContent();
      return selectedValue || '';
    }
    return '';
  }

  async getCurrentRootNote(): Promise<string> {
    if (await this.rootNoteSelector.isVisible()) {
      // For select elements, get the selected option text
      const selectedValue = await this.rootNoteSelector.locator('option:checked').textContent();
      return selectedValue || '';
    }
    return '';
  }

  async isShowingFlats(): Promise<boolean> {
    // Check if any flat symbols (♭) are visible in the piano
    const flatSymbols = this.page.locator('text=♭');
    return await flatSymbols.count() > 0;
  }

  async isShowingDegrees(): Promise<boolean> {
    // Check if scale degrees (1, 2, 3, etc.) are shown instead of note names
    const degreeNumbers = this.page.locator('text=/^[1-7]$/');
    return await degreeNumbers.count() > 0;
  }

  async isDarkMode(): Promise<boolean> {
    const html = this.page.locator('html');
    const classList = await html.getAttribute('class');
    return classList?.includes('dark') || false;
  }

  // Scale visualization methods
  async getHighlightedNotes(): Promise<string[]> {
    const highlightedNotes: string[] = [];
    const circles = await this.scaleNotes.all();
    
    for (const circle of circles) {
      const text = await circle.locator('text').textContent();
      if (text) {
        highlightedNotes.push(text.trim());
      }
    }
    
    return highlightedNotes;
  }

  async getScaleNoteCount(): Promise<number> {
    return await this.scaleNotes.count();
  }

  async verifyScalePattern(expectedNotes: string[]): Promise<boolean> {
    const highlightedNotes = await this.getHighlightedNotes();
    const octaveCount = await this.getCurrentOctaveCount();
    
    // Each note should appear once per octave
    for (const note of expectedNotes) {
      const noteCount = highlightedNotes.filter(n => n === note).length;
      if (noteCount !== octaveCount) {
        return false;
      }
    }
    
    return true;
  }

  async verifyRootNoteEmphasis(rootNote: string): Promise<boolean> {
    // Check if root notes have different styling (could be color, size, etc.)
    const rootNoteElements = this.page.locator(`text >> "${rootNote}"`);
    const count = await rootNoteElements.count();
    const expectedCount = await this.getCurrentOctaveCount();
    
    return count === expectedCount;
  }

  // Responsive design methods
  async setViewportSize(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
    await this.page.waitForTimeout(500); // Wait for responsive changes
  }

  async isElementInViewport(selector: string): Promise<boolean> {
    return await this.page.evaluate((sel) => {
      const element = document.querySelector(sel);
      if (!element) return false;
      
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }, selector);
  }

  async checkKeyboardResponsiveness(): Promise<{ mobile: boolean; tablet: boolean; desktop: boolean }> {
    const results = { mobile: false, tablet: false, desktop: false };
    
    // Test mobile (375px)
    await this.setViewportSize(375, 667);
    results.mobile = await this.pianoKeyboard.isVisible();
    
    // Test tablet (768px)
    await this.setViewportSize(768, 1024);
    results.tablet = await this.pianoKeyboard.isVisible();
    
    // Test desktop (1920px)
    await this.setViewportSize(1920, 1080);
    results.desktop = await this.pianoKeyboard.isVisible();
    
    return results;
  }

  // Storage and persistence methods
  async clearLocalStorage(): Promise<void> {
    await this.page.evaluate(() => localStorage.clear());
  }

  async getLocalStorageItem(key: string): Promise<any> {
    return await this.page.evaluate((storageKey) => {
      const item = localStorage.getItem(storageKey);
      if (!item) return null;
      
      // Try to parse as JSON, if it fails return as string
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    }, key);
  }

  async setLocalStorageItem(key: string, value: any): Promise<void> {
    await this.page.evaluate(
      ({ storageKey, storageValue }) => {
        localStorage.setItem(storageKey, JSON.stringify(storageValue));
      },
      { storageKey: key, storageValue: value }
    );
  }

  // Audio testing methods
  async mockAudioContext(): Promise<void> {
    await this.page.addInitScript(() => {
      // Mock AudioContext for testing
      class MockAudioContext {
        state = 'running';
        destination = {};
        currentTime = 0;
        
        createOscillator() {
          return {
            connect: () => {},
            start: () => {},
            stop: () => {},
            frequency: { value: 440 },
            type: 'sine'
          };
        }
        
        createGain() {
          return {
            connect: () => {},
            gain: { value: 1 }
          };
        }
        
        resume() {
          return Promise.resolve();
        }
        
        close() {
          return Promise.resolve();
        }
      }
      
      // Replace global AudioContext
      (window as any).AudioContext = MockAudioContext;
      (window as any).webkitAudioContext = MockAudioContext;
    });
  }

  async isAudioPlaying(): Promise<boolean> {
    // This would need to be implemented based on the actual audio implementation
    // For now, we'll check if the audio context exists and is in running state
    return await this.page.evaluate(() => {
      const audioContext = (window as any).audioContext;
      return audioContext && audioContext.state === 'running';
    });
  }

  // Accessibility methods
  async checkKeyboardNavigation(): Promise<boolean> {
    // Test basic keyboard navigation
    await this.page.keyboard.press('Tab');
    const focusedElement = await this.page.locator(':focus').first();
    return await focusedElement.isVisible();
  }

  async getAriaLabel(element: Locator): Promise<string | null> {
    return await element.getAttribute('aria-label');
  }

  // Utility methods
  async takeScreenshot(name: string): Promise<Buffer> {
    return await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: true
    });
  }

  async waitForAnimations(): Promise<void> {
    await this.page.waitForTimeout(500); // Wait for CSS transitions
  }

  async scrollToElement(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }
}