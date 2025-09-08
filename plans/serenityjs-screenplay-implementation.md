# SerenityJS Screenplay Implementation Guide

## Overview
This guide details the implementation of the Screenplay pattern using SerenityJS for the ScalesViewer project, featuring the Jean-Yves expert user persona.

## Architecture

### Directory Structure
```
src/e2e/
├── screenplay/
│   ├── actors/
│   │   ├── JeanYves.ts          # Expert user persona
│   │   └── RegularUser.ts       # Standard user persona
│   ├── abilities/
│   │   ├── BrowseTheWeb.ts      # Web navigation capability
│   │   ├── PlayMusic.ts         # Audio interaction capability
│   │   └── AnalyzeScales.ts     # Musical analysis capability
│   ├── tasks/
│   │   ├── guitar/
│   │   │   ├── NavigateToGuitarPage.ts
│   │   │   ├── SelectTuning.ts
│   │   │   ├── CreateCustomTuning.ts
│   │   │   └── VerifyFretboardVisualization.ts
│   │   ├── piano/
│   │   │   ├── NavigateToPianoPage.ts
│   │   │   ├── SelectScale.ts
│   │   │   ├── TestNotePlayback.ts
│   │   │   └── VerifyKeyboardVisualization.ts
│   │   └── common/
│   │       ├── NavigateToInstrument.ts
│   │       ├── SelectScale.ts
│   │       └── VerifyVisualization.ts
│   ├── interactions/
│   │   ├── Click.ts
│   │   ├── Enter.ts
│   │   ├── Select.ts
│   │   ├── Wait.ts
│   │   └── PlayAudio.ts
│   ├── questions/
│   │   ├── ScaleVisualization.ts
│   │   ├── NoteAccuracy.ts
│   │   ├── AudioPlayback.ts
│   │   └── PageTitle.ts
│   ├── page-elements/
│   │   ├── GuitarPageElements.ts
│   │   ├── PianoPageElements.ts
│   │   └── CommonElements.ts
│   └── support/
│       ├── TestWorld.ts
│       └── serenity.config.ts
├── features/
│   ├── expert/
│   │   ├── guitar-expert-features/
│   │   └── piano-expert-features/
│   └── regression/
└── step-definitions/
    ├── expert-steps/
    └── common-steps/
```

## Core Components

### 1. Actors

#### JeanYves.ts - Expert Persona
```typescript
import { Actor } from '@serenity-js/core';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { PlayMusic } from '../abilities/PlayMusic';
import { AnalyzeScales } from '../abilities/AnalyzeScales';

export class JeanYves extends Actor {
    static called(name: string): JeanYves {
        return new JeanYves(name);
    }

    static withExpertCapabilities(): Actor {
        return Actor.named('Jean-Yves')
            .whoCan(
                BrowseTheWeb.using(browser),
                PlayMusic.withPrecision(),
                AnalyzeScales.atExpertLevel()
            );
    }
}
```

### 2. Abilities

#### BrowseTheWeb.ts
```typescript
import { Ability, Actor } from '@serenity-js/core';
import { Page } from '@playwright/test';

export class BrowseTheWeb implements Ability {
    constructor(private page: Page) {}

    static using(page: Page): BrowseTheWeb {
        return new BrowseTheWeb(page);
    }

    static asActor(actor: Actor): BrowseTheWeb {
        return actor.abilityTo(BrowseTheWeb);
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async getPage(): Promise<Page> {
        return this.page;
    }
}
```

#### PlayMusic.ts
```typescript
import { Ability } from '@serenity-js/core';

export class PlayMusic implements Ability {
    constructor(private precision: 'standard' | 'expert' = 'standard') {}

    static withPrecision(): PlayMusic {
        return new PlayMusic('expert');
    }

    static atBasicLevel(): PlayMusic {
        return new PlayMusic('standard');
    }

    getPrecision(): string {
        return this.precision;
    }
}
```

### 3. Tasks

