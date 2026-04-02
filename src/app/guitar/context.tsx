import { Note } from "@/lib/utils/note";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useLocalStorage, useLocalStorageBoolean, useLocalStorageNumber } from "./hooks/useLocalStorage";
import { getCustomTunings, getTuning } from "@/app/guitar/tunings";
import { TuningPreset } from "./types/tuningPreset";
import { TuningPresetWithMetadata } from "./tuningConstants";
import { MULTISCALE_PRESETS } from "./multiscaleConstants";

// Migration hook to convert old fretboard-color to fretboard-texture
function useMigratedTexture(): [string, (value: string) => void] {
  const [texture, setTexture] = useLocalStorage<string>("fretboard-texture", "rosewood");
  const [hasMigrated, setHasMigrated] = useLocalStorageBoolean("fretboard-migrated", false);

  useEffect(() => {
    if (hasMigrated || typeof window === 'undefined') return;

    try {
      // Check for old fretboard-color value
      const oldColor = localStorage.getItem("fretboard-color");
      if (oldColor) {
        // Map old hex colors to texture names
        const colorToTexture: Record<string, string> = {
          '"#8B4513"': "rosewood",
          '"#3E2723"': "ebony", 
          '"#D2691E"': "maple",
          '"#654321"': "pau-ferro",
          '"#2E2E2E"': "richlite"
        };

        const mappedTexture = colorToTexture[oldColor] || "rosewood";
        setTexture(mappedTexture);
        
        // Clean up old key
        localStorage.removeItem("fretboard-color");
        console.log(`Migrated fretboard color ${oldColor} to texture: ${mappedTexture}`);
      }
      
      setHasMigrated(true);
    } catch (error) {
      console.warn("Failed to migrate fretboard color to texture:", error);
      setHasMigrated(true); // Don't keep trying if it fails
    }
  }, [hasMigrated, setTexture, setHasMigrated]);

  return [texture, setTexture];
}

export interface DataContextType {
  // Display settings
  fretCount: number;
  flipX: boolean;
  flipY: boolean;
  setFretCount: (count: number) => void;
  setFlipX: (flipped: boolean) => void;
  setFlipY: (flipped: boolean) => void;
  setBaseTuning: (note: Note) => void;
  baseTuning: Note;
  isMultiscale: boolean;
  setIsMultiscale: (enabled: boolean) => void;
  scaleLength: { treble: number; bass: number };
  setScaleLength: (lengths: { treble: number; bass: number }) => void;
  perpendicular: number;
  setPerpendicular: (fret: number) => void;
  fretboardTexture: string;
  setFretboardTexture: (texture: string) => void;
  stringSpacing: 'normal' | 'enlarged';
  setStringSpacing: (spacing: 'normal' | 'enlarged') => void;
  stringEnabled: boolean[];
  setStringEnabled: (value: boolean[] | ((prev: boolean[]) => boolean[])) => void;
  fretPositionEnabled: boolean[];
  setFretPositionEnabled: (value: boolean[] | ((prev: boolean[]) => boolean[])) => void;

  // Tuning management
  scaleRoot: TuningPreset;
  setScaleRoot: (tuning: TuningPreset) => void;
  customTunings: TuningPresetWithMetadata[];
  setCustomTunings: (tunings: TuningPresetWithMetadata[] | ((prev: TuningPresetWithMetadata[]) => TuningPresetWithMetadata[])) => void;
  saveCustomTuningsImmediately: (tunings: TuningPresetWithMetadata[]) => void;
  saveScaleRootImmediately: (tuning: TuningPreset) => void;
  editingTuning: TuningPresetWithMetadata | null;
  setEditingTuning: (tuning: TuningPresetWithMetadata | null) => void;
  showCustomTuning: boolean;
  setShowCustomTuning: (show: boolean) => void;
  handleSaveCustomTuning: (tuning: TuningPreset) => void;
  openTuningEditor: (tuning?: TuningPresetWithMetadata | null) => void;
}

