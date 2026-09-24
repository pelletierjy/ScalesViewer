# ScalesViewer — App-Context Knowledge Base (for the embedded AI tutor)

## Scope and how to import this

These are **application execution context** articles, not pedagogical/curriculum
content: they tell the AI tutor what host app it's running inside (ScalesViewer)
and what's on screen, independent of subject/grade. One **main** article
(`Title: ScalesViewer`, matching the app-context key the host would pass) plus
six **sub-articles** it references by title.

Each article below maps directly onto the existing `KnowledgeEntry` fields and
the admin entry editor. Use the **Entry Type: App Context** toggle in the
editor (not the Subject/Grade Level fields — those are for regular
subject/grade tutoring content and are unused here):

| Section here      | Field              | How to set it |
|---|---|---|
| Entry Type         | `entryType`        | Select **App Context** in the editor's Entry Type dropdown |
| Context Key        | `contextKey`       | `ScalesViewer` — same value on the main article **and** every sub-article |
| Main Article       | `isMainArticle`    | Check for article 1 only; leave unchecked for the 6 sub-articles |
| Title              | `title`            | Copy verbatim, including the `ScalesViewer: ` prefix on sub-articles |
| Content            | `contentBody`      | Copy verbatim |
| Pedagogical Notes  | `pedagogicalNotes` | Copy verbatim |

This is wired up end-to-end: ScalesViewer's `<conversia-app>` embed passes
`context="ScalesViewer"` (`src/components/HomeworkPanel/HomeworkPanel.tsx`),
conversia-core loads the entry with `contextKey: "ScalesViewer"` and
`isMainArticle: true` on every turn, semantically searches the other entries
sharing that `contextKey` for relevant sub-articles, and now also injects
`pedagogicalNotes` into the model's prompt alongside the content body.

Content is written dense/terse on purpose (short declarative sentences, no
filler) since it's meant to sit in an LLM's context window, not be read as
prose by a person.

---

## 1. Main article

**Entry Type:** App Context
**Context Key:** ScalesViewer
**Main Article:** Yes
**Title:** ScalesViewer

**Content:**
ScalesViewer is a web app for visualizing musical scales across 6 instruments: guitar, piano, kalimba, harmonica, flute, recorder — one page per instrument, switchable from the header. A shared toolbar controls: root note, scale type (36+ built-in types across 8 groups — Common, Jazz, Modes, Modal Variants, Exotic, Symmetric, Pentatonic Variants, plus user-defined Custom), note-label mode (plain note name / flat spelling / scale degree — applies to every instrument at once), monochrome-vs-colored note highlighting, dark/light theme, and interface language (English, French, Spanish).

Below the instrument view, three panels are shared across all instruments: Chord-Scale Intersection (lists the diatonic triads in the current scale; clicking one highlights its tones on the instrument), Pattern Sequencer (a step-sequencer that plays note patterns drawn from the current scale, with adjustable tempo and an optional loop), and a collapsible Details strip (current scale, display mode, note-label mode, color mode).

This AI tutor is itself embedded in ScalesViewer, opened via a brain-icon toggle in the header and shown as a resizable/collapsible sidebar. It is an experimental, free-tier feature still under construction — say so if a student asks how reliable or complete it is.

Related articles (load only the ones relevant to the current conversation): "ScalesViewer: Guitar", "ScalesViewer: Piano", "ScalesViewer: Wind Instruments (Flute & Recorder)", "ScalesViewer: Kalimba & Harmonica", "ScalesViewer: Scales & Custom Scales", "ScalesViewer: Controls Reference". Load "Controls Reference" whenever the right move is to tell the student which input to change, not just explain a concept.

**Pedagogical Notes:**
Infer the active instrument from what the student mentions: frets/tuning/strings → guitar; keys/octaves → piano; tines → kalimba; holes/blow/draw → harmonica; a fingering chart with no key or tuning talk → flute or recorder (ask which if it matters, or check for a mentioned recorder size). Refer to on-screen controls by their actual names above (e.g. "the Scale Type dropdown"), not generic descriptions — the student is looking at this UI while talking to you. Pull in a related article only once the conversation actually needs that instrument's specifics; don't front-load all of them.

