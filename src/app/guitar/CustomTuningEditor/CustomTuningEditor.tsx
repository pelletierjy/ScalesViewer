import React, { useState, useEffect } from "react";
import { Note } from "@/lib/utils/note";
import { ROOTS } from "@/lib/utils/scaleConstants";
import { TuningPreset } from "../types/tuningPreset";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "@/features/globalConfig/globalConfigSlice";
import { TuningPresetWithMetadata } from "../tuningConstants";
import { validateTuningName, sanitizeString } from "@/lib/utils/inputSanitization";

interface CustomTuningEditorProps {
  onSaveTuning: (scaleRoot: TuningPreset) => void;
  onCancel: () => void;
  initialTuning?: TuningPresetWithMetadata | null;
  customTunings: TuningPresetWithMetadata[];
}

const MIN_STRINGS = 4;
const MAX_STRINGS = 18;
const DEFAULT_NOTE: Note = "E";

export const CustomTuningEditor: React.FC<CustomTuningEditorProps> = ({
  onSaveTuning,
  onCancel,
  initialTuning,
  customTunings,
}) => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const [tuningName, setTuningName] = useState(
    initialTuning?.name || "Custom Tuning"
  );
  const [stringCount, setStringCount] = useState(
    initialTuning?.strings.length || 6
  );
  const [strings, setStrings] = useState<Note[]>(
    initialTuning?.strings || Array(6).fill(DEFAULT_NOTE)
  );
  const [nameError, setNameError] = useState("");

  // Update strings array when string count changes
  useEffect(() => {
    setStrings((currentStrings) => {
      if (currentStrings.length === stringCount) {
        return currentStrings;
      }
      if (stringCount > currentStrings.length) {
        // Add new strings with default note
        return [
          ...currentStrings,
          ...Array(stringCount - currentStrings.length).fill(DEFAULT_NOTE),
        ];
      }
      // Remove excess strings
      return currentStrings.slice(0, stringCount);
    });
  }, [stringCount]);

  const handleStringChange = (index: number, note: Note): void => {
    const newStrings = [...strings];
    newStrings[index] = note;
    setStrings(newStrings);
  };

  const handleStringCountChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newCount = parseInt(event.target.value, 10);
    setStringCount(newCount);
  };

  const validateAndSave = (): void => {
    const sanitizedName = sanitizeString(tuningName);
    const validation = validateTuningName(sanitizedName);
    
    if (!validation.isValid) {
      setNameError(validation.error);
      return;
    }

    const isDuplicate = customTunings.some(
      (tuning) => tuning.name === sanitizedName && tuning.name !== initialTuning?.name
    );

    if (isDuplicate) {
      setNameError("A tuning with this name already exists");
      return;
    }

    onSaveTuning({
      name: sanitizedName,
      strings: strings,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTuningName(e.target.value);
    setNameError("");
  };

  const inputClassName = `block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200 ${
    isDarkMode
      ? "bg-gray-700 border-gray-600 text-gray-200"
      : "bg-slate-300 border-slate-500 text-slate-800"
  }`;

  const selectClassName = `block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200 ${
    isDarkMode
      ? "bg-gray-700 border-gray-600 text-gray-200"
      : "bg-slate-300 border-slate-500 text-slate-800"
  }`;

  const labelClassName = `block text-sm font-semibold ${
    isDarkMode ? "text-gray-200" : "text-gray-900"
  }`;

  return (
    <div
      className={`space-y-6 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
    >
      <h3 className="text-lg font-semibold">
        {initialTuning ? "Edit Tuning" : "Create Custom Tuning"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="scaleRoot-name" className={labelClassName}>
            Tuning Name
          </label>
          <input
            type="text"
            id="scaleRoot-name"
            value={tuningName}
            onChange={handleNameChange}
            className={`mt-1 ${inputClassName} ${
              nameError ? "border-red-500" : ""
            }`}
          />
          {nameError && (
            <p className="mt-1 text-sm text-red-600 font-medium">{nameError}</p>
          )}
        </div>
        <div>
          <label htmlFor="string-count" className={labelClassName}>
            Number of Strings
          </label>
          <select
            id="string-count"
            value={stringCount}
            onChange={handleStringCountChange}
            className={`mt-1 ${selectClassName}`}
          >
            {Array.from(
              { length: MAX_STRINGS - MIN_STRINGS + 1 },
              (_, i) => i + MIN_STRINGS
            ).map((num) => (
              <option
                key={num}
                value={num}
                className={
                  isDarkMode ? "text-gray-200 bg-gray-700" : "text-gray-900"
                }
              >
                {num} strings
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className={`${labelClassName} mb-2`}>String Notes (High to Low)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {strings.map((note, index) => (
            <div key={index} className="space-y-1">
              <label
                className={`block text-xs font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                String {strings.length - index}
              </label>
              <select
                value={note}
                onChange={(e) =>
                  handleStringChange(index, e.target.value as Note)
                }
                className={`${selectClassName} text-sm`}
              >
                {ROOTS.map((n) => (
                  <option
                    key={n}
                    value={n}
                    className={
                      isDarkMode ? "text-gray-200 bg-gray-700" : "text-gray-900"
                    }
                  >
                    {n}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          onClick={onCancel}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            isDarkMode
              ? "bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600"
              : "bg-slate-400 text-slate-900 hover:bg-slate-500 border border-slate-600"
          }`}
        >
          Cancel
        </button>
        <button
          onClick={validateAndSave}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {initialTuning ? "Update Tuning" : "Save Tuning"}
        </button>
      </div>
    </div>
  );
};