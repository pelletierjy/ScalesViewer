import { Note } from "@/lib/utils/note";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

export interface DataContextType {
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
}

export const DataContext = createContext<DataContextType>(
  {} as DataContextType
);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [flipX, setFlipX] = useState(localStorage.getItem("flip-x") === "true");
  const [flipY, setFlipY] = useState(localStorage.getItem("flip-y") === "true");
  const [baseTuning, setBaseTuning] = useState<Note>(
    (localStorage.getItem("base-scaleRoot") as Note) ?? "E"
  );
  const getFretsCount = () => {
    let _fretCount = 12;
    const savedFretCount = localStorage.getItem("fret-count");
    if (savedFretCount) {
      const count = parseInt(savedFretCount, 10);
      if (!isNaN(count) && count >= 12 && count <= 24) {
        _fretCount = count;
      }
    }
    return _fretCount;
  };
  const [fretCount, setFretCount] = useState(getFretsCount());
  
  // Multiscale settings
  const [isMultiscale, setIsMultiscale] = useState(
    localStorage.getItem("is-multiscale") === "true"
  );
  
  const getScaleLength = () => {
    const saved = localStorage.getItem("scale-length");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback to default
      }
    }
    return { treble: 25.5, bass: 27 };
  };
  const [scaleLength, setScaleLength] = useState<{ treble: number; bass: number }>(
    getScaleLength()
  );
  
  const getPerpendicular = () => {
    const saved = localStorage.getItem("perpendicular");
    if (saved) {
      const fret = parseInt(saved, 10);
      if (!isNaN(fret) && fret >= 0 && fret <= 24) {
        return fret;
      }
    }
    return 9; // Default to 9th fret
  };
  const [perpendicular, setPerpendicular] = useState(getPerpendicular());

  useEffect(() => {
    localStorage.setItem("flip-x", flipX.toString());
  }, [flipX]);

  useEffect(() => {
    localStorage.setItem("flip-y", flipY.toString());
  }, [flipY]);

  useEffect(() => {
    localStorage.setItem("fret-count", fretCount.toString());
  }, [fretCount]);

  useEffect(() => {
    localStorage.setItem("base-scaleRoot", baseTuning);
  }, [baseTuning]);

  useEffect(() => {
    localStorage.setItem("is-multiscale", isMultiscale.toString());
  }, [isMultiscale]);

  useEffect(() => {
    localStorage.setItem("scale-length", JSON.stringify(scaleLength));
  }, [scaleLength]);

  useEffect(() => {
    localStorage.setItem("perpendicular", perpendicular.toString());
  }, [perpendicular]);

  return (
    <DataContext.Provider
      value={{
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
