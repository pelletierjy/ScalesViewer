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
