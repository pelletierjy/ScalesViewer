@instrument-audio
Feature: Instrument-aware audio playback
  As a musician using ScalesViewer
  I want notes to sound like the instrument on the current page
  So that practice matches what I am studying

  Background:
    Given audio is enabled in the browser

  @smoke @settings
  Scenario: Sound engine can be configured in settings
    Given I have opened the settings panel
    Then I should see the sound playback engine options
    When I select the "Classic sine" sound engine
    Then the sound engine should be "sine"

  @guitar @audio
  Scenario: Guitar page uses guitar instrument for playback context
    Given I am on the guitar page
    And the sound engine is "sample"
    Then the active instrument for audio should be "guitar"

  @piano @audio
  Scenario: Piano page uses piano instrument for playback context
    Given I am on the piano page
    And the sound engine is "sample"
    Then the active instrument for audio should be "piano"
