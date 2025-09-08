Feature: Piano Scale Exploration
  As a musician exploring musical scales
  I want to visualize different scales on a piano keyboard
  So that I can understand their note patterns and relationships

  Background:
    Given I am on the piano page

  Rule: Basic scale visualization should work for all users

    Example: Display C Major scale pattern
      When I select the Major scale in the key of C
      Then I should see the C Major scale pattern highlighted on the keyboard
      And the root note C should be clearly emphasized

    Example: Display different scale types
      When I explore these scales in the key of C:
        | Scale            |
        | Major            |
        | Minor            |
        | Pentatonic Major |
        | Blues            |
      Then each scale should display its unique note pattern
      And the root note should be emphasized in each scale

  Rule: Octave range affects keyboard visualization

    Example: Adjust octave count changes visible range
      Given I have selected a scale
      When I adjust the octave count to <octaves>
      Then the keyboard should display <octaves> octaves of notes
      And all scale notes should remain visible and correctly positioned

      Examples:
        | octaves |
        | 1       |
        | 2       |
        | 3       |
        | 4       |

  Rule: Note display preferences affect scale presentation

    Example: Toggle between note names and scale degrees
      Given I have selected a scale
      When I switch to displaying scale degrees instead of note names
      Then the keyboard should show numbers (1-7) instead of note names
      But the underlying scale pattern should remain the same

    Example: Toggle between flats and sharps
      Given I have selected a scale that contains accidentals
      When I switch between flat and sharp notation
      Then the notes should display as either flats or sharps
      But the actual pitches should remain unchanged

  Rule: Application state should persist

    Example: Scale selection persists after page reload
      Given I have configured the piano with:
        | Setting     | Value |
        | Scale       | Blues |
        | Root Note   | G     |
        | Octaves     | 3     |
      When I reload the page
      Then my scale configuration should be restored
      And the keyboard should show the G Blues scale across 3 octaves