---

## 2. Sub-article: Guitar

**Entry Type:** App Context
**Context Key:** ScalesViewer
**Main Article:** No
**Title:** ScalesViewer: Guitar

**Content:**
Interactive fretboard for 4–18 string instruments. Built-in tuning presets (Standard, Drop, Open, DADGAD, Nashville, and others, across 6/7/8-string variants) plus a Custom Tuning Editor: name a tuning, choose 4–18 strings, set each open-string note. Fret count is a fixed choice of 12, 20, 21, 22, 23, or 24 — not a free continuous range. Multiscale/fanned-fret mode is available: separate treble and bass scale lengths, plus a choice of perpendicular fret (Nut, 7th, 9th, or 12th). The neck can be flipped horizontally and/or vertically. Individual strings and individual fret positions (including the open string) can each be enabled or disabled; disabled ones stop showing notes. Fretboard texture (Rosewood, Ebony, Maple, Pau Ferro, Richlite) and string spacing (Normal, Enlarged) are cosmetic only.

**Pedagogical Notes:**
When explaining intervals on guitar, reference actual string/fret positions in the student's current tuning if it's known, not just abstract scale-degree numbers. A fret count above 12 (20–24) means an extended-range instrument — don't assume a standard 22-fret guitar layout when reasoning about position.

---

## 3. Sub-article: Piano

**Entry Type:** App Context
**Context Key:** ScalesViewer
**Main Article:** No
**Title:** ScalesViewer: Piano

**Content:**
On-screen keyboard spanning 1–4 octaves (adjustable). Only notes belonging to the current scale are clickable/playable; clicking a key plays it and visually selects it (a larger, glowing marker) until clicked again or another note is chosen.

**Pedagogical Notes:**
Piano is the simplest instrument view here — a good default for explaining scale and interval theory to a student who isn't asking about a specific instrument, since the white/black key layout is the most universally recognized.

---

## 4. Sub-article: Wind Instruments (Flute & Recorder)

**Entry Type:** App Context
**Context Key:** ScalesViewer
**Main Article:** No
**Title:** ScalesViewer: Wind Instruments (Flute & Recorder)

**Content:**
Both instruments show a horizontal strip of fingering-chart diagrams, one per scale note; the number of notes shown is adjustable (1, 3, 5, 7, 12, or 16). Flute uses a standard Boehm fingering. Recorder additionally lets the student choose the instrument's size/key — Sopranino, Soprano, Alto, Tenor, Bass, Great Bass, Contrabass, or Sub-contrabass — each built "in C" or "in F", which changes what pitch a given fingering produces.

**Pedagogical Notes:**
If a student's described notes don't match the fingering they mention, check which recorder size is selected before assuming a fingering mistake — the same fingering sounds a different pitch on a different-sized instrument.

---

## 5. Sub-article: Kalimba & Harmonica

**Entry Type:** App Context
**Context Key:** ScalesViewer
**Main Article:** No
**Title:** ScalesViewer: Kalimba & Harmonica

**Content:**
Kalimba: a fixed, traditional 17-tine layout arranged center-outward, with no configuration options. Harmonica: a 10-hole diatonic layout with a key selector (C, G, A, D, F, Bb, Eb) that transposes the whole instrument; each hole displays both its blow note (↑) and its draw note (↓).

**Pedagogical Notes:**
On harmonica, note availability depends on breath direction (blow vs. draw) at the same hole — a "wrong note" complaint may mean the wrong breath direction was used, not the wrong hole.

---

## 6. Sub-article: Scales & Custom Scales

**Entry Type:** App Context
**Context Key:** ScalesViewer
**Main Article:** No
**Title:** ScalesViewer: Scales & Custom Scales

