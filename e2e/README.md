# E2E Testing for ScalesViewer Piano Component

This directory contains comprehensive End-to-End (E2E) tests for the ScalesViewer Piano component using **Playwright** and **Cucumber BDD** frameworks.

## 🏗️ Architecture Overview

### Testing Frameworks
- **Playwright**: Cross-browser E2E testing with TypeScript support
- **Cucumber**: Behavior-Driven Development (BDD) with Gherkin syntax
- **Page Object Model**: Maintainable and reusable test architecture
- **Business Logic Layer**: Domain-specific test operations

### Directory Structure
```
e2e/
├── features/piano/           # BDD feature files in Gherkin
│   ├── piano-keyboard-rendering.feature
│   ├── piano-scale-visualization.feature
│   ├── piano-user-interactions.feature
│   ├── piano-configuration.feature
│   ├── piano-persistence.feature
│   └── piano-responsive-design.feature
├── step-definitions/         # Cucumber step implementations
│   ├── piano-keyboard-steps.ts
│   ├── piano-scale-steps.ts
│   ├── piano-interaction-steps.ts
│   └── piano-configuration-steps.ts
├── pages/                    # Page Object Model classes
│   └── PianoPage.ts
├── support/                  # Test utilities and helpers
│   ├── global-setup.ts
│   ├── global-teardown.ts
│   ├── test-world.ts
│   └── test-helpers.ts
├── fixtures/                 # Test data and configurations
│   └── piano-test-data.ts
├── hooks/                    # Cucumber lifecycle hooks
│   └── world.ts
└── piano/                    # Traditional Playwright tests
    └── piano-basic.spec.ts
```

## 🎹 Piano Component Coverage

### Core Features Tested
1. **Keyboard Rendering** - Visual layout, key positioning, responsive design
2. **Scale Visualization** - Note highlighting, root emphasis, color coding  
3. **User Interactions** - Click-to-play, touch support, keyboard navigation
4. **Configuration** - Octave count, scale selection, display preferences
5. **State Persistence** - localStorage, Redux state, session continuity
6. **Responsive Design** - Mobile, tablet, desktop layouts

### Musical Domain Features
- **60+ Musical Scales** - Major, Minor, Pentatonic, Blues, Modal scales
- **Scale Theory** - Root notes, scale degrees, intervals, transposition
- **Audio Playback** - Note frequencies, chord playing, sustain behavior
- **Visual Feedback** - Note names, scale degrees, flats/sharps toggle

## 🚀 Getting Started

### Prerequisites
```bash
# Install dependencies
npm install

# Install Playwright browsers
npm run playwright:install
npm run playwright:install-deps
```

### Running Tests

#### Playwright E2E Tests
```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug tests step by step
npm run test:e2e:debug

# Run Piano-specific tests only
npm run test:e2e:piano

# View HTML report
npm run test:e2e:report
```

#### Cucumber BDD Tests
```bash
# Run all BDD scenarios
npm run test:cucumber

# Run Piano-specific scenarios
npm run test:cucumber:piano

# Run smoke tests only
npm run test:cucumber:smoke

# Generate HTML report
npm run test:cucumber:report
```

### Environment Variables
```bash
# Set headless mode (default: true in CI)
HEADLESS=false

# Enable video recording
VIDEO=true

# Slow motion for debugging
SLOW_MO=1000

# Base URL (default: http://localhost:3000)
BASE_URL=http://localhost:3000

# Cucumber tags filter
CUCUMBER_TAGS="@smoke and not @skip"
```

## 📊 Test Categories

### By Priority
- `@smoke` - Critical functionality tests
- `@regression` - Full feature coverage
- `@accessibility` - A11y compliance tests

### By Feature
- `@piano` - Piano component tests
- `@keyboard` - Keyboard rendering tests
- `@scale` - Scale visualization tests
- `@interaction` - User interaction tests
- `@configuration` - Settings tests
- `@responsive` - Multi-device tests

### By Device
- `@mobile` - Mobile device tests
- `@tablet` - Tablet device tests
- `@desktop` - Desktop tests

## 🎯 Test Data & Scenarios

### Musical Test Data
- **Scale Definitions**: 60+ scales with correct note patterns
- **Note Frequencies**: Audio validation data
- **Chord Progressions**: Harmonic interaction tests
- **Enharmonic Equivalents**: Sharp/flat notation tests