// Create context with proper default values to avoid runtime errors
const defaultContextValue: DataContextType = {
  // Display settings
  fretCount: 12,
  flipX: false,
  flipY: false,
  setFretCount: () => {},
  setFlipX: () => {},
  setFlipY: () => {},
  setBaseTuning: () => {},
  baseTuning: "E",
  isMultiscale: false,
  setIsMultiscale: () => {},
  scaleLength: { treble: 25.5, bass: 27 },
  setScaleLength: () => {},
  perpendicular: 9,
  setPerpendicular: () => {},
  fretboardTexture: "rosewood",
  setFretboardTexture: () => {},
  stringSpacing: "normal",
  setStringSpacing: () => {},
  stringEnabled: [],
  setStringEnabled: () => {},
  fretPositionEnabled: [],
  setFretPositionEnabled: () => {},

  // Tuning management
  scaleRoot: { name: "Standard E", strings: ["E", "B", "G", "D", "A", "E"] },
  setScaleRoot: () => {},
  customTunings: [],
  setCustomTunings: () => {},
  saveCustomTuningsImmediately: () => {},
  saveScaleRootImmediately: () => {},
  editingTuning: null,
  setEditingTuning: () => {},
  showCustomTuning: false,
  setShowCustomTuning: () => {},
  handleSaveCustomTuning: () => {},
  openTuningEditor: () => {},
};

export const DataContext = createContext<DataContextType>(defaultContextValue);

interface DataProviderProps {
  children: ReactNode;
  customTunings?: TuningPresetWithMetadata[];
  openTuningEditor?: (tuning?: TuningPresetWithMetadata | null) => void;
}

