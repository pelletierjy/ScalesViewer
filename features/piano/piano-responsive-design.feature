Feature: Piano Responsive Design
  As a music student using various devices
  I want the piano interface to work well on all screen sizes
  So that I can learn music theory on any device I have available

  Background:
    Given I am on the piano page
    And the piano component is loaded

  @smoke @responsive @mobile
  Scenario: Piano layout on mobile devices
    Given I am viewing on a mobile phone (320px - 768px width)
    When the piano interface loads
    Then the piano keyboard should fit within the screen width
    And the keys should be large enough for finger interaction
    And the configuration controls should be accessible
    And no horizontal scrolling should be required for basic interaction

  @responsive @mobile @portrait
  Scenario: Mobile portrait orientation
    Given I am using a mobile device in portrait orientation
    When I view the piano page
    Then the piano keyboard should be optimally sized for the narrow screen
    And the octave count might be automatically reduced if necessary
    And the configuration panel should be easily accessible
    And the scale visualization should remain clear and readable

  @responsive @mobile @landscape
  Scenario: Mobile landscape orientation
    Given I am using a mobile device in landscape orientation
    When I rotate to landscape mode
    Then the piano keyboard should expand to use the wider screen
    And more octaves should be visible if space allows
    And the layout should reflow appropriately
    And the interface should remain fully functional

  @responsive @tablet
  Scenario: Piano layout on tablet devices
    Given I am viewing on a tablet (768px - 1024px width)
    When the piano interface loads
    Then the piano keyboard should be larger than mobile but smaller than desktop
    And multiple octaves should be comfortably visible
    And both touch and potential keyboard interaction should work well
    And the configuration panel should have appropriate spacing

  @responsive @desktop
  Scenario: Piano layout on desktop devices
    Given I am viewing on a desktop (1024px+ width)
    When the piano interface loads
    Then the piano keyboard should use optimal sizing for mouse interaction
    And the full range of octaves should be easily visible
    And the configuration panel should be prominently accessible
    And there should be adequate whitespace around all elements

  @responsive @ultra-wide
  Scenario: Piano layout on ultra-wide displays
    Given I am viewing on an ultra-wide monitor (1920px+ width)
    When the piano interface loads
    Then the piano keyboard should not stretch beyond practical limits
    And the interface should be centered or appropriately positioned
    And the extra screen space should be utilized effectively
    And the piano should remain the focal point

  @responsive @orientation-change
  Scenario: Handle device orientation changes
    Given I am using a mobile or tablet device
    And I have the piano page loaded in portrait orientation
    When I rotate the device to landscape orientation
    Then the piano layout should smoothly adapt to the new orientation
    And my current scale and settings should be preserved
    And the keyboard should reposition and resize appropriately
    And no functionality should be lost during the transition

  @responsive @zoom-levels
  Scenario: Handle different browser zoom levels
    Given I am on the piano page at 100% zoom
    When I zoom in to 150%
    Then the piano interface should remain usable and proportional
    And text should remain readable
    And interactive elements should still be clickable
    When I zoom out to 75%
    Then all elements should still be visible and functional

  @responsive @touch-targets
  Scenario: Appropriate touch target sizes across devices
    When I view the piano on a touch device
    Then all piano keys should meet minimum touch target size requirements (44px)
    And there should be adequate spacing between keys to prevent mis-taps
    And configuration controls should be appropriately sized for touch
    And the touch targets should scale appropriately with screen size

  @responsive @keyboard-scaling
  Scenario Outline: Piano keyboard scaling across breakpoints
    Given I am viewing at <screen_width> screen width
    When the piano keyboard renders
    Then the keyboard should scale appropriately for the <device_type>
    And the key proportions should maintain proper piano ratios
    And the keyboard should be neither too small nor too large for the screen

    Examples:
      | screen_width | device_type |
      | 320px        | mobile      |
      | 768px        | tablet      |
      | 1024px       | desktop     |
      | 1440px       | large       |

  @responsive @configuration-panel
  Scenario: Configuration panel responsiveness
    Given I have the piano configuration panel open
    When I view it on different screen sizes
    Then the panel should adapt its layout appropriately
    And on mobile, it should use space-efficient controls
    And on desktop, it should provide more detailed options
    And the panel should never obstruct the piano keyboard

  @responsive @text-scaling
  Scenario: Text and label scaling
    When I view the piano on different screen sizes
    Then note names and scale degrees should scale appropriately
    And text should remain readable at all screen sizes
    And labels should not overlap with piano keys
    And font sizes should follow responsive design principles

  @responsive @performance
  Scenario: Performance across device capabilities
    Given I am using a less powerful mobile device
    When I interact with the piano interface
    Then the response time should remain acceptable
    And animations should be smooth or reduced as appropriate
    And the interface should not become sluggish
    And memory usage should be optimized for the device

  @responsive @accessibility
  Scenario: Responsive accessibility features
    When I use assistive technology on different screen sizes
    Then all interactive elements should remain accessible
    And focus indicators should be visible at all sizes
    And screen reader navigation should work consistently
    And touch accessibility should adapt to screen size

  @responsive @content-reflow
  Scenario: Content reflow at different breakpoints
    When the screen size changes across major breakpoints
    Then the piano keyboard should reflow smoothly
    And supporting content should reorganize appropriately
    And no content should be cut off or become inaccessible
    And the overall layout should remain intuitive

  @responsive @edge-cases
  Scenario: Handle extreme screen dimensions
    Given I am viewing on an unusually narrow or wide screen
    When the piano interface attempts to render
    Then the interface should degrade gracefully
    And core functionality should remain available
    And the piano should adapt to fit the available space
    And appropriate fallbacks should be provided for unusual dimensions