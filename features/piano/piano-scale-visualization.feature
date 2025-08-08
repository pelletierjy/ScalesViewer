Feature: Piano Scale Visualization
  As a music student
  I want to see scale patterns highlighted on the piano keyboard
  So that I can learn and understand different musical scales

  Background:
    Given I am on the piano page
    And the piano keyboard is displayed

  @smoke @scale-display
  Scenario: Display scale notes on piano keyboard
    Given I have selected "C Major" scale
    When the scale is applied to the keyboard
    Then I should see the C Major scale notes highlighted
    And the highlighted notes should be C, D, E, F, G, A, B
    And non-scale notes should not be highlighted

  @scale-display
  Scenario: Root note emphasis in scale visualization
    Given I have selected "A Minor" scale with root note "A"
    When the scale is displayed on the keyboard
    Then the root note "A" should be visually emphasized
    And the root note should have a different color or style than other scale notes
    And all instances of "A" across octaves should be emphasized as root notes

  @scale-display
  Scenario Outline: Display various scale patterns
    Given I have selected "<scale_name>" scale with root note "<root_note>"
    When the scale is displayed on the keyboard
    Then I should see the correct scale pattern highlighted
    And the root note "<root_note>" should be emphasized
    And the scale should span across all visible octaves

    Examples:
      | scale_name           | root_note |
      | Major                | C         |
      | Minor                | A         |
      | Pentatonic Major     | G         |
      | Pentatonic Minor     | E         |
      | Blues                | Bb        |
      | Dorian               | D         |
      | Mixolydian           | F         |
      | Chromatic            | C         |

  @scale-display @note-names
  Scenario: Display note names on highlighted keys
    Given I have selected "F Major" scale
    And the display setting is set to show note names
    When the scale is displayed
    Then each highlighted key should show its note name
    And the note names should be clearly readable
    And the text should contrast well with the key background

  @scale-display @scale-degrees
  Scenario: Display scale degrees on highlighted keys
    Given I have selected "G Major" scale
    And the display setting is set to show scale degrees
    When the scale is displayed
    Then each highlighted key should show its scale degree number
    And the root note should show "1"
    And the scale degrees should follow the pattern 1, 2, 3, 4, 5, 6, 7

  @scale-display @flats-sharps
  Scenario: Toggle between sharps and flats display
    Given I have selected "Db Major" scale
    When I toggle the flats/sharps setting to "flats"
    Then the scale notes should display as flats (Db, Eb, F, Gb, Ab, Bb, C)
    When I toggle the flats/sharps setting to "sharps"
    Then the scale notes should display as sharps (C#, D#, F, F#, G#, A#, C)

  @scale-display @multi-octave
  Scenario: Scale pattern across multiple octaves
    Given I have set the octave count to 3
    And I have selected "C Major" scale
    When the scale is displayed
    Then the scale pattern should repeat correctly across all 3 octaves
    And each octave should show the same relative scale pattern
    And root notes should be emphasized in each octave

  @scale-display @color-coding
  Scenario: Scale note color coding by function
    Given I have selected "C Major" scale
    When the scale is displayed with color coding enabled
    Then the root note (C) should have a distinct color
    And the dominant note (G) should have a recognizable color
    And other scale degrees should follow the established color scheme
    And the colors should be consistent across octaves

  @scale-display @empty-scale
  Scenario: Handle empty or invalid scale selection
    Given no scale is currently selected
    When I view the piano keyboard
    Then no notes should be highlighted
    And the keyboard should remain fully interactive
    And no error messages should be displayed

  @scale-display @scale-switching
  Scenario: Smooth transition between different scales
    Given I have "A Minor" scale currently displayed
    When I switch to "E Major" scale
    Then the previous scale highlights should be cleared
    And the new scale pattern should be highlighted
    And the root note emphasis should update to "E"
    And the transition should be visually smooth

  @scale-display @chromatic-scale
  Scenario: Display chromatic scale showing all notes
    Given I have selected "Chromatic" scale
    When the scale is displayed
    Then all 12 notes should be highlighted
    And both white and black keys should be highlighted
    And the root note should still be visually emphasized
    And the pattern should repeat across all octaves