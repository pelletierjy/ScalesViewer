Feature: Piano Keyboard Rendering
  As a music student
  I want to see a properly rendered piano keyboard
  So that I can visualize notes and scales on a familiar interface

  Background:
    Given I am on the piano page
    And the piano keyboard is loaded

  @smoke @visual
  Scenario: Display basic piano keyboard layout
    Then I should see a piano keyboard with white and black keys
    And the white keys should be properly spaced
    And the black keys should be positioned between appropriate white keys
    And the keyboard should span at least one octave

  @visual
  Scenario: Verify piano key colors and styling
    Then the white keys should have a white background
    And the black keys should have a dark background
    And the keys should have visible borders
    And the keys should have appropriate shadows for depth

  @configuration
  Scenario Outline: Display different octave configurations
    When I set the octave count to <octaves>
    Then I should see exactly <expected_keys> white keys
    And I should see exactly <expected_black_keys> black keys
    And the keyboard should span <octaves> complete octaves

    Examples:
      | octaves | expected_keys | expected_black_keys |
      | 1       | 7             | 5                   |
      | 2       | 14            | 10                  |
      | 3       | 21            | 15                  |
      | 4       | 28            | 20                  |

  @responsive @mobile
  Scenario: Piano keyboard responsiveness on mobile
    Given I am viewing on a mobile device
    When the piano keyboard renders
    Then the keys should be appropriately sized for touch interaction
    And the keyboard should fit within the viewport width
    And I should be able to scroll horizontally if needed

  @responsive @tablet
  Scenario: Piano keyboard responsiveness on tablet
    Given I am viewing on a tablet device
    When the piano keyboard renders
    Then the keys should be larger than mobile but smaller than desktop
    And the full keyboard should be visible without scrolling
    And the key proportions should maintain proper piano ratios

  @responsive @desktop
  Scenario: Piano keyboard responsiveness on desktop
    Given I am viewing on a desktop device
    When the piano keyboard renders
    Then the keys should be full-sized for optimal interaction
    And the keyboard should be centered on the page
    And there should be adequate spacing around the keyboard

  @accessibility
  Scenario: Piano keyboard accessibility features
    Then each piano key should have appropriate ARIA labels
    And the keys should be keyboard navigable
    And the focus indicators should be clearly visible
    And screen readers should announce key names when focused

  @theme
  Scenario: Piano keyboard in light theme
    Given the theme is set to light mode
    When I view the piano keyboard
    Then the white keys should have a bright white background
    And the black keys should have a dark contrast
    And the key borders should be visible against the light background

  @theme
  Scenario: Piano keyboard in dark theme
    Given the theme is set to dark mode
    When I view the piano keyboard
    Then the white keys should have appropriate contrast for dark mode
    And the black keys should remain dark but distinguishable
    And the overall keyboard should integrate well with the dark theme

  @error-handling
  Scenario: Piano keyboard renders with missing configuration
    Given the piano configuration is incomplete or corrupted
    When the piano page loads
    Then the keyboard should render with default settings
    And I should see a standard one-octave keyboard
    And the application should not crash or show errors