import React, { useState } from "react";
import { CustomScaleDefinition } from "@/lib/utils/customScaleTypes";
import { validateTuningName, sanitizeString } from "@/lib/utils/inputSanitization";
import { Field, Select, TextInput, Button } from "@/components/ui";
import { useTranslations } from "next-intl";

interface CustomScaleEditorProps {
  onSaveScale: (scale: CustomScaleDefinition) => void;
  onCancel: () => void;
  initialScale?: CustomScaleDefinition | null;
  customScales: CustomScaleDefinition[];
}

const MIN_NOTES = 2;
const MAX_NOTES = 12;

// Preview note names starting from C
const C_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const CustomScaleEditor: React.FC<CustomScaleEditorProps> = ({
  onSaveScale,
  onCancel,
  initialScale,
  customScales,
}) => {
  const t = useTranslations();
  const [label, setLabel] = useState(initialScale?.label ?? t("customScaleEditor.createScale"));
  const [group, setGroup] = useState(initialScale?.group ?? t("scaleGroup.custom"));
  // Keep intervals in editing order (unsorted) so user controls the arrangement
  const [intervals, setIntervals] = useState<number[]>(
    initialScale?.intervals ?? [0, 2, 4, 5, 7, 9, 11]
  );
  const [nameError, setNameError] = useState("");
  const [intervalError, setIntervalError] = useState("");

  const intervalOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: t(`customScaleEditor.interval${i}`),
  }));

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
    const next = intervalOptions.find((o) => !used.has(o.value))?.value ?? 0;
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
      setNameError(t("customScaleEditor.scaleNameExists", { defaultMessage: "A scale with this name already exists" }));
      return;
    }

    if (!intervals.includes(0)) {
      setIntervalError(t("customScaleEditor.scaleMustIncludeRoot"));
      return;
    }

    if (new Set(intervals).size !== intervals.length) {
      setIntervalError(t("customScaleEditor.duplicateInterval"));
      return;
    }

    const id = initialScale?.id ?? `custom-${Date.now()}`;

    onSaveScale({
      id,
      label: sanitizedLabel,
      group: sanitizeString(group) || t("scaleGroup.custom"),
      intervals: [...intervals].sort((a, b) => a - b),
    });
  };

  // Build sorted preview of note names in C
  const sortedForPreview = [...new Set(intervals)].sort((a, b) => a - b);
  const previewNotes = sortedForPreview.map((i) => C_NOTES[i]).join("  –  ");

  // Detect which intervals are duplicated (for inline warning)
  const duplicatedValues = intervals.filter(
    (v, i) => intervals.indexOf(v) !== i
  );

  return (
    <div className="space-y-6">
      <h3 className="rack-label text-sm">
        {initialScale ? t("customScaleEditor.editScale") : t("customScaleEditor.createScale")}
      </h3>

      {/* Name & Group */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Field label={t("customScaleEditor.scaleName")} htmlFor="scale-label">
            <TextInput
              type="text"
              id="scale-label"
              value={label}
              onChange={handleLabelChange}
              className={`mt-1 w-full ${nameError ? "!border-[var(--console-danger)]" : ""}`}
            />
          </Field>
          {nameError && (
            <p className="mt-1 text-sm text-[var(--console-danger)] font-medium">{nameError}</p>
          )}
        </div>
        <Field label={t("customScaleEditor.group")} htmlFor="scale-group">
          <TextInput
            type="text"
            id="scale-group"
            value={group}
            onChange={handleGroupChange}
            placeholder={t("customScaleEditor.groupPlaceholder")}
            className="mt-1 w-full"
          />
        </Field>
      </div>

      {/* Interval pickers */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="rack-label">{t("customScaleEditor.notes")}</span>
          <Button size="sm" tone="accent2" onClick={handleAddInterval} disabled={intervals.length >= MAX_NOTES}>
            {t("customScaleEditor.addNote")}
          </Button>
        </div>

        {intervalError && (
          <p className="mb-2 text-sm text-[var(--console-danger)] font-medium">{intervalError}</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {intervals.map((interval, index) => {
            const isDuplicate = duplicatedValues.includes(interval);
            return (
              <Field key={index} label={t("customScaleEditor.noteN", { n: index + 1, defaultMessage: `Note ${index + 1}` })} >
                <Select
                  value={interval}
                  onChange={(e) => handleIntervalChange(index, e.target.value)}
                  className={`text-sm ${isDuplicate ? "!border-[var(--console-danger)]" : ""}`}
                >
                  {intervalOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
                <Button
                  size="sm"
                  className="w-full !text-[var(--console-danger)]"
                  onClick={() => handleRemoveInterval(index)}
                  disabled={intervals.length <= MIN_NOTES}
                >
                  {t("customScaleEditor.remove")}
                </Button>
              </Field>
            );
          })}
        </div>
      </div>

      {/* Live preview */}
      <div className="rack-stage p-3 text-sm">
        <p className="font-medium mb-1">
          {t("customScaleEditor.previewInC", { name: label || t("customScaleEditor.unnamed", { defaultMessage: "Unnamed" }), count: sortedForPreview.length })}
        </p>
        <p className="text-xs rack-mono">{previewNotes || "—"}</p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-[var(--console-border)]">
        <Button onClick={onCancel}>{t("ui.cancel")}</Button>
        <Button tone="accent" onClick={validateAndSave}>
          {initialScale ? t("ui.update") : t("ui.save")}
        </Button>
      </div>
    </div>
  );
};
