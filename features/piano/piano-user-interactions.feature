Feature: Piano User Interactions
  As a music student
  I want to interact with the piano keyboard
  So that I can hear notes and learn through active engagement

  Background:
    Given I am on the piano page
    And the piano keyboard is loaded
    And audio is enabled in the browser

  @smoke @interaction
  Scenario: Click piano key to play note
    Given I can see the piano keyboard
    When I click on the middle C key
    Then I should hear the C note played
    And the key should provide visual feedback when clicked
    And the audio should play immediately without delay

  @interaction @audio
  Scenario: Play different notes by clicking keys
    When I click on the C key
    Then I should hear a C note
    When I click on the E key
    Then I should hear an E note
    When I click on the G key
    Then I should hear a G note
    And each note should have a distinct pitch

  @interaction @visual-feedback
  Scenario: Visual feedback when clicking keys
    When I click and hold a piano key
    Then the key should show a pressed state visually
    And the pressed state should be clearly distinguishable from the normal state
    When I release the key
    Then the key should return to its normal visual state

  @interaction @multiple-clicks
  Scenario: Handle rapid multiple key clicks
    When I rapidly click multiple different keys in sequence
    Then each key click should produce its corresponding note
    And the audio should not cut off previous notes abruptly
    And the system should handle multiple simultaneous note playback

  @interaction @touch
  Scenario: Touch interaction on mobile devices
    Given I am using a touch device
    When I tap a piano key with my finger
    Then the key should respond to touch
    And I should hear the corresponding note
    And the touch target should be appropriately sized for fingers

  @interaction @keyboard-navigation
  Scenario: Navigate piano keys using keyboard
    Given I am using keyboard navigation
    When I press the Tab key
    Then the focus should move to the first piano key
    When I press the Right Arrow key
    Then the focus should move to the next key
    When I press the Space key or Enter
    Then the focused key should play its note

  @interaction @scale-context
  Scenario: Play notes within a selected scale
    Given I have selected "C Major" scale
    And the scale notes are highlighted on the keyboard
    When I click on highlighted scale notes
    Then each note should play clearly
    And the notes should sound harmonious within the scale context
    When I click on non-highlighted notes
    Then those notes should still play but not be visually emphasized

  @interaction @octave-spanning
  Scenario: Play same note across different octaves
    Given the keyboard shows multiple octaves
    When I click on C in the first octave
    Then I should hear a lower-pitched C
    When I click on C in the second octave
    Then I should hear a higher-pitched C
    And the pitch difference should be clearly audible

  @interaction @audio-settings
  Scenario: Audio playback with different settings
    Given I have audio settings configured
    When I click a piano key
    Then the note should play with the configured volume
    And the audio quality should be clear and distortion-free
    And the note duration should be appropriate for piano simulation

  @interaction @error-handling
  Scenario: Handle audio playback errors gracefully
    Given audio is not available or blocked
    When I click on a piano key
    Then the visual feedback should still work
    And the key should still show as pressed
    And no error messages should disrupt the user experience
    And the interaction should remain responsive

  @interaction @performance
  Scenario: Maintain performance during intensive interaction
    When I rapidly click many keys in quick succession
    Then the interface should remain responsive
    And audio playback should not lag significantly
    And visual feedback should keep up with user interactions
    And the browser should not become unresponsive

  @interaction @simultaneous-keys
  Scenario: Handle simultaneous key presses
    When I click multiple keys at exactly the same time
    Then all clicked keys should show pressed state
    And all corresponding notes should play simultaneously
    And the audio should blend harmoniously
    And no keys should be missed or ignored

  @interaction @accessibility
  Scenario: Accessible keyboard interaction
    Given I am using assistive technology
    When I navigate to a piano key using screen reader
    Then the screen reader should announce the key name and note
    When I activate the key using assistive technology
    Then the note should play
    And the interaction should be fully accessible

  @interaction @chord-playing
  Scenario: Play chord by clicking multiple keys
    Given I have "C Major" scale selected
    When I simultaneously click C, E, and G keys
    Then I should hear a C Major chord
    And all three notes should play harmoniously together
    And the chord should sound full and rich

  @interaction @sustain-behavior
  Scenario: Note sustain and release behavior
    When I click and immediately release a piano key
    Then the note should play with natural piano-like sustain
    And the note should gradually fade out
    When I click multiple keys in quick succession
    Then the notes should overlap naturally like a real piano