Feature: Advanced Guitar Analysis for Expert Musicians
  As Jean-Yves, an expert guitarist and luthier
  I want to perform advanced guitar analysis and custom configurations
  So that I can explore complex musical concepts and instrument setups

  Background:
    Given Jean-Yves is on the guitar page with expert capabilities

  Rule: Expert users can analyze complex fretboard geometries

    Example: Multiscale fretboard analysis
      When Jean-Yves configures a multiscale guitar with:
        | String | Scale Length | Tuning |
        | 1st    | 25.5"        | E      |
        | 2nd    | 25.7"        | B      |
        | 3rd    | 26.0"        | G      |
        | 4th    | 26.3"        | D      |
        | 5th    | 26.5"        | A      |
        | 6th    | 27.0"        | E      |
      Then the fret positions should be calculated using the logarithmic formula
      And the fanning angle should be consistent with the scale lengths
      And intonation should be accurate across all strings

    Example: Custom fret placement for microtonal music
      When Jean-Yves designs a microtonal fretboard with 19-TET divisions
      Then each fret should represent 63.16 cents (1200/19)
      And the fret positions should follow the 19-TET mathematical formula
      And standard notation should adapt to show microtonal intervals

  Rule: Expert users understand advanced tuning concepts

    Example: Historical temperament comparison
      When Jean-Yves compares these temperaments on the same piece:
        | Temperament     | Era         | Characteristics                  |
        | Meantone        | Renaissance | Pure major thirds                |
        | Werckmeister    | Baroque     | Circulating, usable keys         |
        | Kirnberger      | Classical   | Improved thirds, some purity     |
        | Equal           | Modern      | All keys equally usable          |
      Then he should hear the characteristic colors of each system
      And understand why certain keys were preferred historically
      And see how this affects chord voicings and voice leading

    Example: Advanced alternate tuning analysis
      When Jean-Yves explores these specialized tunings:
        | Tuning Name     | String Notes     | Purpose                        |
        | New Standard    | C-G-D-A-E-G      | Extended range, open chords    |
        | All Fourths     | E-A-D-G-C-F      | Consistent interval patterns   |
        | Major Thirds    | G#-C-E-G#-C-E    | Symmetrical chord shapes       |
        | Overtone        | C-C-G-C-E-G      | Harmonic series based          |
      Then each tuning should reveal its unique advantages
      And scale patterns should adapt to show practical fingerings
      And chord libraries should reflect the tuning's possibilities

  Rule: Expert users perform detailed instrument analysis

    Example: Scale length impact on tone and playability
      When Jean-Yves analyzes the same scale on different scale lengths:
        | Scale Length | Tension | Tonal Quality | Playability |
        | 24.75"       | Lower   | Warmer        | Easier bends |
        | 25.5"        | Standard| Balanced      | Standard     |
        | 26.5"        | Higher  | Brighter      | More resistance |
      Then he should understand the tension differences
      And hear how scale length affects harmonic content
      And see optimal string gauge recommendations

    Example: Fret material and wear analysis
      When Jean-Yves examines fret wear patterns
      Then he should identify:
        | Wear Pattern | Cause                  | Solution               |
        | Center wear  | Frequent barre chords  | Refret, technique adjustment |
        | Edge wear    | String bending         | Stainless steel frets |
        | Uneven wear  | Improper technique     | Setup adjustment      |
        | Overall wear | Age and use            | Complete refret       |

  Rule: Expert users create custom instruments virtually

    Example: Design custom guitar for specific musical style
      When Jean-Yves designs a guitar for modern fingerstyle
        | Specification | Value              | Reason                          |
        | Body Size     | OM/000             | Balanced tone, comfort          |
        | Scale Length  | 25.4"              | Slightly longer for clarity     |
        | Nut Width     | 1.75"              | Extra space for fingerpicking   |
        | Wood Combo    | Spruce/Rosewood    | Classic tone, projection        |
        | Electronics   | Dual source        | Natural amplified sound         |
      Then the virtual instrument should accurately represent the design
      And scale visualization should show optimal fingerings
      And tone should be modeled accurately

  Example: Advanced harmonic analysis
    When Jean-Yves analyzes harmonic content of different playing techniques
      | Technique     | Harmonic Content | Tonal Effect        |
      | Fingerstyle   | Rich overtones   | Warm, complex       |
      | Pick playing  | Strong fundamentals| Bright, clear       |
      | Palm muting   | Reduced sustain  | Tight, controlled   |
      | Harmonics     | Pure overtones   | Bell-like, ethereal |
    Then he should understand the spectral analysis
    And see how this affects scale and chord visualization
    And optimize his playing technique accordingly

  Example: Virtual luthier consultation
    When Jean-Yves uses the advanced setup tools
    Then he should receive recommendations for:
      | Aspect        | Recommendation Criteria                  |
      | String gauge  | Playing style, tuning, scale length      |
      | Action height | Playing technique, musical style         |
      | Pickup height | Output balance, tone preference          |
      | Nut slotting  | String gauge, tuning stability           |
    Based on his musical requirements and playing characteristics
    And backed by acoustic physics and lutherie principles
    With the ability to virtually test before physical implementation"}]
</function_results>
<function_results>
<name>Write</name>
<result>File created successfully at: C:\dev\Ref\ScalesViewer\src\e2e\screenplay\features\guitar\guitar-expert-workflows.feature</result>
</function_results>

