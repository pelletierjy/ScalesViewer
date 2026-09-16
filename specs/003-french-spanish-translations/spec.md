# Feature Specification: French and Spanish Translations

**Feature Branch**: `[003-french-spanish-translations]`

**Created**: 2026-08-03

**Status**: Draft

**Input**: User description: "add french and spanish translations"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - French-speaking musician uses the app in French (Priority: P1)

A musician whose primary language is French opens the app and sees all interface text, labels, help content, scale names, and instructional text displayed in French. They can navigate between instruments, select scales, adjust settings, and understand all on-screen guidance without encountering English text.

**Why this priority**: French-speaking users currently face a language barrier that prevents full access to the app's educational value. This is the core value delivery of the feature.

**Independent Test**: Can be fully tested by setting the language to French and verifying that every visible text element across all instrument pages, settings, and help content appears in French.

**Acceptance Scenarios**:

1. **Given** the app is set to French, **When** the user views the header and instrument pages, **Then** all labels, buttons, tooltips, and dropdown options display in French.
2. **Given** the app is set to French, **When** the user opens the settings panel, **Then** all settings labels, descriptions, and button text display in French.
3. **Given** the app is set to French, **When** the user opens the help modal, **Then** all instructional slides, feature descriptions, and navigation text display in French.

---

### User Story 2 - Spanish-speaking musician uses the app in Spanish (Priority: P1)

A musician whose primary language is Spanish opens the app and sees all interface text, labels, help content, scale names, and instructional text displayed in Spanish. They can navigate between instruments, select scales, adjust settings, and understand all on-screen guidance without encountering English text.

**Why this priority**: Spanish is one of the most widely spoken languages globally. Delivering Spanish translations alongside French ensures broad accessibility and aligns with the user's explicit request.

**Independent Test**: Can be fully tested by setting the language to Spanish and verifying that every visible text element across all instrument pages, settings, and help content appears in Spanish.

**Acceptance Scenarios**:

1. **Given** the app is set to Spanish, **When** the user views the header and instrument pages, **Then** all labels, buttons, tooltips, and dropdown options display in Spanish.
2. **Given** the app is set to Spanish, **When** the user opens the settings panel, **Then** all settings labels, descriptions, and button text display in Spanish.
3. **Given** the app is set to Spanish, **When** the user opens the help modal, **Then** all instructional slides, feature descriptions, and navigation text display in Spanish.

---

### User Story 3 - User switches language on demand (Priority: P2)

A user who is comfortable in multiple languages can switch between English, French, and Spanish at any time from the main interface. The change applies immediately without requiring a page refresh, and all visible text updates to the selected language.

**Why this priority**: Language switching is essential for users in multilingual environments and for testing/verification, but the app still delivers value if users must reload the page to see changes.

**Independent Test**: Can be fully tested by triggering the language selector and observing that all visible text updates to the new language without a page reload.

**Acceptance Scenarios**:

1. **Given** the app is displaying in English, **When** the user selects French from the language selector, **Then** all visible text updates to French within one second.
2. **Given** the app is displaying in French, **When** the user selects Spanish from the language selector, **Then** all visible text updates to Spanish within one second.

---

### User Story 4 - Language preference persists across sessions (Priority: P2)

When a user selects a language, that choice is remembered the next time they open the app, even if they close their browser or clear their browsing session. On the very first visit, the app detects the user's browser language preference and automatically selects French or Spanish if either is the primary browser language.

**Why this priority**: Persistence removes friction for returning users and automatic detection improves the first-time experience. However, users can still manually select a language if this story is not implemented.

**Independent Test**: Can be fully tested by selecting a non-English language, closing the browser, reopening the app, and verifying the previously selected language is active.

**Acceptance Scenarios**:

1. **Given** a user has selected French, **When** they close and reopen the app, **Then** the app displays in French without requiring manual selection.
2. **Given** a first-time visitor whose browser primary language is Spanish, **When** they open the app for the first time, **Then** the app initially displays in Spanish.
3. **Given** a first-time visitor whose browser primary language is neither English, French, nor Spanish, **When** they open the app for the first time, **Then** the app defaults to English.

---

### Edge Cases

- What happens when a translation is missing for a newly added feature? The system MUST fall back to English gracefully without breaking the UI.
- How does the system handle user-created content (custom scale names, custom tuning names) when switching languages? User-generated names remain in the language they were created in; only system text is translated.
- What happens when a user with a non-supported browser language visits for the first time? The app defaults to English.
- How are instrument audio samples or note names affected by language selection? Audio playback and note frequencies remain unchanged; only display labels are affected.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: The app MUST support three languages: English (default), French, and Spanish.
- **FR-002**: All static user-facing text MUST be translatable, including but not limited to: UI labels, button text, tooltips, dropdown options, section headings, and navigation elements.
- **FR-003**: A language selector MUST be visible and accessible from the main interface on all instrument pages.
- **FR-004**: The selected language MUST persist across browser sessions so returning users see their previously chosen language.
- **FR-005**: On a user's first visit, the app MUST detect the browser's primary language preference and default to French or Spanish if supported; otherwise default to English.
- **FR-006**: All scale type names and scale category group names MUST be translated into the active language.
- **FR-007**: All instrument names (Guitar, Piano, Kalimba, Harmonica, Flute, Recorder) MUST be translated into the active language.
- **FR-008**: All settings panel labels, descriptions, sound engine options, and instructional text MUST be translated into the active language.
- **FR-009**: All help modal slides, feature descriptions, step-by-step instructions, and notes MUST be translated into the active language.
- **FR-010**: All confirmation dialogs, error messages, success notifications, and validation messages MUST be translated into the active language.
- **FR-011**: All tuning preset names, tuning categories, fretboard texture names, and multiscale option labels MUST be translated into the active language.
- **FR-012**: For French and Spanish, note names MUST be displayed using solfège conventions (Do-Ré-Mi-Fa-Sol-La-Si) instead of letter names (C-D-E-F-G-A-B). English MUST continue to use letter names.
- **FR-013**: The selected language MUST be reflected in shareable URLs so that when a user shares a link, the recipient sees the app in the sender's chosen language.

### Key Entities *(include if feature involves data)*

- **Language Option**: Represents a supported language with a display name and unique identifier (e.g., `en`, `fr`, `es`).
- **Translation Message**: A key-value mapping where the key is a stable identifier and the value is the human-readable text for a specific language.
- **User Language Preference**: The user's explicitly selected or automatically detected language choice, persisted for future sessions.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: A French-speaking user can complete core tasks (select an instrument, choose a scale, play notes, adjust settings, read help content) without encountering any English text.
- **SC-002**: A Spanish-speaking user can complete core tasks (select an instrument, choose a scale, play notes, adjust settings, read help content) without encountering any English text.
- **SC-003**: Users can switch between English, French, and Spanish and see all text update within one second.
- **SC-004**: 100% of returning users see their previously selected language automatically applied on their next visit.
- **SC-005**: First-time visitors with French or Spanish as their primary browser language see the app in their language without manual intervention.
- **SC-006**: If a translation is missing for any text, the app displays the English fallback without visible errors or broken layout.

## Assumptions

- Musical scale names and music theory terms can be meaningfully translated into French and Spanish without losing educational value.
- User-generated content (custom scale names, custom tuning names) will remain in the language the user created it in and is not within the scope of automated translation.
- Right-to-left (RTL) language support is out of scope for this feature.
- English will always serve as the fallback language when a translation is missing.
- The translation scope covers all static text visible in the current application; future features added after this implementation will require their own translation keys.
