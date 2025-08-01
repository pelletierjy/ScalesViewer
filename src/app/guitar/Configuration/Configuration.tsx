import { ROOTS } from "@/lib/utils/scaleConstants";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "@/features/globalConfig/globalConfigSlice";
import { useContext } from "react";
import { Note } from "@/lib/utils/note";
import { DataContext } from "@/app/guitar/context";
import { tuningGroups } from "@/app/guitar/tunings";
import { TuningPresetWithMetadata, TUNING_PRESETS } from "../tuningConstants";
import { MULTISCALE_PRESETS, PERPENDICULAR_FRET_OPTIONS } from "../multiscaleConstants";

import { DataContextType } from "../context";
import { CustomTuningEditor } from "../CustomTuningEditor/CustomTuningEditor";

export const Configuration: React.FC = () => {
  const {
    // Display settings
    flipX,
    flipY,
    fretCount,
    baseTuning,
    setFretCount,
    setFlipY,
    setBaseTuning,
    setFlipX,
    isMultiscale,
    setIsMultiscale,
    scaleLength,
    setScaleLength,
    perpendicular,
    setPerpendicular,
    fretboardColor,
    setFretboardColor,
    
    // Tuning management
    scaleRoot,
    customTunings,
    setEditingTuning,
    setCustomTunings,
    setScaleRoot,
    editingTuning,
    showCustomTuning,
    setShowCustomTuning,
    handleSaveCustomTuning,
  } = useContext(DataContext) as DataContextType;

  const isDarkMode = useSelector(selectIsDarkMode);

  const handleEditTuning = (tuning: TuningPresetWithMetadata) => {
    setEditingTuning(tuning);
    setShowCustomTuning(true);
  };
  
  const handleDuplicateTuning = (tuning: TuningPresetWithMetadata) => {
    const newTuning: TuningPresetWithMetadata = {
      ...tuning,
      name: `${tuning.name} (Copy)`,
    };
    setCustomTunings((prevTunings) => [...prevTunings, newTuning]);
  };
  
  const handleDeleteTuning = (tuningName: string) => {
    if (confirm("Are you sure you want to delete this custom tuning?")) {
      setCustomTunings((prevTunings) =>
        prevTunings.filter((t) => t.name !== tuningName)
      );

      // If the deleted tuning was selected, switch to standard tuning
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

            <div className="flex flex-col min-w-[150px]">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="fretboard-color"
                  className={`text-sm font-semibold whitespace-nowrap ${
                    isDarkMode ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Fretboard Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="fretboard-color"
                    value={fretboardColor}
                    onChange={(e) => setFretboardColor(e.target.value)}
                    className={`w-10 h-10 rounded cursor-pointer ${
                      isDarkMode
                        ? "border-gray-600"
                        : "border-gray-300"
                    }`}
                  />
                  <select
                    value={fretboardColor}
                    onChange={(e) => setFretboardColor(e.target.value)}
                    className={`rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="#8B4513">Rosewood</option>
                    <option value="#3E2723">Ebony</option>
                    <option value="#D2691E">Maple</option>
                    <option value="#654321">Pau Ferro</option>
                    <option value="#2E2E2E">Richlite</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right side orientation controls */}
          <div className="flex items-center self-start pt-0">
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
        
        {/* Multiscale Settings Row */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="multiscale"
              checked={isMultiscale}
              onChange={(e) => setIsMultiscale(e.target.checked)}
              className="rounded focus:ring-blue-500"
            />
            <label
              htmlFor="multiscale"
              className={`text-sm font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              Multiscale/Fanned Frets
            </label>
          </div>
          
          {isMultiscale && (
            <>
              
              {/* Custom scale length inputs when no preset matches */}
              {MULTISCALE_PRESETS.filter(preset => preset.strings === scaleRoot.strings.length).length === 0 && (
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="treble-length"
                      className={`text-sm font-semibold ${
                        isDarkMode ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      Treble Scale Length
                    </label>
                    <input
                      type="number"
                      id="treble-length"
                      value={scaleLength.treble}
                      onChange={(e) => setScaleLength({
                        ...scaleLength,
                        treble: parseFloat(e.target.value) || scaleLength.treble
                      })}
                      step="0.25"
                      min="20"
                      max="35"
                      className={`rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 w-20 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-200"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="bass-length"
                      className={`text-sm font-semibold ${
                        isDarkMode ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      Bass Scale Length
                    </label>
                    <input
                      type="number"
                      id="bass-length"
                      value={scaleLength.bass}
                      onChange={(e) => setScaleLength({
                        ...scaleLength,
                        bass: parseFloat(e.target.value) || scaleLength.bass
                      })}
                      step="0.25"
                      min="20"
                      max="35"
                      className={`rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 w-20 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-200"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="perpendicular"
                  className={`text-sm font-semibold ${
                    isDarkMode ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Perpendicular Fret
                </label>
                <select
                  id="perpendicular"
                  value={perpendicular}
                  onChange={(e) => setPerpendicular(Number(e.target.value))}
                  className={`rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  {PERPENDICULAR_FRET_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
        
        {/* Custom Tuning Editor */}
        {showCustomTuning && (
          <div className="mt-4">
            <CustomTuningEditor
              initialTuning={editingTuning}
              onSaveTuning={handleSaveCustomTuning}
              onCancel={() => {
                setShowCustomTuning(false);
                setEditingTuning(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
