# Quickstart: Settings Export/Import/Reset

**Feature**: Settings Export/Import/Reset
**Setup Time**: ~2 minutes
**Prerequisites**: Node.js 20+, npm/pnpm

## Overview

This feature provides three main capabilities:
1. **Export** - Download all settings to a JSON backup file
2. **Import** - Restore settings from a previously exported JSON file
3. **Reset** - Clear all settings and return to defaults

## Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Access Settings Panel

1. Open http://localhost:3000
2. Click the settings icon in the navigation
3. The Settings panel will open with Export/Import/Reset options

## Feature Components

### Core Files

| File | Purpose |
|------|---------|
| `src/features/settings/hooks/useSettingsManager.ts` | Main hook with export/import/reset logic |
| `src/features/settings/utils/settingsExport.ts` | Export functionality |
| `src/features/settings/utils/settingsImport.ts` | Import functionality |
| `src/features/settings/utils/settingsReset.ts` | Reset functionality |
| `src/features/settings/components/SettingsPanel.tsx` | Main settings UI |

### Usage Examples

#### Export Settings

```tsx
import { useSettingsManager } from '@/features/settings/hooks/useSettingsManager';

function ExportButton() {
  const { exportSettings, isExporting } = useSettingsManager();

  const handleExport = async () => {
    const result = await exportSettings({
      filename: 'my-settings.json'
    });

    if (result.success) {
      showToast(`Settings exported to ${result.filename}`);
    } else {
      showError(result.error);
    }
  };

  return (
    <button onClick={handleExport} disabled={isExporting}>
      Export Settings
    </button>
  );
}
```

#### Import Settings

```tsx
import { useSettingsManager } from '@/features/settings/hooks/useSettingsManager';

function ImportButton() {
  const { importSettings, isImporting } = useSettingsManager();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await importSettings(file, {
      mergeStrategy: 'merge',
      validateVersion: true
    });

    if (result.success) {
      showToast(`Imported ${result.applied.length} settings`);
      window.location.reload(); // Reload to apply changes
    } else {
      showError(result.error);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
      >
        Import Settings
      </button>
    </>
  );
}
```

#### Reset Settings

```tsx
import { useSettingsManager } from '@/features/settings/hooks/useSettingsManager';

function ResetButton() {
  const { resetSettings, isResetting } = useSettingsManager();

  const handleReset = async () => {
    const confirmed = window.confirm(
      'This will reset all settings to defaults. This cannot be undone. Continue?'
    );

    if (!confirmed) return;

    const result = await resetSettings(false); // Already confirmed

    if (result.success) {
      showToast('Settings reset to defaults');
      window.location.reload();
    } else {
      showError(result.error);
    }
  };

  return (
    <button onClick={handleReset} disabled={isResetting}>
      Reset to Defaults
    </button>
  );
}
```

## Testing

### Unit Tests

```bash
npm test -- src/features/settings
```

### E2E Tests

```bash
npm run test:e2e -- settings
```

### Manual Testing Checklist

- [ ] Export generates valid JSON file
- [ ] Import applies settings correctly
- [ ] Import with partial JSON merges correctly
- [ ] Import with invalid JSON shows error
- [ ] Reset clears all settings
- [ ] Reset confirmation dialog works

## Troubleshooting

### Export fails silently
- Check browser console for errors
- Verify localStorage is accessible
- Check if popups are blocked

### Import doesn't apply settings
- Verify file is valid JSON
- Check browser console for validation errors
- Reload page after import to see changes

### Reset doesn't clear settings
- Check localStorage in DevTools
- Verify all known keys are cleared
- Hard reload page after reset

## File Format

### Export JSON Structure

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
    }
  },
  "guitarSettings": {
    "customTunings": [],
    "currentTuning": { "name": "Standard Tuning", "notes": ["E", "A", "D", "G", "B", "E"] },
    "fretCount": 24,
    "flipX": false,
    "flipY": false,
    "baseTuning": 0
  }
}
```

### Partial Import (valid)

All fields are optional. Missing fields are ignored.

```json
{
  "reduxState": {
    "globalConfig": {
      "isDarkMode": false
    }
  }
}
```

This would only change the dark mode setting, leaving all other settings unchanged.
