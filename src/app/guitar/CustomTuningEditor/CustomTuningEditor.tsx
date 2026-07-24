import React, { useState, useEffect } from "react";
import { Note } from "@/lib/utils/note";
import { ROOTS } from "@/lib/utils/scaleConstants";
import { TuningPreset } from "../types/tuningPreset";
import { TuningPresetWithMetadata } from "../tuningConstants";
import { validateTuningName, sanitizeString } from "@/lib/utils/inputSanitization";
import { Field, Select, TextInput, Button } from "@/components/ui";

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

  return (
    <div className="space-y-6">
      <h3 className="rack-label text-sm">
        {initialTuning ? "Edit Tuning" : "Create Custom Tuning"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Field label="Tuning Name" htmlFor="scaleRoot-name">
            <TextInput
              type="text"
              id="scaleRoot-name"
              value={tuningName}
              onChange={handleNameChange}
              className={`mt-1 w-full ${nameError ? "!border-[var(--console-danger)]" : ""}`}
            />
          </Field>
          {nameError && (
            <p className="mt-1 text-sm text-[var(--console-danger)] font-medium">{nameError}</p>
          )}
        </div>
        <Field label="Number of Strings" htmlFor="string-count">
          <Select
            id="string-count"
            value={stringCount}
            onChange={handleStringCountChange}
            className="mt-1 w-full"
          >
            {Array.from(
              { length: MAX_STRINGS - MIN_STRINGS + 1 },
              (_, i) => i + MIN_STRINGS
            ).map((num) => (
              <option key={num} value={num}>
                {num} strings
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="space-y-3">
        <h3 className="rack-label">String Notes (High to Low)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {strings.map((note, index) => (
            <Field key={index} label={`String ${strings.length - index}`}>
              <Select
                value={note}
                onChange={(e) => handleStringChange(index, e.target.value as Note)}
                className="text-sm"
              >
                {ROOTS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </Select>
            </Field>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-[var(--console-border)]">
        <Button onClick={onCancel}>Cancel</Button>
        <Button tone="accent" onClick={validateAndSave}>
          {initialTuning ? "Update Tuning" : "Save Tuning"}
        </Button>
      </div>
    </div>
  );
};