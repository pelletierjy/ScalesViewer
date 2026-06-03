# Feature Specification: Instrument-Aware Audio (v1)

**Created**: 2026-06-02  
**Status**: Implemented  
**Input**: Play notes with timbre matching the active instrument page; configurable sound engine; static assets only.

## User Scenarios

### User Story 1 - Instrument samples on click (Priority: P1)

As a musician on the guitar page, I want clicked notes to sound plucked/guitar-like so that practice matches the instrument I am studying.

**Acceptance Scenarios**:

1. **Given** sound engine is `sample` and instrument is `guitar`, **When** a note is played, **Then** playback uses the guitar static sample pitched to the note frequency (FR-003, FR-004).
2. **Given** sound engine is `sample` and instrument is `piano`, **When** a note is played, **Then** playback uses the piano static sample (FR-003).
3. **Given** the played note is `A4`, **When** playback runs, **Then** pitch is 440 Hz without an extra octave shift (FR-005).

### User Story 2 - Sound engine setting (Priority: P1)

As a user, I want to choose how notes are synthesized in Settings so that I can prefer samples, pluck synth, or classic sine.

**Acceptance Scenarios**:

1. **Given** the settings panel is open, **When** the user views Sound settings, **Then** options are Instrument samples, Pluck synth, and Classic sine (FR-006).
2. **Given** the user selects Pluck synth, **When** they play on guitar or kalimba, **Then** Karplus-Strong synthesis is used (FR-007).
3. **Given** the user selects Pluck synth, **When** they play on piano or harmonica, **Then** sample playback is used with sine fallback if the sample fails (FR-008).
4. **Given** the user selects Classic sine, **When** any note is played, **Then** a sine oscillator is used (FR-009).
5. **Given** the user changes sound engine, **When** settings are saved, **Then** `soundEngine` persists in `globalConfig` (FR-010).

### User Story 3 - Sequencer uses current instrument (Priority: P2)

As a user running the pattern sequencer on the guitar page, I want steps to use guitar audio so that practice is consistent.

**Acceptance Scenarios**:

1. **Given** instrument in Redux is `guitar` and pattern playback advances, **When** a step plays, **Then** the same routing as click-to-play applies with instrument `guitar` (FR-011).

## Functional Requirements

- **FR-001**: Each `Instrument` (`guitar`, `piano`, `kalimba`, `harmonica`) MUST have one static sample URL and root note in config.
- **FR-002**: Samples MUST be served from `public/sounds/` (no backend).
- **FR-003**: When `soundEngine` is `sample`, playback MUST use `AudioBufferSourceNode` with `playbackRate` from root frequency to target frequency.
- **FR-004**: Sample load MUST be lazy and cached per instrument.
- **FR-005**: Frequency MUST be computed from the requested `NoteWithOctave` without forcing +1 octave.
- **FR-006**: Settings panel MUST expose `soundEngine` selection.
- **FR-007**: When `soundEngine` is `synth` and instrument is `guitar` or `kalimba`, playback MUST use Karplus-Strong pluck synthesis.
- **FR-008**: When `soundEngine` is `synth` and instrument is `piano` or `harmonica`, playback MUST attempt sample then fall back to sine.
- **FR-009**: When `soundEngine` is `sine`, playback MUST use a sine oscillator only.
- **FR-010**: `soundEngine` MUST default to `sample` and persist via existing Redux/localStorage flow.
- **FR-011**: `usePlayNote` MUST pass Redux `instrument` and `soundEngine` into `playNote`.
- **FR-012**: If sample load or decode fails, playback MUST fall back to sine without throwing.

## Test Mapping

| Requirement | Unit test file |
|-------------|----------------|
| FR-001, FR-002 | `instrumentSampleConfig.test.ts` |
| FR-007–FR-009, FR-012 | `playbackStrategy.test.ts` |
| FR-003–FR-005, FR-012 | `audioUtils.test.ts` (mocked Web Audio) |
| FR-010 | `globalConfig.soundEngine.test.ts` |
| FR-006 | `SettingsPanel.sound.test.tsx` |
| User stories (E2E) | `features/instrument-audio/instrument-audio.feature` |
