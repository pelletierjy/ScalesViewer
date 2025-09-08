import { Note } from "@/lib/utils/note";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useLocalStorage, useLocalStorageBoolean, useLocalStorageNumber } from "./hooks/useLocalStorage";
import { getCustomTunings, getTuning } from "@/app/guitar/tunings";
import { TuningPreset } from "./types/tuningPreset";
import { TuningPresetWithMetadata } from "./tuningConstants";
import { MULTISCALE_PRESETS } from "./multiscaleConstants";
import { preloadWoodTextures } from "./utils/textureManager";

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
  setFretboardTexture: (textureId: string) => void;
  
  // Tuning management
  scaleRoot: TuningPreset;
  setScaleRoot: (tuning: TuningPreset) => void;
  customTunings: TuningPresetWithMetadata[];
  setCustomTunings: (tunings: TuningPresetWithMetadata[] | ((prev: TuningPresetWithMetadata[]) => TuningPresetWithMetadata[])) => void;
  editingTuning: TuningPresetWithMetadata | null;
  setEditingTuning: (tuning: TuningPresetWithMetadata | null) => void;
  showCustomTuning: boolean;
  setShowCustomTuning: (show: boolean) => void;
  handleSaveCustomTuning: (tuning: TuningPreset) => void;
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
  fretboardTexture: 'pale-ebony',
  setFretboardTexture: () => {},
  
  // Tuning management
  scaleRoot: { name: "Standard E", strings: ["E", "B", "G", "D", "A", "E"] },
  setScaleRoot: () => {},
  customTunings: [],
  setCustomTunings: () => {},
  editingTuning: null,
  setEditingTuning: () => {},
  showCustomTuning: false,
  setShowCustomTuning: () => {},
  handleSaveCustomTuning: () => {},
};

export const DataContext = createContext<DataContextType>(defaultContextValue);

export const DataProvider = ({ children }: { children: ReactNode }) => {
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
  
  // Migrate from old color system to new texture system
  useEffect(() => {
    const migrateFromColorToTexture = () => {
      const oldColor = localStorage.getItem('fretboard-color');
      if (oldColor) {
        // Map old colors to closest wood texture
        const colorToTextureMap: Record<string, string> = {
          '#8B4513': 'rosewood',
          '#3E2723': 'black-ebony',
          '#D2691E': 'maple',
          '#654321': 'pau-ferro',
          '#2E2E2E': 'black-ebony'
        };
        
        const newTexture = colorToTextureMap[oldColor] || 'rosewood';
        localStorage.setItem('fretboard-texture', newTexture);
        localStorage.removeItem('fretboard-color');
      }
    };
    
    migrateFromColorToTexture();
  }, []);
  
  const [fretboardTexture, setFretboardTexture] = useLocalStorage<string>("fretboard-texture", "pale-ebony");
  
  // Preload wood textures on mount
  useEffect(() => {
    preloadWoodTextures();
  }, []);
  
  // Tuning management state
  const [scaleRoot, setScaleRoot] = useLocalStorage<TuningPreset>("current-scaleRoot", getTuning());
  const [customTunings, setCustomTunings] = useLocalStorage<TuningPresetWithMetadata[]>("custom-tunings", getCustomTunings());
  const [editingTuning, setEditingTuning] = useState<TuningPresetWithMetadata | null>(null);
  const [showCustomTuning, setShowCustomTuning] = useState(false);
  
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
      stringCount: newTuning.strings.length,
      category: "Special",
    };

    if (editingTuning) {
      setCustomTunings((prevTunings) =>
        prevTunings.map((t) =>
          t.name === editingTuning.name ? customTuning : t
        )
      );
    } else {
      setCustomTunings((prevTunings) => [...prevTunings, customTuning]);
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
        
        // Tuning management
        scaleRoot,
        setScaleRoot,
        customTunings,
        setCustomTunings,
        editingTuning,
        setEditingTuning,
        showCustomTuning,
        setShowCustomTuning,
        handleSaveCustomTuning,
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
