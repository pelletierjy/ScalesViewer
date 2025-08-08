import { Page, Browser, BrowserContext } from '@playwright/test';
import { PianoPage } from '../pages/PianoPage';
import { GuitarPage } from '../pages/GuitarPage';

export interface TestConfig {
  scale: string;
  rootNote: string;
  octaveCount: number;
  showFlats: boolean;
  showDegrees: boolean;
  theme: 'light' | 'dark';
}

export interface AudioTestData {
  mockEnabled: boolean;
  playbackHistory: string[];
}

export interface ResponsiveTestData {
  currentViewport: { width: number; height: number };
  testedViewports: Array<{ name: string; width: number; height: number; passed: boolean }>;
}

export class TestWorld {
  public page!: Page;
  public browser!: Browser;
  public context!: BrowserContext;
  public pianoPage!: PianoPage;
  public guitarPage!: GuitarPage;
  
  // Test state
  public config: TestConfig = {
    scale: 'Major',
    rootNote: 'C',
    octaveCount: 2,
    showFlats: false,
    showDegrees: false,
    theme: 'light'
  };
  
  public audio: AudioTestData = {
    mockEnabled: false,
    playbackHistory: []
  };
  
  public responsive: ResponsiveTestData = {
    currentViewport: { width: 1920, height: 1080 },
    testedViewports: []
  };
  
  // Storage for test data
  public testData: Map<string, any> = new Map();
  public screenshots: string[] = [];
  public errors: Error[] = [];

  async initialize(page: Page): Promise<void> {
    this.page = page;
    this.context = page.context();
    this.browser = this.context.browser()!;
    this.pianoPage = new PianoPage(page);
    this.guitarPage = new GuitarPage(page);
  }

  async setupTest(): Promise<void> {
    // Clear localStorage only after navigating to a page
    // This will be called after navigation
    await this.pianoPage.mockAudioContext();
    this.audio.mockEnabled = true;
    this.audio.playbackHistory = [];
    this.errors = [];
  }

  async teardownTest(): Promise<void> {
    // Take screenshot on failure if needed
    if (this.errors.length > 0) {
      const screenshot = await this.pianoPage.takeScreenshot(`error-${Date.now()}`);
      this.screenshots.push(`error-${Date.now()}.png`);
    }
    
    // Clear test state
    this.testData.clear();
  }

  // Configuration helpers
  async applyConfiguration(): Promise<void> {
    if (this.config.theme === 'dark') {
      const currentTheme = await this.pianoPage.isDarkMode();
      if (!currentTheme) {
        await this.pianoPage.toggleTheme();
      }
    }
    
    await this.pianoPage.setOctaveCount(this.config.octaveCount as 1 | 2 | 3 | 4);
    await this.pianoPage.selectScale(this.config.scale);
    await this.pianoPage.selectRootNote(this.config.rootNote);
    
    if (this.config.showFlats !== await this.pianoPage.isShowingFlats()) {
      await this.pianoPage.toggleFlatsVsSharps();
    }
    
    if (this.config.showDegrees !== await this.pianoPage.isShowingDegrees()) {
      await this.pianoPage.toggleDegreesVsNames();
    }
  }

  async captureCurrentState(): Promise<void> {
    const currentState = {
      octaveCount: await this.pianoPage.getCurrentOctaveCount(),
      scale: await this.pianoPage.getCurrentScale(),
      rootNote: await this.pianoPage.getCurrentRootNote(),
      showFlats: await this.pianoPage.isShowingFlats(),
      showDegrees: await this.pianoPage.isShowingDegrees(),
      isDarkMode: await this.pianoPage.isDarkMode()
    };
    
    this.testData.set('currentPianoState', currentState);
  }

  // Audio testing helpers
  trackAudioPlayback(noteName: string): void {
    this.audio.playbackHistory.push(noteName);
  }

  getLastPlayedNote(): string | undefined {
    return this.audio.playbackHistory[this.audio.playbackHistory.length - 1];
  }

  clearAudioHistory(): void {
    this.audio.playbackHistory = [];
  }

  // Responsive testing helpers
  async testViewport(name: string, width: number, height: number): Promise<boolean> {
    try {
      await this.pianoPage.setViewportSize(width, height);
      this.responsive.currentViewport = { width, height };
      
      // Check if piano is still functional
      const isVisible = await this.page.locator('svg').first().isVisible();
      const keyCount = await this.pianoPage.getVisibleKeyCount();
      const isPassed = isVisible && keyCount.total > 0;
      
      this.responsive.testedViewports.push({
        name,
        width,
        height,
        passed: isPassed
      });
      
      return isPassed;
    } catch (error) {
      this.errors.push(error as Error);
      return false;
    }
  }

  // Data storage helpers
  storeValue(key: string, value: any): void {
    this.testData.set(key, value);
  }

  getValue(key: string): any {
    return this.testData.get(key);
  }

  hasValue(key: string): boolean {
    return this.testData.has(key);
  }

  // Error handling
  addError(error: Error | string): void {
    if (typeof error === 'string') {
      this.errors.push(new Error(error));
    } else {
      this.errors.push(error);
    }
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): Error[] {
    return [...this.errors];
  }

  // Utility methods
  async waitForStabilization(ms: number = 500): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  async retry<T>(
    operation: () => Promise<T>,
    maxAttempts: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxAttempts) {
          await this.waitForStabilization(delayMs);
        }
      }
    }
    
    throw lastError!;
  }

  // Debugging helpers
  async debugCurrentState(): Promise<void> {
    const state = {
      url: this.page.url(),
      viewport: await this.page.viewportSize(),
      pianoConfig: {
        octaveCount: await this.pianoPage.getCurrentOctaveCount(),
        scale: await this.pianoPage.getCurrentScale(),
        rootNote: await this.pianoPage.getCurrentRootNote(),
        theme: await this.pianoPage.isDarkMode() ? 'dark' : 'light'
      },
      keyCount: await this.pianoPage.getVisibleKeyCount(),
      highlightedNotes: await this.pianoPage.getHighlightedNotes()
    };
    
    console.log('Current Test State:', JSON.stringify(state, null, 2));
  }
}