**Content:**
A scale is a root note plus a scale type (and, for some types, a mode — e.g. Dorian). There are 36+ built-in scale types across 8 groups: Common (Major, Minor, Pentatonic, Blues, ...), Jazz (Bebop, Bebop Dominant, ...), Modes (the 7 diatonic modes), Modal Variants, Exotic (Byzantine, Hirajoshi, In-Sen, Iwato, ...), Symmetric, Pentatonic Variants, and user-defined Custom. The Custom Scale Editor lets a student build a scale from 2–12 intervals (semitones from the root; the root itself, interval 0, must be included), name it, and assign it a group; it then appears in the same scale-type dropdown as the built-in scales.

**Pedagogical Notes:**
When a student is building a Custom Scale, the editor already blocks saving if the interval list is missing the root or has duplicate values — but explaining *why* a scale needs its root included is worthwhile pedagogy in the conversation itself, not just an error to route around.

---

## 7. Sub-article: Controls Reference

**Entry Type:** App Context
**Context Key:** ScalesViewer
**Main Article:** No
**Title:** ScalesViewer: Controls Reference

**Content:**
Every input in ScalesViewer, what it does, and what values it takes. Global controls live in the header and affect every instrument at once; instrument-specific controls only appear on that instrument's page.

The Instrument selector, Root, Scale Type, the two note-label toggles, Color mode, the Chord-Scale Intersection toggle, and Sound Engine can now be applied directly by the tutor (not just suggested verbally) — everything else below still needs to be described so the student changes it themselves.

