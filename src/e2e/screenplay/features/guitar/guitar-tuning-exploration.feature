Feature: Guitar Tuning System Exploration
  As a guitarist exploring different tuning systems
  I want to visualize scales and notes in various tunings
  So that I can understand how tuning affects playability and sound

  Background:
    Given I am on the guitar page

  Rule: Standard tuning provides familiar reference point

    Example: Explore scales in standard tuning
      When I select standard tuning (E-A-D-G-B-E)
      And I visualize the C Major scale
      Then the scale pattern should display across all six strings
      And the root note should be clearly marked on multiple strings
      And the octave relationships should be visually apparent

    Example: Compare scale patterns across strings
      When I examine how the C Major scale appears on different strings
      Then each string should show the appropriate scale degrees
      And the interval patterns should be consistent with standard tuning

  Rule: Alternate tunings create new musical possibilities

    Example: Drop D tuning expands low range
      When I switch to Drop D tuning (D-A-D-G-B-E)
      And I visualize a scale that uses the low D
      Then the sixth string should start from D instead of E
      And the scale pattern should adjust accordingly
      And new chord shapes should become available

    Example: Open tunings facilitate chord playing
      When I explore open G tuning (D-G-D-G-B-D)
      And I strum the open strings
      Then the open strings should form a G major chord
      And scale visualization should show how melodies work within this framework

  Rule: Custom tunings enable personalized approaches

    Example: Create custom tuning for specific musical style
      When I design a custom tuning for fingerstyle playing
        | String | Note | Reason                  |
        | 1st    | D    | Higher melody range     |
        | 2nd    | A    | Maintains relationship  |
        | 3rd    | D    | Drone string            |
        | 4th    | G    | Bass foundation         |
        | 5th    | A    | Alternative bass        |
        | 6th    | D    | Low drone               |
      Then the tuning should be saved for future use
      And scales should visualize correctly in this custom tuning

  Rule: Tuning affects scale geometry

    Example: Same scale looks different in different tunings
      When I compare the C Major scale in different tunings:
        | Tuning     | String 6 | String 5 | String 4 | String 3 | String 2 | String 1 |
        | Standard   | E        | A        | D        | G        | B        | E        |
        | Drop D     | D        | A        | D        | G        | B        | E        |
        | Open G     | D        | G        | D        | G        | B        | D        |
      Then the scale pattern should adapt to each tuning
      But the musical intervals should remain consistent
      And the root note positions should be clearly marked

  Rule: Multiple tuning systems can coexist

    Example: Compare equal temperament vs just intonation
      When I examine the same chord in different tuning systems
        | System         | Characteristics                  |
        | Equal          | Standard modern tuning           |
        | Just           | Pure intervals, some compromise  |
        | Well-tempered  | Historical compromise system     |
      Then I should understand the theoretical differences
      And hear how each system affects the sound
      And see how this impacts scale visualization

  Example: Transposition across tunings
    When I transpose a musical piece from standard tuning to Drop D
    Then the finger positions should change appropriately
    But the musical content should remain recognizable
    And the new tuning should offer practical advantages for the specific piece