# Data Model: Settings Export/Import/Reset

**Date**: 2026-03-19
**Feature**: Settings Export/Import/Reset

## Entity: SettingsExport

The complete export format containing all user settings.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | Yes | Application version (semver) for migration handling |
| `exportedAt` | string (ISO 8601) | Yes | Timestamp of export |
| `reduxState` | ReduxState | Yes | Complete Redux store state |
| `guitarSettings` | GuitarSettings | Yes | Guitar-specific localStorage values |

### Example

```json
{
  "version": "1.0.0",
  "exportedAt": "2026-03-19T10:30:00.000Z",
  "reduxState": {
    "globalConfig": {
      "isDarkMode": true,
      "instrument": "guitar",
      "scale": { "root": "C", "type": "major", "mode": "ionian" },
      "scaleRoot": { "name": "Standard Tuning", "notes": ["E", "A", "D", "G", "B", "E"] },
      "showFlats": false,
      "highlightRoots": true,
      "showDegrees": false
    },
    "applicationState": { /* ... */ },
    "audio": { /* ... */ },
    "selectedNote": { /* ... */ }
  },
  "guitarSettings": {
    "customTunings": [
      { "name": "My Custom", "notes": ["D", "A", "D", "G", "B", "E"], "category": "Custom" }
    ],
    "currentTuning": { "name": "Standard Tuning", "notes": ["E", "A", "D", "G", "B", "E"] },
    "fretCount": 24,
    "flipX": false,
    "flipY": false,
    "baseTuning": 0
  }
}
```

---

## Entity: SettingsImport

Partial export format where all fields are optional. Used for import operations.

### Fields

Same structure as SettingsExport, but all fields are optional.

### Validation Rules

1. **Version Check**: If `version` is present and significantly different from current app version, show migration warning
2. **Type Validation**: Each field must match expected TypeScript type
3. **Unknown Keys**: Silently ignored
4. **Null/Undefined**: Treated as "not provided", existing value preserved

### Merge Strategy

```
For each key in imported data:
  If key exists in current settings:
    If value is valid type:
      Overwrite current value
    Else:
      Skip with warning
  Else:
    Skip (unknown key)
```

---

## Entity: localStorageKeyMap

Mapping of localStorage keys to their data types.

| localStorage Key | Data Type | Category | Default Value |
|------------------|-----------|----------|---------------|
| `state` | JSON object | Redux | `{ globalConfig: {...}, ... }` |
| `custom-tunings` | JSON array | Guitar | `[]` |
| `current-scaleRoot` | JSON object | Guitar | First tuning preset |
| `fretCount` | Number | Guitar | `24` |
| `flipX` | Boolean | Guitar | `false` |
| `flipY` | Boolean | Guitar | `false` |
| `baseTuning` | Number | Guitar | `0` |

---

## State Transitions

### Export Flow

```
[Idle] → [Gathering Data] → [Creating File] → [Triggering Download] → [Complete]
             ↓                      ↓                  ↓
         [Error: No Data]    [Error: Serialize]  [Error: Browser Block]
```

### Import Flow

```
[Idle] → [File Selected] → [Reading File] → [Validating JSON] → [Merging Data] → [Applying] → [Complete]
                              ↓                  ↓                  ↓               ↓
                        [Error: Read]    [Error: Parse]    [Error: Invalid]  [Error: Storage Full]
```

### Reset Flow

```
[Idle] → [Confirm Dialog] → [Clearing Storage] → [Reinitialize] → [Complete]
              ↓
         [User Cancel]
```

---

## Validation Rules

### JSON Schema (Conceptual)

```typescript
// SettingsExport must have these properties
interface SettingsExport {
  version: string;  // semver pattern
  exportedAt: string;  // ISO 8601 datetime
  reduxState?: Partial<RootState>;
  guitarSettings?: Partial<GuitarSettings>;
}

// GuitarSettings structure
interface GuitarSettings {
  customTunings?: TuningPresetWithMetadata[];
  currentTuning?: TuningPresetWithMetadata;
  fretCount?: number;  // min: 1, max: 36
  flipX?: boolean;
  flipY?: boolean;
  baseTuning?: number;  // min: -12, max: 12
}
```

### Type Validation Functions

```typescript
// Validation helpers
function isValidTuningPreset(obj: unknown): obj is TuningPresetWithMetadata;
function isValidScale(obj: unknown): obj is Scale;
function isValidInstrument(value: unknown): value is Instrument;
function isValidFretCount(value: unknown): value is number;
```
