# Phase 0 Research: Settings Export/Import/Reset

**Date**: 2026-03-19
**Feature**: Settings Export/Import/Reset
**Status**: Complete

## Research Tasks

### 1. Browser File API for Export/Import

**Decision**: Use native browser File API with anchor element download for export, FileReader API for import

**Rationale**:
- No external dependencies required
- Well-supported across modern browsers
- CSP-compliant (no inline scripts)
- Works offline (no server required)

**Implementation Pattern**:
```typescript
// Export - trigger file download
const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `scalesviewer-settings-${timestamp}.json`;
a.click();
URL.revokeObjectURL(url);

// Import - read file via FileReader
const reader = new FileReader();
reader.onload = (e) => {
  const data = JSON.parse(e.target?.result as string);
  // process data
};
reader.readAsText(file);
```

**Alternatives Considered**:
- **Clipboard API**: Less user-friendly for backup/transfer use case
- **Server-side storage**: Adds complexity, requires auth, not requested
- **Third-party libraries (file-saver, downloadjs)**: Unnecessary for simple JSON files

---

### 2. localStorage Keys and Structure

**Decision**: Export all localStorage keys with known prefix pattern

**Known Keys Identified**:

| Key | Purpose | Source |
|-----|---------|--------|
| `state` | Redux store state | `persistentStateMiddleware.ts` |
| `custom-tunings` | User-created guitar tunings | `tunings.ts` |
| `current-scaleRoot` | Selected tuning preset | `tunings.ts` |
| `fretCount` | Guitar fret count | `useLocalStorageNumber` hook |
| `flipX` / `flipY` | Guitar neck orientation | `useLocalStorageBoolean` hook |
| `baseTuning` | Guitar base tuning transposition | `useLocalStorage` hook |

**Export Structure**:
```typescript
interface SettingsExport {
  version: string;           // App version for migration handling
  exportedAt: string;        // ISO timestamp
  reduxState: {
    globalConfig: GlobalConfig;
    applicationState: ApplicationState;
    audio: AudioState;
    selectedNote: SelectedNoteState;
  };
  guitarSettings: {
    customTunings: TuningPresetWithMetadata[];
    currentTuning: TuningPresetWithMetadata;
    fretCount: number;
    flipX: boolean;
    flipY: boolean;
    baseTuning: number;
  };
}
```

**Import Strategy**:
- All properties optional
- Use deep merge for nested objects
- Skip unknown keys
- Validate types before applying

---

### 3. Default Values Strategy

**Decision**: Import initialState from slices and constants for reset functionality

**Default Values**:

```typescript
// From globalConfigSlice.ts
const globalConfigDefaults = {
  isDarkMode: true,
  instrument: "piano",
  scale: { root: "A", type: "major", mode: "ionian" },
  scaleRoot: TUNING_PRESETS[0], // Standard Tuning
  showFlats: false,
  highlightRoots: true,
  showDegrees: false,
};

// Guitar-specific defaults
const guitarDefaults = {
  fretCount: 24,
  flipX: false,
  flipY: false,
  baseTuning: 0,
  customTunings: [],
};
```

**Reset Implementation**:
1. Clear all known localStorage keys
2. Redux store will re-initialize with initialState on next load
3. Guitar hooks will use default values

---

### 4. Error Handling Strategy

**Decision**: Comprehensive error handling with user-friendly messages

**Error Scenarios**:

| Scenario | User Message | Recovery |
|----------|--------------|----------|
| Invalid JSON | "The selected file is not valid JSON. Please check the file and try again." | Allow retry |
| File too large | "The file is too large. Maximum size is 10MB." | Allow different file |
| localStorage full | "Storage is full. Try clearing some browser data first." | Manual intervention |
| Unknown file format | "Unrecognized settings format. Expected ScalesViewer settings file." | Allow retry |
| Import during write | "Please wait a moment and try again." | Auto-retry once |

---

### 5. UI/UX Patterns

**Decision**: Settings panel integrated into existing navigation

**Layout Options Considered**:
- **Modal dialog**: Good for focused task, blocks main UI
- **Slide-out panel**: Accessible without leaving current view
- **Dedicated page**: Clear separation, bookmarkable

**Selected Approach**: Modal dialog triggered from navigation menu
- Consistent with existing UI patterns
- Can be accessed from any page
- Doesn't require route changes

**Button Layout**:
```
┌─────────────────────────────┐
│      Settings               │
├─────────────────────────────┤
│  [Export Settings]          │
│  [Import Settings]          │
│                             │
│  ─────────────────────────  │
│  [Reset to Defaults] ⚠️     │
└─────────────────────────────┘
```

---

### 6. Testing Strategy

**Decision**: Unit tests for logic, E2E tests for user flows

**Unit Tests** (Jest):
- Export function generates valid JSON
- Import function merges partial data correctly
- Reset function clears all keys
- Validation rejects malformed input

**E2E Tests** (Playwright):
- Export downloads file with correct content
- Import applies settings and updates UI
- Reset shows confirmation, clears settings
- Error states display appropriate messages

---

## Research Summary

All technical questions resolved:

1. ✅ File API approach selected (native browser APIs)
2. ✅ localStorage structure documented (7 known keys)
3. ✅ Default values identified from source code
4. ✅ Error handling strategy defined
5. ✅ UI pattern selected (modal dialog)
6. ✅ Testing approach confirmed

**Ready for Phase 1: Design & Contracts**