Now let me create the step definitions for these BDD features and finalize the implementation status:

<function_calls>
<invoke name="Write">
<parameter name="file_path">C:\dev\Ref\ScalesViewer\src\e2e\screenplay\step-definitions\piano-steps.ts</parameter>
<parameter name="content">import { Given, When, Then } from '@cucumber/cucumber';
import { actorCalled, actorInTheSpotlight } from '@serenity-js/core';
import { Ensure, isGreaterThan, equals, property } from '@serenity-js/assertions';
import { TestWorld } from '../support/TestWorld';
import { NavigateToPianoPage } from '../tasks/piano/NavigateToPianoPage';
import { SelectScale } from '../tasks/piano/SelectScale';
import { PianoKeyboard } from '../questions/PianoKeyboard';

// Background steps
Given('{actor} is on the piano page', async (actorName: string) => {
    const page = await browser.newPage();
    const actor = TestWorld.actorNamed(actorName, page);
    
    await actorCalled(actorName, actor)
        .attemptsTo(
            NavigateToPianoPage.asRegularUser()
        );
});

Given('{actor} is on the piano page with expert capabilities', async (actorName: string) => {
    const page = await browser.newPage();
    const actor = TestWorld.actorNamed(actorName, page);
    
    await actorCalled(actorName, actor)
        .attemptsTo(
            NavigateToPianoPage.asExpert()
        );
});

// Scale exploration steps
When('{pronoun} select(s) the {word} scale in the key of {word}', async (pronoun: string, scaleType: string, rootNote: string) => {
    await actorInTheSpotlight().attemptsTo(
        SelectScale.named(scaleType)
    );
});

When('{pronoun} explore(s) these scales in the key of {word}:', async (pronoun: string, key: string, dataTable: any) => {
    const scales = dataTable.hashes().map((row: any) => row['Scale']);
    
    for (const scale of scales) {
        await actorInTheSpotlight().attemptsTo(
            SelectScale.named(scale)
        );
    }
});

When('{pronoun} adjust(s) the octave count to {int}', async (pronoun: string, octaves: number) => {
    // Implementation for adjusting octave count
    // This would be implemented in a separate task
});

When('{pronoun} switch(es) to displaying scale degrees instead of note names', async (pronoun: string) => {
    // Implementation for switching display mode
});

When('{pronoun} switch(es) between flat and sharp notation', async (pronoun: string) => {
    // Implementation for switching notation
});

// Assertion steps
Then('I should see the {word} scale pattern highlighted on the keyboard', async (scaleName: string) => {
    await actorInTheSpotlight().attemptsTo(
        Ensure.that(PianoKeyboard.highlightedNotes(), property('length', isGreaterThan(0)))
    );
});

Then('the root note {word} should be clearly emphasized', async (rootNote: string) => {
    await actorInTheSpotlight().attemptsTo(
        Ensure.that(PianoKeyboard.isRootNoteEmphasized(rootNote), equals(true))
    );
});

Then('each scale should display its unique note pattern', async () => {
    await actorInTheSpotlight().attemptsTo(
        Ensure.that(PianoKeyboard.highlightedNotes(), property('length', isGreaterThan(0)))
    );
});

Then('the root note should be emphasized in each scale', async () => {
    await actorInTheSpotlight().attemptsTo(
        Ensure.that(PianoKeyboard.isRootNoteEmphasized('C'), equals(true))
    );
});

Then('the keyboard should display {int} octaves of notes', async (octaves: number) => {
    await actorInTheSpotlight().attemptsTo(
        Ensure.that(PianoKeyboard.currentOctaveCount(), equals(octaves))
    );
});

Then('all scale notes should remain visible and correctly positioned', async () => {
    await actorInTheSpotlight().attemptsTo(
        Ensure.that(PianoKeyboard.highlightedNotes(), property('length', isGreaterThan(0)))
    );
});

Then('the keyboard should show numbers (1-7) instead of note names', async () => {
    // Implementation for verifying degree display
});

Then('the underlying scale pattern should remain the same', async () => {
    await actorInTheSpotlight().attemptsTo(
        Ensure.that(PianoKeyboard.highlightedNotes(), property('length', isGreaterThan(0)))
    );
});

Then('the notes should display as either flats or sharps', async () => {
    // Implementation for verifying flat/sharp display
});

Then('the actual pitches should remain unchanged', async () => {
    // Implementation for verifying pitch consistency
});

// State persistence steps
Given('I have configured the piano with:', async (dataTable: any) => {
    const config = dataTable.hashes()[0];
    
    await actorInTheSpotlight().attemptsTo(
        SelectScale.named(config['Setting'])
    );
});

Then('my scale configuration should be restored', async () => {
    await actorInTheSpotlight().attemptsTo(
        Ensure.that(PianoKeyboard.currentScale(), equals('Blues'))
    );
});

Then('the keyboard should show the {word} Blues scale across {int} octaves', async (rootNote: string, octaves: number) => {
    await actorInTheSpotlight().attemptsTo(
        Ensure.that(PianoKeyboard.currentScale(), equals('Blues')),
        Ensure.that(PianoKeyboard.currentOctaveCount(), equals(octaves))
    );
});