### Test Scenarios
- **Basic Functionality**: Default states, core interactions
- **Edge Cases**: Invalid inputs, boundary conditions
- **Performance**: Rapid interactions, memory usage
- **Accessibility**: Screen readers, keyboard navigation

## 🔧 Page Object Model

### PianoPage Class
```typescript
class PianoPage {
  // Navigation
  async navigateTo(): Promise<void>
  async waitForPageLoad(): Promise<void>

  // Keyboard Interaction
  async clickPianoKey(keyIndex: number): Promise<void>
  async clickNoteByName(noteName: string): Promise<void>
  
  // Configuration
  async setOctaveCount(count: 1 | 2 | 3 | 4): Promise<void>
  async selectScale(scaleName: string): Promise<void>
  async selectRootNote(rootNote: string): Promise<void>
  
  // Verification
  async verifyScalePattern(expectedNotes: string[]): Promise<boolean>
  async verifyRootNoteEmphasis(rootNote: string): Promise<boolean>
}
```

### TestWorld Class
```typescript
class TestWorld {
  // Configuration state
  public config: TestConfig
  public audio: AudioTestData
  public responsive: ResponsiveTestData
  
  // Helper methods
  async applyConfiguration(): Promise<void>
  async captureCurrentState(): Promise<void>
  async testViewport(name: string, width: number, height: number): Promise<boolean>
}
```

## 📝 BDD Feature Examples

### Gherkin Scenario
```gherkin
Feature: Piano Scale Visualization
  As a music student
  I want to see scale patterns highlighted on the piano keyboard
  So that I can learn and understand different musical scales

  @smoke @scale-display
  Scenario: Display scale notes on piano keyboard
    Given I am on the piano page
    And I have selected "C Major" scale
    When the scale is applied to the keyboard
    Then I should see the C Major scale notes highlighted
    And the highlighted notes should be C, D, E, F, G, A, B
    And non-scale notes should not be highlighted
```

### Step Definition
```typescript
Given('I have selected {string} scale', async function (scaleName: string) {
  world.config.scale = scaleName;
  await world.pianoPage.selectScale(scaleName);
  await world.waitForStabilization();
});

Then('I should see the C Major scale notes highlighted', async function () {
  const expectedNotes = scaleTestData.majorScaleNotes['C'];
  const isPatternCorrect = await world.pianoPage.verifyScalePattern(expectedNotes);
  expect(isPatternCorrect).toBe(true);
});
```

## 🐛 Debugging & Troubleshooting

### Common Issues
1. **Audio Context Errors**: Tests mock audio to prevent autoplay issues
2. **Timing Issues**: Use `waitForStabilization()` after state changes
3. **Element Not Found**: Check selectors in PianoPage class
4. **Viewport Issues**: Ensure responsive test setup

### Debug Commands
```bash
# Debug specific test
npm run test:e2e:debug -- --grep "should highlight C Major scale"

# Run with verbose logging
DEBUG=pw:api npm run test:e2e

# Generate trace files
PLAYWRIGHT_TRACE=on npm run test:e2e
```

### Screenshots & Videos
- Screenshots: `test-results/` directory
- Videos: Only on failure (configurable)
- Traces: Use `--trace on` for detailed debugging

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npm run playwright:install-deps

- name: Run E2E tests
  run: npm run test:e2e

- name: Run BDD tests
  run: npm run test:cucumber
```

### Test Reports
- **Playwright HTML Report**: Interactive test results
- **Cucumber HTML Report**: BDD scenario results
- **Screenshots**: Failure evidence
- **Videos**: Test execution recordings

## 🎼 Musical Domain Knowledge

### Scales Tested
- **Major Scales**: All 12 keys with correct sharps/flats
- **Minor Scales**: Natural, harmonic, melodic variations
- **Modal Scales**: Dorian, Phrygian, Lydian, Mixolydian, etc.
- **Pentatonic Scales**: Major and minor pentatonic patterns
- **Blues Scales**: Traditional and modern variations
- **Exotic Scales**: World music scales and modes

### Music Theory Validation
- **Interval Relationships**: Correct semitone distances
- **Enharmonic Equivalents**: F# = Gb, C# = Db, etc.
- **Circle of Fifths**: Key signature relationships
- **Scale Degrees**: Roman numeral analysis support

This E2E test suite provides comprehensive coverage of the Piano component with a focus on both technical functionality and musical accuracy, ensuring the application serves as an effective tool for music education.