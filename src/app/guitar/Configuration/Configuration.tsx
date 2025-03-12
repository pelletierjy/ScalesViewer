import { TuningPreset } from "../types/tuningPreset";
import { ROOTS } from "@/lib/utils/scaleConstants";
import {
  TUNING_PRESETS,
  TuningPresetWithMetadata,
} from "@/lib/utils/tuningConstants";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "@/features/globalConfig/globalConfigSlice";
import { useContext } from "react";
import { Note } from "@/lib/utils/note";
import { DataContext } from "@/app/guitar/context";
import { tuningGroups } from "@/lib/utils/tunings";

// Define the DataContextType interface here to avoid import issues
interface DataContextType {
  flipX: boolean;
  flipY: boolean;
  fretCount: number;
  baseTuning: Note;
  setFretCount: (count: number) => void;
  setFlipY: (flip: boolean) => void;
  setBaseTuning: (note: Note) => void;
  setFlipX: (flip: boolean) => void;
}

interface ConfigurationProps {
  scaleRoot: TuningPreset;
  customTunings: TuningPresetWithMetadata[];
  setShowCustomTuning: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomTunings: React.Dispatch<
    React.SetStateAction<TuningPresetWithMetadata[]>
  >;
  setScaleRoot: React.Dispatch<React.SetStateAction<TuningPreset>>;
  setEditingTuning: React.Dispatch<
    React.SetStateAction<TuningPresetWithMetadata | null>
  >;
}

export const Configuration: React.FC<ConfigurationProps> = ({
  scaleRoot,
  customTunings,
  setEditingTuning,
  setCustomTunings,
  setScaleRoot,
  setShowCustomTuning,
}) => {
  const {
    flipX,
    flipY,
    fretCount,
    setFretCount,
    baseTuning,
    setFlipY,
    setBaseTuning,
    setFlipX,
  } = useContext(DataContext) as DataContextType;

  const isDarkMode = useSelector(selectIsDarkMode);

  const handleEditTuning = (scaleRoot: TuningPresetWithMetadata) => {
    setEditingTuning(scaleRoot);
    setShowCustomTuning(true);
  };
  const handleDuplicateTuning = (scaleRoot: TuningPresetWithMetadata) => {
    const newTuning: TuningPresetWithMetadata = {
      ...scaleRoot,
      name: `${scaleRoot.name} (Copy)`,
    };
    setCustomTunings((prevTunings) => [...prevTunings, newTuning]);
  };
  const handleDeleteTuning = (tuningName: string) => {
    if (confirm("Are you sure you want to delete this custom scaleRoot?")) {
      setCustomTunings((prevTunings) =>
        prevTunings.filter((t) => t.name !== tuningName)
      );

      // If the deleted scaleRoot was selected, switch to standard scaleRoot
      if (scaleRoot.name === tuningName) {
        setScaleRoot(TUNING_PRESETS[0]);
      }
    }
  };

  return (
    <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap justify-between items-start">
          {/* Left side inputs */}
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-start">
            <div className="flex flex-col gap-2 min-w-[200px]">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="scaleRoot"
                  className={`text-sm font-semibold whitespace-nowrap ${
                    isDarkMode ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Tuning
                </label>
                <select
                  id="scaleRoot"
                  value={scaleRoot.name}
                  onChange={(e) => {
                    if (e.target.value === "custom") {
                      setShowCustomTuning(true);
                      setEditingTuning(null);
                    } else {
                      const selectedTuning = [
                        ...TUNING_PRESETS,
                        ...customTunings,
                      ].find((t) => t.name === e.target.value);
                      if (selectedTuning) {
                        setScaleRoot(selectedTuning);
                      }
                    }
                  }}
                  className={`rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full min-w-[120px] ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  {Object.entries(tuningGroups(customTunings)).map(
                    ([category, tunings]) => (
                      <optgroup key={category} label={category}>
                        {tunings.map((t: TuningPresetWithMetadata) => (
                          <option
                            key={t.name}
                            value={t.name}
                            className={
                              isDarkMode
                                ? "text-gray-200 bg-gray-700"
                                : "text-gray-900"
                            }
                          >
                            {t.name}
                            {customTunings.some((ct) => ct.name === t.name) &&
                              " (Custom)"}
                          </option>
                        ))}
                      </optgroup>
                    )
                  )}
                  <option value="custom">+ Custom Tuning</option>
                </select>
              </div>
              {customTunings.some((ct) => ct.name === scaleRoot.name) && (
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleEditTuning(scaleRoot as TuningPresetWithMetadata)
                    }
                    className={`px-2 py-1 text-xs rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    } border border-gray-300 dark:border-gray-600`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDuplicateTuning(
                        scaleRoot as TuningPresetWithMetadata
                      )
                    }
                    className={`px-2 py-1 text-xs rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    } border border-gray-300 dark:border-gray-600`}
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => handleDeleteTuning(scaleRoot.name)}
                    className={`px-2 py-1 text-xs rounded-md text-red-600 hover:text-red-700 ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-white hover:bg-gray-50"
                    } border border-gray-300 dark:border-gray-600`}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-[180px]">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="base-scaleRoot"
                  className={`text-sm font-semibold whitespace-nowrap ${
                    isDarkMode ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Base Tuning
                </label>
                <select
                  id="base-scaleRoot"
                  value={baseTuning}
                  onChange={(e) => setBaseTuning(e.target.value as Note)}
                  className={`rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full min-w-[80px] ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  {ROOTS.map((note) => (
                    <option key={note} value={note}>
                      {note}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col min-w-[200px]">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="fret-count"
                  className={`text-sm font-semibold whitespace-nowrap ${
                    isDarkMode ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Number of frets
                </label>
                <select
                  id="fret-count"
                  value={fretCount}
                  onChange={(e) => setFretCount(Number(e.target.value))}
                  className={`rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full min-w-[100px] ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  {[12, 20, 21, 22, 23, 24].map((num) => (
                    <option key={num} value={num}>
                      {num} frets
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right side orientation controls */}
          <div className="flex flex-col mt-4 md:mt-0">
            <div className="flex items-center gap-2">
              <label
                className={`text-sm font-semibold whitespace-nowrap ${
                  isDarkMode ? "text-gray-200" : "text-gray-900"
                }`}
              >
                Orientation
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFlipX(!flipX)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  } ${flipX ? "bg-blue-100 dark:bg-blue-900" : ""}`}
                  title="Flip horizontally"
                >
                  ↔️
                </button>
                <button
                  onClick={() => setFlipY(!flipY)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  } ${flipY ? "bg-blue-100 dark:bg-blue-900" : ""}`}
                  title="Flip vertically"
                >
                  ↕️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
