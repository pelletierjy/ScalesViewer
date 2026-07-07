# Feature Specification: Shareable URL Parameters for Scale Display Settings

**Feature Branch**: `002-url-params`

**Created**: 2026-07-06

**Status**: Draft

**Input**: User description: "Add route parameters so that the selected scale, and root, color mode, flat display mode, and number display are set on the url as querystring params. for ease osharing."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Share the current view with a link (Priority: P1)

A user has configured the app to show a specific scale, root note, color mode, flat/sharp display, and number display. They want to send this exact view to another person (e.g., a student or bandmate) so that person sees the identical setup without having to manually recreate each setting.

**Why this priority**: This is the core value of the feature — enabling easy sharing is the stated goal. Without this, the feature delivers no value.

**Independent Test**: Configure a non-default scale, root, color mode, flat display, and number display; copy the current browser URL; open it in a new browser session (or send to another device); confirm the same five settings are applied automatically.

**Acceptance Scenarios**:

1. **Given** a user has selected a scale, root note, color mode, flat display mode, and number display, **When** they copy the current page URL, **Then** the URL contains query parameters that fully describe those five settings.
2. **Given** a URL containing valid query parameters for all five settings, **When** a different user (or the same user in a new session) opens that URL, **Then** the page loads with those exact five settings applied, without any additional clicks.
3. **Given** a user changes any one of the five settings while on the page, **When** the change is applied, **Then** the browser URL updates automatically to reflect the new value, so the address bar can be copied at any time.

---

### User Story 2 - Bookmark a favorite configuration (Priority: P2)

A user wants to save a bookmark to a particular scale/root/display combination they use often, so they can return to it later without reconfiguring.

**Why this priority**: Builds on the same URL-encoding mechanism as sharing, but serves a personal-recall use case rather than sharing with others.

**Independent Test**: Configure the five settings, bookmark the page (or save the URL), close the browser, reopen the saved URL later, and confirm the same configuration is restored.

**Acceptance Scenarios**:

1. **Given** a user has bookmarked a URL containing the five query parameters, **When** they open the bookmark at a later time, **Then** the page restores the exact configuration captured at bookmark time, regardless of what the user's default/last-used settings currently are.

---

### User Story 3 - Open a link with only some parameters set (Priority: P3)

A user receives or constructs a URL that only specifies some of the five settings (e.g., only scale and root), with the rest omitted.

**Why this priority**: Improves robustness and supports simpler, hand-authored share links (e.g., "just show my scale, keep your own display preferences"), but is a secondary refinement of the core sharing behavior.

**Independent Test**: Open a URL with only a subset of the five query parameters present; confirm the specified settings are applied and the remaining settings fall back to the user's existing/default preferences without errors.

**Acceptance Scenarios**:

1. **Given** a URL with only some of the five query parameters present, **When** the page loads, **Then** the specified settings are applied and the unspecified settings use the current default/last-used values.

---

### Edge Cases

- What happens when a query parameter value is invalid or unrecognized (e.g., a misspelled scale name, an unsupported root note)? The affected setting MUST fall back to its default value rather than breaking the page or crashing the app.
- What happens when a URL contains no query parameters at all? The page MUST behave as it does today (using saved/default settings).
- What happens when a user navigates using the browser's back/forward buttons after changing settings? The displayed configuration MUST match the settings encoded in the URL for that history entry.
- What happens when a user switches between instrument pages (e.g., piano to guitar)? The five shared settings encoded in the URL MUST continue to apply consistently since they are shared across instruments.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST reflect the currently selected scale (including its mode/type) in the page's URL as a query parameter.
- **FR-002**: System MUST reflect the currently selected root note in the page's URL as a query parameter.
- **FR-003**: System MUST reflect the current color mode (highlighted root notes vs. monochrome) in the page's URL as a query parameter.
- **FR-004**: System MUST reflect the current flat/sharp note-naming display mode in the page's URL as a query parameter.
- **FR-005**: System MUST reflect the current number/scale-degree display mode in the page's URL as a query parameter.
- **FR-006**: System MUST update the URL automatically and immediately whenever the user changes any of the five settings, without requiring a page reload or manual action.
- **FR-007**: When a page is loaded with a URL containing any of these five query parameters, the system MUST initialize the corresponding settings from the URL rather than from saved/default preferences.
- **FR-008**: System MUST ignore invalid or unrecognized values for any of the five query parameters and fall back to that setting's default value, without affecting the other settings or breaking the page.
- **FR-009**: System MUST support partial parameter sets — any of the five parameters that are absent from the URL MUST fall back to the user's existing/default preference for that setting.
- **FR-010**: Copying the URL from the address bar at any point in time MUST reproduce the exact visual configuration (scale, root, color mode, flat display, number display) for anyone who opens it.
- **FR-011**: The five settings and their URL representation MUST remain consistent as a user navigates between different instrument pages within the app.

### Key Entities

- **Scale Display Configuration**: The shareable combination of settings covered by this feature — selected scale (type/mode), root note, color mode, flat display mode, and number display mode. This configuration is not tied to a specific instrument and is shared across all instrument pages.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can share their exact scale display configuration with another person by copying and pasting the browser URL, and the recipient sees an identical setup (scale, root, color mode, flat display, number display) 100% of the time for valid links.
- **SC-002**: The shareable URL updates to reflect a changed setting within 1 second of the user making that change, with no manual action required.
- **SC-003**: Opening a link containing all five settings fully restores the intended configuration immediately on page load, with no extra clicks needed.
- **SC-004**: A user can bookmark a specific configuration and, when returning to it at any later time, see the exact same configuration restored, independent of their current default preferences.
- **SC-005**: Links containing invalid or malformed values for any of the five settings still load the page successfully, using default values for the invalid settings only.

## Assumptions

- The five settings apply across all instrument pages that use the shared scale/display configuration (piano, guitar, kalimba, harmonica, flute, recorder), since these settings are currently shared app-wide rather than per-instrument.
- Instrument selection itself and instrument-specific settings (e.g., guitar tuning, fret count, custom scales/chords) are out of scope for this feature; only the five explicitly requested settings (scale, root, color mode, flat display mode, number display) are addressed.
- Existing local-storage-based persistence of user preferences remains as the fallback used whenever the URL does not specify a given setting.
- No authentication or access control is required, since this feature only affects a client-side visual/display configuration and does not expose or transmit private data.
- "Color mode" refers to the existing highlighted-root-notes vs. monochrome display toggle; "number display" refers to the existing scale-degree-number display toggle.
