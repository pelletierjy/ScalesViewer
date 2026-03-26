import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "@/features/globalConfig/globalConfigSlice";
import { CustomScaleDefinition } from "@/lib/utils/customScaleTypes";
import { validateTuningName, sanitizeString } from "@/lib/utils/inputSanitization";

interface CustomScaleEditorProps {
  onSaveScale: (scale: CustomScaleDefinition) => void;
  onCancel: () => void;
  initialScale?: CustomScaleDefinition | null;
  customScales: CustomScaleDefinition[];
}

const INTERVAL_OPTIONS = [
  { value: 0, label: "0 – Root" },
  { value: 1, label: "1 – m2" },
  { value: 2, label: "2 – M2" },
  { value: 3, label: "3 – m3" },
  { value: 4, label: "4 – M3" },
  { value: 5, label: "5 – P4" },
  { value: 6, label: "6 – TT" },
  { value: 7, label: "7 – P5" },
  { value: 8, label: "8 – m6" },
  { value: 9, label: "9 – M6" },
  { value: 10, label: "10 – m7" },
  { value: 11, label: "11 – M7" },
];

// Preview note names starting from C
const C_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const MIN_NOTES = 2;
const MAX_NOTES = 12;

export const CustomScaleEditor: React.FC<CustomScaleEditorProps> = ({
  onSaveScale,
  onCancel,
  initialScale,
  customScales,
}) => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const [label, setLabel] = useState(initialScale?.label ?? "Custom Scale");
  const [group, setGroup] = useState(initialScale?.group ?? "Custom");
  // Keep intervals in editing order (unsorted) so user controls the arrangement
  const [intervals, setIntervals] = useState<number[]>(
    initialScale?.intervals ?? [0, 2, 4, 5, 7, 9, 11]
  );
  const [nameError, setNameError] = useState("");
  const [intervalError, setIntervalError] = useState("");

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLabel(e.target.value);
    setNameError("");
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setGroup(e.target.value);
  };

  const handleIntervalChange = (index: number, value: string): void => {
    const num = parseInt(value, 10);
    const newIntervals = [...intervals];
    newIntervals[index] = num;
    setIntervals(newIntervals);
    setIntervalError("");
  };

  const handleAddInterval = (): void => {
    if (intervals.length >= MAX_NOTES) return;
    // Pick the first semitone not already used, or 0 if all taken
    const used = new Set(intervals);
    const next = INTERVAL_OPTIONS.find((o) => !used.has(o.value))?.value ?? 0;
    setIntervals([...intervals, next]);
    setIntervalError("");
  };

  const handleRemoveInterval = (index: number): void => {
    if (intervals.length <= MIN_NOTES) return;
    setIntervals(intervals.filter((_, i) => i !== index));
    setIntervalError("");
  };

  const validateAndSave = (): void => {
    const sanitizedLabel = sanitizeString(label);
    const validation = validateTuningName(sanitizedLabel);

    if (!validation.isValid) {
      setNameError(validation.error);
      return;
    }

    const isDuplicate = customScales.some(
      (s) => s.label === sanitizedLabel && s.id !== initialScale?.id
    );
    if (isDuplicate) {
      setNameError("A scale with this name already exists");
      return;
    }

    if (!intervals.includes(0)) {
      setIntervalError("Scale must include the root note (0 – Root)");
      return;
    }

    if (new Set(intervals).size !== intervals.length) {
      setIntervalError("Each interval can only appear once");
      return;
    }

    const id = initialScale?.id ?? `custom-${Date.now()}`;

    onSaveScale({
      id,
      label: sanitizedLabel,
      group: sanitizeString(group) || "Custom",
      intervals: [...intervals].sort((a, b) => a - b),
    });
  };

  const selectClassName = `block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200 ${
    isDarkMode
      ? "bg-gray-700 border-gray-600 text-gray-200"
      : "bg-slate-300 border-slate-500 text-slate-800"
  }`;

  const inputClassName = `block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200 ${
    isDarkMode
      ? "bg-gray-700 border-gray-600 text-gray-200"
      : "bg-slate-300 border-slate-500 text-slate-800"
  }`;

  const labelClassName = `block text-sm font-semibold ${
    isDarkMode ? "text-gray-200" : "text-gray-900"
  }`;

  // Build sorted preview of note names in C
  const sortedForPreview = [...new Set(intervals)].sort((a, b) => a - b);
  const previewNotes = sortedForPreview.map((i) => C_NOTES[i]).join("  –  ");

  // Detect which intervals are duplicated (for inline warning)
  const duplicatedValues = intervals.filter(
    (v, i) => intervals.indexOf(v) !== i
  );

  return (
    <div className={`space-y-6 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
      <h3 className="text-lg font-semibold">
        {initialScale ? "Edit Scale" : "Create Custom Scale"}
      </h3>

      {/* Name & Group */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="scale-label" className={labelClassName}>
            Scale Name
          </label>
          <input
            type="text"
            id="scale-label"
            value={label}
            onChange={handleLabelChange}
            className={`mt-1 ${inputClassName} ${nameError ? "border-red-500" : ""}`}
          />
          {nameError && (
            <p className="mt-1 text-sm text-red-600 font-medium">{nameError}</p>
          )}
        </div>
        <div>
          <label htmlFor="scale-group" className={labelClassName}>
            Group (Category)
          </label>
          <input
            type="text"
            id="scale-group"
            value={group}
            onChange={handleGroupChange}
            placeholder="e.g. Custom, Jazz, Exotic…"
            className={`mt-1 ${inputClassName}`}
          />
        </div>
      </div>

      {/* Interval pickers */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className={labelClassName}>Notes</span>
          <button
            onClick={handleAddInterval}
            disabled={intervals.length >= MAX_NOTES}
            className={`px-3 py-1 text-xs rounded-md transition-colors duration-200 ${
              intervals.length >= MAX_NOTES
                ? "opacity-50 cursor-not-allowed"
                : ""
            } ${
              isDarkMode
                ? "bg-blue-700 text-blue-100 hover:bg-blue-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            + Add Note
          </button>
        </div>

        {intervalError && (
          <p className="mb-2 text-sm text-red-600 font-medium">{intervalError}</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {intervals.map((interval, index) => {
            const isDuplicate = duplicatedValues.includes(interval);
            return (
              <div key={index} className="space-y-1">
                <label
                  className={`block text-xs font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Note {index + 1}
                </label>
                <select
                  value={interval}
                  onChange={(e) => handleIntervalChange(index, e.target.value)}
                  className={`${selectClassName} text-sm ${
                    isDuplicate ? "border-red-500" : ""
                  }`}
                >
                  {INTERVAL_OPTIONS.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className={isDarkMode ? "text-gray-200 bg-gray-700" : "text-gray-900"}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleRemoveInterval(index)}
                  disabled={intervals.length <= MIN_NOTES}
                  className={`w-full px-2 py-0.5 text-xs rounded transition-colors duration-200 ${
                    intervals.length <= MIN_NOTES
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  } text-red-600 hover:text-red-700 ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-slate-300 hover:bg-slate-400"
                  } border border-gray-300 dark:border-gray-600`}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live preview */}
      <div
        className={`p-3 rounded-md text-sm ${
          isDarkMode
            ? "bg-blue-900/30 border border-blue-700 text-blue-200"
            : "bg-blue-50 border border-blue-200 text-blue-800"
        }`}
      >
        <p className="font-medium mb-1">
          Preview in C — {label || "Unnamed"} ({sortedForPreview.length} notes)
        </p>
        <p className="text-xs font-mono">{previewNotes || "—"}</p>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
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
          {initialScale ? "Update Scale" : "Save Scale"}
        </button>
      </div>
    </div>
  );
};