#### NavigateToGuitarPage.ts
```typescript
import { Task } from '@serenity-js/core';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Click } from '../interactions/Click';
import { CommonElements } from '../page-elements/CommonElements';

export class NavigateToGuitarPage implements Task {
    static forExpert(): Task {
        return new NavigateToGuitarPage('expert');
    }

    static forRegularUser(): Task {
        return new NavigateToGuitarPage('standard');
    }

    constructor(private userType: 'expert' | 'standard') {}

    async performAs(actor: Actor): Promise<void> {
        const browse = BrowseTheWeb.asActor(actor);
        
        if (this.userType === 'expert') {
            await actor.attemptsTo(
                Click.on(CommonElements.navigationMenu()),
                Click.on(CommonElements.guitarLink()),
                Wait.forLoad()
            );
        } else {
            await actor.attemptsTo(
                Click.on(CommonElements.guitarLink())
            );
        }
    }
}
```

#### CreateCustomTuning.ts (Expert Level)
```typescript
import { Task } from '@serenity-js/core';
import { Enter } from '../interactions/Enter';
import { Click } from '../interactions/Click';
import { Select } from '../interactions/Select';
import { GuitarPageElements } from '../page-elements/GuitarPageElements';

export class CreateCustomTuning implements Task {
    static withComplexIntervals(): Task {
        return new CreateCustomTuning('complex');
    }

    static withStandardIntervals(): Task {
        return new CreateCustomTuning('standard');
    }

    constructor(private complexity: 'complex' | 'standard') {}

    async performAs(actor: Actor): Promise<void> {
        await actor.attemptsTo(
            Click.on(GuitarPageElements.customTuningButton()),
            Enter.theValue('Expert Tuning').into(GuitarPageElements.tuningNameInput())
        );

        if (this.complexity === 'complex') {
            await this.enterComplexTuning(actor);
        } else {
            await this.enterStandardTuning(actor);
        }

        await actor.attemptsTo(
            Click.on(GuitarPageElements.saveTuningButton())
        );
    }

    private async enterComplexTuning(actor: Actor): Promise<void> {
        // Expert-level complex tuning configuration
        const complexIntervals = ['D2', 'A2', 'D3', 'G3', 'A#3', 'D4'];
        for (let i = 0; i < complexIntervals.length; i++) {
            await actor.attemptsTo(
                Select.value(complexIntervals[i]).from(GuitarPageElements.stringTuningSelect(i))
            );
        }
    }

    private async enterStandardTuning(actor: Actor): Promise<void> {
        // Standard tuning configuration
        await actor.attemptsTo(
            Select.value('E2').from(GuitarPageElements.stringTuningSelect(0)),
            Select.value('A2').from(GuitarPageElements.stringTuningSelect(1)),
            Select.value('D3').from(GuitarPageElements.stringTuningSelect(2)),
            Select.value('G3').from(GuitarPageElements.stringTuningSelect(3)),
            Select.value('B3').from(GuitarPageElements.stringTuningSelect(4)),
            Select.value('E4').from(GuitarPageElements.stringTuningSelect(5))
        );
    }
}
```

### 4. Questions (Assertions)

#### ScaleVisualization.ts
```typescript
import { Question } from '@serenity-js/core';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { GuitarPageElements } from '../page-elements/GuitarPageElements';

export class ScaleVisualization {
    static isDisplayed(): Question<boolean> {
        return Question.about('scale visualization is displayed', async actor => {
            const browse = BrowseTheWeb.asActor(actor);
            const page = await browse.getPage();
            
            const scaleNotes = await page.locator(GuitarPageElements.scaleNotes()).count();
            return scaleNotes > 0;
        });
    }

    static hasCorrectNotes(expectedNotes: string[]): Question<boolean> {
        return Question.about('scale has correct notes', async actor => {
            const browse = BrowseTheWeb.asActor(actor);
            const page = await browse.getPage();
            
            const displayedNotes = await page.locator(GuitarPageElements.scaleNotes()).allTextContents();
            return expectedNotes.every(note => displayedNotes.includes(note));
        });
    }
}
```

## SerenityJS Configuration

