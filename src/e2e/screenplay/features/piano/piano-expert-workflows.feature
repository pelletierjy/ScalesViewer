Feature: Advanced Piano Workflows for Expert Musicians
  As Jean-Yves, an expert musician
  I want to perform complex musical analysis and configurations
  So that I can explore advanced harmonic relationships and exotic scales

  Background:
    Given Jean-Yves is on the piano page with expert capabilities

  Rule: Expert users can analyze complex harmonic relationships

    Example: Compare scales across different keys
      When Jean-Yves analyzes the Dorian mode in multiple keys:
        | Key | Starting Note |
        | C   | C             |
        | G   | G             |
        | D   | D             |
        | A   | A             |
      Then he should observe the consistent interval pattern
      And identify how the mode character changes with different root notes

    Example: Explore exotic scales
      When Jean-Yves explores these advanced scales:
        | Scale              | Characteristics                    |
        | Hungarian Minor    | Augmented second interval          |
        | Neapolitan Major   | Flat second, flat fifth            |
        | Whole Tone         | All whole steps                    |
        | Diminished         | Alternating whole and half steps   |
      Then each scale should display its unique intervallic structure
      And Jean-Yves should be able to identify the theoretical basis

  Rule: Expert users require precise audio feedback

    Example: Verify accurate pitch playback
      Given Jean-Yves has perfect pitch capabilities
      When he plays notes from the C Major scale
      Then the audio frequencies should match standard concert pitch (A4 = 440Hz)
      With frequency accuracy within 0.01% tolerance

    Example: Test microtonal awareness
      When Jean-Yves examines scales with microtonal variations
      Then the system should accurately represent
        | Frequency | Note Representation |
        | 261.63Hz  | Middle C            |
        | 277.18Hz  | C#4/Db4             |
        | 293.66Hz  | D4                  |
      And maintain harmonic accuracy across all octaves

  Rule: Expert users need advanced configuration options

    Example: Custom temperament settings
      When Jean-Yves adjusts the tuning system
        | Temperament     | Use Case                  |
        | Equal           | Modern standard           |
        | Just Intonation | Pure intervals            |
        | Well Temperament| Historical performance  |
      Then the scale intervals should adjust accordingly
      And the visual representation should reflect the tuning changes

  Example: Multi-scale comparison mode
    When Jean-Yves enables comparison mode
      And selects these scales for comparison:
        | Scale 1 | Scale 2     |
        | Major   | Minor       |
        | Major   | Lydian      |
        | Dorian  | Natural Minor |
    Then both scales should be displayed simultaneously
    And the differences in interval structure should be clearly visible
    And common tones should be highlighted

  Rule: Expert users perform advanced analysis

    Example: Harmonic function analysis
      When Jean-Yves analyzes the C Major scale from a functional harmony perspective
      Then he should be able to identify:
        | Scale Degree | Function | Chord Quality |
        | 1st          | Tonic    | Major         |
        | 2nd          | Supertonic | Minor       |
        | 3rd          | Mediant  | Minor         |
        | 4th          | Subdominant | Major    |
        | 5th          | Dominant | Major         |
        | 6th          | Submediant | Minor     |
        | 7th          | Leading Tone | Diminished |

    Example: Modal interchange exploration
      When Jean-Yves explores modal interchange possibilities in C Major
      Then he should be able to visualize borrowed chords from:
        | Source Mode | Available Chords |
        | C Minor     | ii°, iv, bVI, bVII |
        | C Dorian    | ii, IV, vi, bVII   |
        | C Phrygian  | II, iv, v°, bVI    |