export const DataProvider = ({ children, customTunings: propCustomTunings, openTuningEditor: propOpenTuningEditor }: DataProviderProps) => {
  // Display settings with localStorage persistence
  const [flipX, setFlipX] = useLocalStorageBoolean("flip-x", false);
  const [flipY, setFlipY] = useLocalStorageBoolean("flip-y", false);
  const [baseTuning, setBaseTuning] = useLocalStorage<Note>("base-scaleRoot", "E");
  const [fretCount, setFretCount] = useLocalStorageNumber("fret-count", 12, 12, 24);
  const [isMultiscale, setIsMultiscale] = useLocalStorageBoolean("is-multiscale", false);
  const [scaleLength, setScaleLength] = useLocalStorage<{ treble: number; bass: number }>(
    "scale-length", 
    { treble: 25.5, bass: 27 }
  );
  const [perpendicular, setPerpendicular] = useLocalStorageNumber("perpendicular", 9, 0, 24);
  
  // Migration from old fretboard-color to fretboard-texture
  const [fretboardTexture, setFretboardTexture] = useMigratedTexture();

  // String spacing setting
  const [stringSpacing, setStringSpacing] = useLocalStorage<'normal' | 'enlarged'>("string-spacing", "normal");

  // Tuning management state (scaleRoot must be declared before per-string state that uses it)
  const [scaleRoot, setScaleRoot, saveScaleRootImmediately] = useLocalStorage<TuningPreset>("current-scaleRoot", getTuning());
  const [customTunings, setCustomTunings, saveCustomTuningsImmediately] = useLocalStorage<TuningPresetWithMetadata[]>("custom-tunings", getCustomTunings());

  // Use prop custom tunings if provided (for popup mode)
  const effectiveCustomTunings = propCustomTunings || customTunings;
  const setEffectiveCustomTunings = propCustomTunings ? () => {} : setCustomTunings;

  // Per-string enabled state (checkbox on the left of each string). Persisted.
  const [stringEnabledStored, setStringEnabledStored] = useLocalStorage<boolean[]>("guitar-string-enabled", []);
  const stringCount = scaleRoot.strings.length;
  const stringEnabled = useMemo(() => {
    const stored = stringEnabledStored ?? [];
    if (stored.length === stringCount) return stored;
    if (stored.length > stringCount) return stored.slice(0, stringCount);
    return [...stored, ...Array(stringCount - stored.length).fill(true)];
  }, [stringEnabledStored, stringCount]);
  const setStringEnabled = useCallback(
    (value: boolean[] | ((prev: boolean[]) => boolean[])) => {
      setStringEnabledStored((prev) => {
        const effective = prev.length === stringCount ? prev : prev.length > stringCount
          ? prev.slice(0, stringCount)
          : [...prev, ...Array(stringCount - prev.length).fill(true)];
        const next = typeof value === "function" ? value(effective) : value;
        return next.length === stringCount ? next : next.length > stringCount ? next.slice(0, stringCount) : [...next, ...Array(stringCount - next.length).fill(true)];
      });
    },
    [stringCount, setStringEnabledStored]
  );

  // Per-fret-position enabled state (checkboxes below fretboard). Index 0 = open string, 1..fretCount = frets 1..fretCount. Persisted.
  const fretPositionCount = fretCount + 1;
  const [fretPositionEnabledStored, setFretPositionEnabledStored] = useLocalStorage<boolean[]>("guitar-fret-enabled", []);
  const fretPositionEnabled = useMemo(() => {
    const stored = fretPositionEnabledStored ?? [];
    if (stored.length === fretPositionCount) return stored;
    if (stored.length > fretPositionCount) return stored.slice(0, fretPositionCount);
    // Migrate from old length (fretCount only): prepend true for open string, then existing values for frets 1..fretCount
    if (stored.length === fretCount) return [true, ...stored];
    return [...stored, ...Array(fretPositionCount - stored.length).fill(true)];
  }, [fretPositionEnabledStored, fretPositionCount, fretCount]);
  const setFretPositionEnabled = useCallback(
    (value: boolean[] | ((prev: boolean[]) => boolean[])) => {
      setFretPositionEnabledStored((prev) => {
        let effective: boolean[];
        if (prev.length === fretPositionCount) {
          effective = prev;
        } else if (prev.length === fretCount) {
          effective = [true, ...prev];
        } else if (prev.length > fretPositionCount) {
          effective = prev.slice(0, fretPositionCount);
        } else {
          effective = [...prev, ...Array(fretPositionCount - prev.length).fill(true)];
        }
        const next = typeof value === "function" ? value(effective) : value;
        return next.length === fretPositionCount ? next : next.length > fretPositionCount ? next.slice(0, fretPositionCount) : [...next, ...Array(fretPositionCount - next.length).fill(true)];
      });
    },
    [fretPositionCount, fretCount, setFretPositionEnabledStored]
  );

  // Rest of tuning management state
  const [editingTuning, setEditingTuning] = useState<TuningPresetWithMetadata | null>(null);
  const [showCustomTuning, setShowCustomTuning] = useState(false);

  // Use prop openTuningEditor if provided (for popup mode)
  const openTuningEditor = propOpenTuningEditor || ((tuning?: TuningPresetWithMetadata | null) => {
    // Default behavior when not in popup mode
    setEditingTuning(tuning || null);
    setShowCustomTuning(true);
  });
  
  // Update scale length when tuning changes if multiscale is enabled
  useEffect(() => {
    if (isMultiscale) {
      const matchingPreset = MULTISCALE_PRESETS.find(preset => preset.strings === scaleRoot.strings.length);
      if (matchingPreset) {
        setScaleLength({ treble: matchingPreset.treble, bass: matchingPreset.bass });
      }
    }
  }, [scaleRoot.strings.length, isMultiscale, setScaleLength]);
  
  // Handle saving custom tuning
  const handleSaveCustomTuning = (newTuning: TuningPreset) => {
    const customTuning: TuningPresetWithMetadata = {
      ...newTuning,
      description: `Custom ${newTuning.strings.length}-string tuning`,
      category: "Custom",
    };

    if (editingTuning) {
      setEffectiveCustomTunings((prevTunings) =>
        prevTunings.map((t) =>
          t.name === editingTuning.name ? customTuning : t
        )
      );
    } else {
      setEffectiveCustomTunings((prevTunings) => [...prevTunings, customTuning]);
    }

    setScaleRoot(customTuning);
    setShowCustomTuning(false);
    setEditingTuning(null);
  };

  return (
    <DataContext.Provider
      value={{
        // Display settings
        fretCount,
        flipX,
        flipY,
        setFretCount,
        setFlipX,
        setFlipY,
        setBaseTuning,
        baseTuning,
        isMultiscale,
        setIsMultiscale,
        scaleLength,
        setScaleLength,
        perpendicular,
        setPerpendicular,
        fretboardTexture,
        setFretboardTexture,
        stringSpacing,
        setStringSpacing,
        stringEnabled,
        setStringEnabled,
        fretPositionEnabled,
        setFretPositionEnabled,

        // Tuning management
        scaleRoot,
        setScaleRoot,
        customTunings: effectiveCustomTunings,
        setCustomTunings: setEffectiveCustomTunings,
        saveCustomTuningsImmediately,
        saveScaleRootImmediately,
        editingTuning,
        setEditingTuning,
        showCustomTuning,
        setShowCustomTuning,
        handleSaveCustomTuning,
        openTuningEditor,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context || context === defaultContextValue) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