GLOBAL CONTROLS (header, always visible):
- Instrument selector — switches the whole page. Values: Guitar, Piano, Kalimba, Harmonica, Flute, Recorder. Nothing else on the page persists conceptually across this switch except the scale (root+type) and the four display toggles below — everything instrument-specific (tuning, octave count, fret count, etc.) is remembered per instrument, not shared.
- Root selector — sets the scale's root note. Values: the 12 chromatic notes, always listed with sharp spellings (C, C#, D, ...) regardless of the Sharp/Flat toggle below — that toggle only affects note labels drawn on the instrument itself, not this dropdown's own option text. Changing root transposes the whole scale without changing its type/shape.
- Scale Type selector — sets the scale's interval pattern (see "ScalesViewer: Scales & Custom Scales" for the full type list and groups). This is the primary "what scale are we looking at" control. Includes "+ Custom Scale" to open the Custom Scale Editor.
- Note-label mode — two independent toggles, not one setting:
  - Names vs. Scale Degrees (button shows "ABC" or "123"): switches every note's label between its letter name (C, D, E...) and its scale-degree number relative to the current root (1, 2, 3... with ♭ for lowered degrees, e.g. ♭3).
  - Sharps vs. Flats (button shows ♯ or ♭): only affects how accidentals are *spelled* (C# vs Db) — has no effect when Scale Degrees mode is active, and no effect on notes that aren't sharp/flat.
- Color mode toggle (button shows 🎨 or ⚫): switches between two note-coloring schemes:
  - Interval-degree coloring (the richer default): every scale degree gets its own color (an emerald gradient for even-numbered degrees, orange for odd), so degrees are visually distinguishable at a glance.
  - Root-highlight / monochrome: the root note gets one distinct color, every *other* scale note collapses to a single flat gray/blue — degree identity is no longer color-coded, only "is this the root or not" is.
- Chord-Scale Intersection toggle — shows/hides the panel listing the current scale's diatonic triads (see the shared-panels overview above). No separate "selected chord" value is tutor-settable; only whether the panel is shown.
- Dark/Light theme, Language (English/French/Spanish) — cosmetic/accessibility only, no theory implications.
- Sound Engine (Settings panel) — Sample, Synth, or Sine playback for note audio. Purely a listening-quality choice, no theory implications; tutor-settable but not something to suggest as an answer to a theory question.

GUITAR-ONLY CONTROLS (Configuration panel below the fretboard):
- Tuning — chooses the string tuning *preset* (the pattern of intervals between open strings): Standard, Drop, Open, DADGAD, Nashville, and others, each available in 6/7/8-string variants. Also offers "+ Custom Tuning" (open the Custom Tuning Editor: name a tuning, pick 4–18 strings, set each open string individually), and Edit/Duplicate/Delete for any custom tuning currently selected.
- Base Tuning — a *separate* control from both Tuning and the global Root selector. It transposes the entire selected Tuning preset up or down chromatically from its normal reference pitch (E), the way a capo effectively shifts a whole tuning shape to a new starting pitch. Example: Tuning = "Standard (6)" (normally E-A-D-G-B-E) with Base Tuning = "F" produces F-Bb-Eb-Ab-C-F — same relative shape, shifted up one semitone. This does NOT change the scale being viewed (that's the Root selector); it changes what pitches the open strings actually are.
- Number of frets — fixed choice: 12, 20, 21, 22, 23, or 24 (not a free range).
- Orientation — flip horizontally and/or vertically (visual only, no theory effect).
- Multiscale/fanned frets — toggle on, then set Treble Scale Length and Bass Scale Length (in inches, only shown if no preset matches the current string count) and Perpendicular Fret (Nut, 7th, 9th, or 12th) — models a fanned-fret instrument where each string has a different scale length.
- Per-string and per-fret-position enable/disable checkboxes — hide specific strings or specific fret columns (including the open-string column) from note display, without changing tuning or fret count. Useful for isolating "just this string" or "just these frets" during an explanation.
- Fretboard Texture, String Spacing — cosmetic only.

PIANO-ONLY CONTROL:
- Octave Count — how many octaves are drawn. Values: 1, 2, 3, or 4. Purely a display-range control; doesn't change the scale.

FLUTE / RECORDER CONTROL:
- Note Count — how many scale-note fingering diagrams are shown in the strip. Values: 1, 3, 5, 7, 12, or 16. Purely a display-range control.
- Recorder Type (recorder only) — instrument size/key: Sopranino, Soprano, Alto, Tenor, Bass, Great Bass, Contrabass, Sub-contrabass, each "in C" or "in F". Changes which pitch each fingering produces; does not change the scale being viewed.

HARMONICA-ONLY CONTROL:
- Harmonica Key — transposes the whole 10-hole layout. Values: C, G, A, D, F, Bb, Eb.

KALIMBA: no configurable inputs — fixed 17-tine layout.

**Pedagogical Notes:**
Match the change to what's actually being discussed, and prefer the smallest change that answers the question. For the controls marked tutor-settable above, apply the change directly and narrate it in the same reply rather than just describing it; for everything else, tell the student which control to change themselves:
- Discussing a *different scale/key* → suggest the Root and/or Scale Type selectors, not an instrument-specific control.
- Discussing *reading notes as scale degrees* (e.g. "what's the 3rd of this scale") → suggest the Names/Degrees toggle rather than asking the student to count manually.
- Discussing *enharmonic spelling* (why a note is called C# here and Db there) → suggest the Sharps/Flats toggle; note it has no visible effect while Scale Degrees mode is on, so switch back to Names first if needed.
- Discussing *which notes are the root vs. everything else* (e.g. ear-training on tonic recognition) → suggest Root-highlight/monochrome color mode. Discussing *degree relationships or intervals in general* → suggest interval-degree coloring instead.
- Discussing *a different instrument's fingering/layout* → suggest the Instrument selector, and mention that per-instrument settings (tuning, octave/note/fret count) won't carry over.
- On guitar, discussing *alternate tunings* (Drop D, Open G, ...) → suggest the Tuning preset, not Base Tuning. Discussing *"what if everything were shifted up/down"* or capo-style reasoning → suggest Base Tuning, and be explicit that it's independent of the Root selector (don't let the student conflate "the scale's root" with "the tuning's base pitch").
- Discussing *only part of the fretboard* (e.g. "just look at the low E string") → suggest disabling the other strings/frets via the enable/disable checkboxes rather than trying to describe which parts to ignore.
- Discussing *a wider or narrower range* of notes/octaves shown → suggest the relevant count control (Fret Count, Octave Count, or Note Count) for the current instrument.
- Never suggest a cosmetic-only control (theme, fretboard texture, string spacing, orientation flip) as an answer to a theory question — they have no effect on scale content.
