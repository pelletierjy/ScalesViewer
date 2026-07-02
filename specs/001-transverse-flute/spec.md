# Feature Specification: Transverse Flute Instrument

**Feature Branch**: `[###-transverse-flute]`

**Created**: 2026-07-01

**Status**: Draft

**Input**: User description: "https://github.com/pelletierjy/ScalesViewer/issues/56"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Scale Fingerings on Flute Diagrams (Priority: P1)

A musician wants to see how to play a scale on a transverse flute. They navigate to the flute instrument page, select a scale (e.g., C Major), and choose how many consecutive notes to display. The system shows a horizontal row of vertical flute diagrams, one per note, each indicating the note name and the required key fingerings for that note on a standard Boehm-system concert flute.

**Why this priority**: This is the core value of the feature. Without it, the feature does not exist.

**Independent Test**: Can be fully tested by navigating to the flute page, selecting a scale and note count, and verifying that the correct number of flute diagrams appears with accurate note names and fingerings.

**Acceptance Scenarios**:

1. **Given** the user is on the flute instrument page, **When** they select C Major scale and a note count of 7, **Then** 7 vertical flute diagrams are displayed in a horizontal row, each labeled with its note name and showing the correct Boehm-system fingering.
2. **Given** a scale and note count are selected, **When** the user changes the root note (e.g., from C to G), **Then** all displayed flute diagrams update to show the new sequence of notes and their corresponding fingerings.
3. **Given** the user selects a 5-note scale (e.g., minor pentatonic) and a note count of 12, **Then** 12 flute diagrams are shown spanning multiple octaves by continuing the scale pattern into the next octave(s).

---

### User Story 2 - Adjust the Number of Displayed Notes (Priority: P2)

A musician wants to see more or fewer notes from a scale at once. They use a note count control to increase or decrease the number of flute diagrams displayed.

**Why this priority**: Allows users to focus on a small exercise or view a full two-octave range, adding flexibility to the core feature.

**Independent Test**: Can be tested by changing the note count control and verifying that the number of flute diagrams updates immediately while preserving the selected scale and root note.

**Acceptance Scenarios**:

1. **Given** 7 flute diagrams are currently displayed, **When** the user changes the note count to 12, **Then** 12 flute diagrams are shown without requiring a page reload.
2. **Given** a note count of 12 is selected, **When** the user changes the note count to 3, **Then** only the first 3 notes of the sequence are displayed.
3. **Given** the user changes the note count, **When** they later navigate away and return to the flute page, **Then** their last selected note count is restored (if persistence is supported by the application).

---

### User Story 3 - Play Back Individual Notes (Priority: P3)

A musician wants to hear what each displayed note sounds like. They interact with a flute diagram to hear the corresponding pitch.

**Why this priority**: Audio feedback helps users verify they are reading the fingerings correctly and supports ear training. The application already provides audio playback for other instruments.

**Independent Test**: Can be tested by clicking or tapping a flute diagram and verifying that the correct pitch is audible.

**Acceptance Scenarios**:

1. **Given** flute diagrams are displayed, **When** the user clicks on a specific flute diagram, **Then** the corresponding note plays back at the correct pitch.
2. **Given** a note is currently playing, **When** the user clicks a different flute diagram, **Then** the previous note stops and the newly selected note plays.
3. **Given** the user is on a mobile device, **When** they tap a flute diagram, **Then** the note plays back with the same behavior as on desktop.

---

### Edge Cases

- What happens when the selected note count exceeds the practical range of the instrument? The system continues displaying notes across octaves using the same scale pattern.
- How does the system handle notes that have alternate standard fingerings? The primary standard fingering is displayed; alternate fingerings are out of scope for the initial version.
- What happens on narrow viewports (mobile)? The horizontal row of flute diagrams becomes horizontally scrollable or scales down to fit the screen.
- How are enharmonic equivalents displayed (e.g., F# vs. Gb)? The application follows its existing note naming preference (sharps by default, consistent with other instruments).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to navigate to a transverse flute instrument page from the instrument selector.
- **FR-002**: System MUST provide a note count selector allowing users to choose how many consecutive scale notes to display (range: 1 to 24).
- **FR-003**: System MUST display each selected note on a separate vertical flute diagram instance.
- **FR-004**: Flute diagram instances MUST be arranged horizontally in a row, ordered from lowest note to highest note (left to right in LTR layouts).
- **FR-005**: Each flute diagram MUST visually indicate the note name (including octave when relevant) and the required key fingerings using a standard Boehm-system schematic representation.
- **FR-006**: System MUST update all displayed fingerings immediately when the user changes the selected scale, root note, or note count.
- **FR-007**: System MUST support consecutive notes spanning multiple octaves when the note count exceeds the number of unique notes in one octave of the selected scale.
- **FR-008**: Users MUST be able to interact with any flute diagram (click or tap) to hear the corresponding note played back at the correct pitch.
- **FR-009**: The transverse flute instrument MUST be listed alongside existing instruments (guitar, piano, kalimba, harmonica) in the instrument selection.
- **FR-010**: Flute diagrams MUST be rendered using scalable vector graphics so they remain clear at any screen size.

### Key Entities *(include if feature involves data)*

- **Flute Diagram**: A visual representation of a transverse flute showing the fingering for a single note. Key attributes: note name, octave, ordered list of key states (closed/open), display position in the sequence.
- **Note Sequence**: The ordered list of consecutive scale notes to be displayed across multiple flute diagrams. Key attributes: selected scale, root note, note count, computed notes with octave information.
- **Fingering Pattern**: The Boehm-system key configuration required to produce a specific pitch on a standard concert flute. Key attributes: pitch (note + octave), closed keys, open keys.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can view any selected scale on flute diagrams within 2 seconds of changing the scale or root note.
- **SC-002**: The note count selector supports values from 1 to 24, and the display updates without visible lag for counts up to 12 on mobile devices.
- **SC-003**: 100% of displayed flute diagrams show a musically correct fingering for the corresponding note on a standard Boehm-system concert flute in the standard range (C4 to C7).
- **SC-004**: Users can play back any displayed note by interacting with its flute diagram, with audio starting within 200 milliseconds of the interaction.
- **SC-005**: The flute instrument page is accessible and usable on screen widths as narrow as 320 pixels, with diagrams remaining readable and interactive.

## Assumptions

- The transverse flute refers to the modern concert flute in C using the Boehm key system.
- Primary (most common) fingerings are shown for each note; alternate or trill fingerings are out of scope for the initial version.
- The existing application's scale calculation utilities (equal temperament, enharmonic handling, scale definitions) are reused without modification.
- The existing audio playback infrastructure (sample playback, synthesis) is extended to support the flute instrument.
- The visual style follows the application's existing SVG-based, schematic approach used for other instruments.
- Consecutive notes span into higher octaves when the note count exceeds the notes available in the starting octave.
- The application already persists instrument preferences and scale selections; these mechanisms will be extended to include the flute page state.