### serenity.config.ts
```typescript
import { defineConfig } from '@serenity-js/core';
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = defineConfig({
    testDir: './src/e2e',
    timeout: 30000,
    retries: 2,
    
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
    
    reporter: [
        ['@serenity-js/serenity-bdd', {
            specDirectory: './src/e2e/features',
            outputDirectory: './reports/serenity',
        }],
        ['html', { outputFolder: './reports/playwright' }],
        ['json', { outputFile: './reports/test-results.json' }],
    ],
    
    webServer: {
        command: 'npm run dev',
        port: 3000,
        reuseExistingServer: !process.env.CI,
    },
});

export default config;
```

## Example Test Implementation

### Expert Guitar Test
```typescript
import { describe, it } from 'vitest';
import { actorCalled } from '@serenity-js/core';
import { JeanYves } from '../screenplay/actors/JeanYves';
import { NavigateToGuitarPage, CreateCustomTuning, VerifyFretboardVisualization } from '../screenplay/tasks';
import { ScaleVisualization, NoteAccuracy } from '../screenplay/questions';

describe('Expert Guitar Features', () => {
    it('should allow Jean-Yves to create and test complex custom tunings', async () => {
        await actorCalled('Jean-Yves')
            .whoCan(
                BrowseTheWeb.using(browser),
                PlayMusic.withPrecision(),
                AnalyzeScales.atExpertLevel()
            )
            .attemptsTo(
                NavigateToGuitarPage.forExpert(),
                CreateCustomTuning.withComplexIntervals(),
                VerifyFretboardVisualization.acrossAllFrets(),
                Ensure.that(ScaleVisualization.hasCorrectNotes(['D', 'F', 'G', 'A#', 'C'])),
                Ensure.that(NoteAccuracy.isWithinTolerance(0.01))
            );
    });
});
```

### BDD Feature with Screenplay
```typescript
// features/expert/guitar-complex-tuning.feature
Feature: Expert Guitar Tuning System
  As Jean-Yves, an expert guitarist
  I want to create and test complex custom tunings
  So that I can explore advanced musical possibilities

  Scenario: Create and validate complex custom tuning
    Given Jean-Yves is on the guitar page
    When he creates a custom tuning with complex intervals
    And applies the tuning to a multiscale fretboard
    Then he should see accurate fret positions
    And hear correct notes when played
    And be able to save the tuning for later use
```

```typescript
// step-definitions/guitar-expert-steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { actorCalled } from '@serenity-js/core';
import { JeanYves } from '../../screenplay/actors/JeanYves';
import { NavigateToGuitarPage, CreateCustomTuning, VerifyFretboardVisualization } from '../../screenplay/tasks';
import { ScaleVisualization, NoteAccuracy } from '../../screenplay/questions';

Given('Jean-Yves is on the guitar page', async () => {
    await actorCalled('Jean-Yves')
        .attemptsTo(NavigateToGuitarPage.forExpert());
});

When('he creates a custom tuning with complex intervals', async () => {
    await actorCalled('Jean-Yves')
        .attemptsTo(CreateCustomTuning.withComplexIntervals());
});

Then('he should see accurate fret positions', async () => {
    await actorCalled('Jean-Yves')
        .attemptsTo(
            VerifyFretboardVisualization.acrossAllFrets(),
            Ensure.that(ScaleVisualization.isDisplayed())
        );
});
```

## Benefits of This Implementation

1. **Maintainability**: Clear separation of concerns
2. **Reusability**: Components can be reused across tests
3. **Readability**: Tests read like natural language
4. **Scalability**: Easy to add new actors, tasks, and interactions
5. **Expert Focus**: Jean-Yves persona enables expert-level testing
6. **Reporting**: SerenityJS provides comprehensive test reports

## Next Steps

1. Set up SerenityJS configuration
2. Implement core actors and abilities
3. Create basic tasks and interactions
4. Convert existing Playwright tests
5. Implement expert scenarios with Jean-Yves persona
6. Add comprehensive reporting and analysis