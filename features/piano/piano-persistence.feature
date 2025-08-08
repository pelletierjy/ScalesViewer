Feature: Piano State Persistence
  As a music student
  I want my piano settings and preferences to be remembered
  So that I can continue my learning session where I left off

  Background:
    Given I am on the piano page
    And the application supports state persistence

  @smoke @persistence
  Scenario: Persist basic piano configuration
    Given I set the octave count to 3
    And I select "A Minor" scale
    And I set the root note to "A"
    When I refresh the browser page
    Then the octave count should still be 3
    And "A Minor" scale should still be selected
    And the root note should still be "A"

  @persistence @local-storage
  Scenario: Save configuration to local storage
    Given I make changes to piano settings
    When I modify the octave count to 4
    And I change the display to show scale degrees
    Then the settings should be saved to browser local storage
    And I should be able to verify the stored data exists

  @persistence @redux-state
  Scenario: Persist Redux global state
    Given I change global settings that affect the piano
    When I switch the theme to dark mode
    And I change the scale to "E Blues"
    And I modify the root note to "E"
    Then these changes should be saved in Redux state
    When I navigate away and return to the piano page
    Then the global state should be restored correctly

  @persistence @mixed-state
  Scenario: Handle both local and global state persistence
    Given I have both local piano settings and global application settings
    When I set the octave count to 2 (local state)
    And I set the theme to dark mode (global state)
    And I select "F# Major" scale (global state)
    And I restart the application
    Then the octave count should remain 2
    And the theme should remain dark
    And the "F# Major" scale should still be selected

  @persistence @partial-data-loss
  Scenario: Handle partial data corruption gracefully
    Given I have saved piano settings in local storage
    When some of the stored data becomes corrupted or invalid
    And I reload the application
    Then the system should use default values for corrupted settings
    And the valid settings should still be restored
    And the piano should function normally without errors

  @persistence @storage-limitations
  Scenario: Handle local storage limitations
    Given the browser's local storage is approaching its limit
    When I attempt to save new piano settings
    Then the system should handle storage quota gracefully
    And essential settings should still be preserved
    And the user should be informed if settings cannot be saved

  @persistence @cross-session-continuity
  Scenario: Maintain learning session continuity
    Given I am in the middle of a learning session
    And I have "C Dorian" scale displayed with 3 octaves
    And I have customized the display settings
    When I close the browser tab accidentally
    And I reopen the piano page
    Then I should see "C Dorian" scale still displayed
    And the octave count should remain 3
    And my display customizations should be preserved

  @persistence @migration-handling
  Scenario: Handle settings format changes during updates
    Given I have piano settings saved in an older format
    When the application is updated with new setting structures
    And I load the piano page
    Then the system should migrate old settings to the new format
    And my preferences should be preserved where possible
    And default values should be used for new settings

  @persistence @privacy-mode
  Scenario: Respect browser privacy settings
    Given I am using a browser in private/incognito mode
    When I modify piano settings
    Then the settings should work for the current session
    And the system should not attempt to persist to storage
    And no errors should occur due to storage restrictions

  @persistence @data-integrity
  Scenario: Ensure data integrity in persistence
    Given I have complex piano settings configured
    When the settings are saved to storage
    Then the saved data should exactly match my current configuration
    When the settings are loaded back
    Then every setting should be restored accurately
    And no data should be lost or corrupted in the process

  @persistence @concurrent-tabs
  Scenario: Handle multiple piano tabs synchronization
    Given I have the piano page open in multiple browser tabs
    When I change settings in one tab
    Then the changes should be reflected in other open tabs
    And the settings should remain synchronized across tabs
    And no conflicts should arise from concurrent modifications

  @persistence @reset-functionality
  Scenario: Reset persisted settings to defaults
    Given I have customized piano settings that are persisted
    When I choose to reset settings to default
    Then all persisted settings should be cleared from storage
    And the piano should display with factory default settings
    And the reset should be immediate and complete

  @persistence @selective-persistence
  Scenario: Persist only relevant settings
    Given I interact with various piano features
    When settings are saved to storage
    Then only user preferences should be persisted
    And temporary UI states should not be saved
    And session-specific data should be excluded from persistence

  @persistence @backup-restore
  Scenario: Export and import piano settings
    Given I have customized piano settings
    When I export my settings
    Then I should receive a file containing my configuration
    When I import previously exported settings
    Then my piano should be configured exactly as exported
    And the import should overwrite current settings appropriately

  @persistence @version-compatibility
  Scenario: Maintain compatibility across application versions
    Given I have piano settings saved in version 1.0
    When I upgrade to version 2.0 of the application
    Then my existing settings should still work
    And new features should use sensible defaults
    And no settings should be lost due to version changes