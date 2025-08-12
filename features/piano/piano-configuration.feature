@piano
Feature: Piano Configuration
  As a music student
  I want to configure piano display and behavior settings
  So that I can customize the learning experience to my preferences

  Background:
    Given I am on the piano page
    And the piano configuration panel is available

  @smoke @configuration
  Scenario: Change octave count setting
    Given the piano is currently showing 2 octaves
    When I change the octave count to 3
    Then the piano keyboard should expand to show 3 octaves
    And the keyboard should rerender smoothly
    And all scale visualizations should update accordingly

  @configuration @octave-range
  Scenario Outline: Configure different octave counts
    When I set the octave count to <octave_count>
    Then the piano should display exactly <octave_count> octaves
    And the keyboard width should adjust appropriately
    And the setting should be visually confirmed in the UI

    Examples:
      | octave_count |
      | 1            |
      | 2            |
      | 3            |
      | 4            |

  @configuration @note-display
  Scenario: Toggle between note names and scale degrees
    Given I have "C Major" scale selected and displayed
    When I switch the display setting to "note names"
    Then the highlighted keys should show note names (C, D, E, F, G, A, B)
    When I switch the display setting to "scale degrees"
    Then the highlighted keys should show scale degrees (1, 2, 3, 4, 5, 6, 7)

  @configuration @accidentals
  Scenario: Toggle between sharps and flats display
    Given I have "F# Major" scale selected
    When I set the accidental display to "sharps"
    Then the scale notes should show as F#, G#, A#, B, C#, D#, E#
    When I set the accidental display to "flats"
    Then the scale notes should show as Gb, Ab, Bb, B, Db, Eb, F

  @configuration @scale-selection
  Scenario: Change scale selection
    Given the piano is currently showing "C Major" scale
    When I select "A Minor" from the scale dropdown
    Then the keyboard should update to highlight A Minor scale notes
    And the root note emphasis should change to "A"
    And the previous scale highlights should be cleared

  @configuration @root-note-selection
  Scenario: Change root note for current scale
    Given I have "Major" scale selected with root note "C"
    When I change the root note to "G"
    Then the keyboard should update to show "G Major" scale
    And the G notes should be emphasized as root notes
    And the scale pattern should shift to start from G

  @configuration @theme-switching
  Scenario: Switch between light and dark themes
    Given the piano is displayed in light theme
    When I switch to dark theme
    Then the piano keyboard should update its colors for dark mode
    And the overall page theme should change to dark
    And the keyboard should remain fully functional
    When I switch back to light theme
    Then the piano should return to light theme colors

  @configuration @real-time-updates
  Scenario: Configuration changes update immediately
    Given I have a scale displayed on the piano
    When I change any configuration setting
    Then the piano should update in real-time
    And I should not need to refresh or reload the page
    And the update should be smooth without flickering

  @configuration @setting-persistence
  Scenario: Configuration settings persist across sessions
    Given I am using the piano page
    When I set the octave count to 3
    And I select "D Dorian" scale
    And I set display to show scale degrees
    And I refresh the page or revisit later
    Then my octave count should still be 3
    And "D Dorian" scale should still be selected
    And scale degrees should still be displayed

  @configuration @invalid-settings
  Scenario: Handle invalid configuration gracefully
    Given I am on the piano page
    When I attempt to set an invalid octave count (like 0 or 10)
    Then the system should use the nearest valid value
    And an appropriate feedback message should be shown
    And the piano should continue to function normally

  @configuration @reset-to-defaults
  Scenario: Reset configuration to default values
    Given I have modified various piano settings
    When I reset to default configuration
    Then the octave count should return to default (2 octaves)
    And the scale should reset to "C Major"
    And the display should show note names
    And the theme should be the system default

  @configuration @scale-filtering
  Scenario: Filter available scales by category
    Given I am selecting a scale from the dropdown
    When I filter by "Pentatonic" scales
    Then I should only see pentatonic scale options
    And the list should include Major Pentatonic, Minor Pentatonic, etc.
    When I clear the filter
    Then all available scales should be shown again

  @configuration @keyboard-shortcuts
  Scenario: Use keyboard shortcuts for configuration
    Given I am on the piano page
    When I press "Ctrl+1" (or equivalent shortcut)
    Then the octave count should change to 1
    When I press "Ctrl+4"
    Then the octave count should change to 4
    And keyboard shortcuts should provide quick configuration access

  @configuration @responsive-settings
  Scenario: Configuration panel adapts to screen size
    Given I am on the piano page
    When I view on a mobile device
    Then the configuration options should be accessible and touch-friendly
    When I view on desktop
    Then the configuration panel should make full use of available space
    And all settings should remain easily accessible

  @configuration @help-information
  Scenario: Access help information for configuration options
    Given I am viewing the configuration panel
    When I hover over or click help icons for settings
    Then I should see helpful tooltips or explanations
    And the help text should clearly explain what each setting does
    And examples should be provided where helpful