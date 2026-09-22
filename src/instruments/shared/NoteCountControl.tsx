import React from "react";
import { Field, Select } from "@/components/ui";
import { NOTE_COUNT_OPTIONS } from "./DiagramStrip";
import { useTranslations } from "next-intl";

interface NoteCountControlProps {
  value: number;
  onChange: (value: number) => void;
}

export const NoteCountControl: React.FC<NoteCountControlProps> = ({
  value,
  onChange,
}) => {
  const t = useTranslations();
  return (
    <Field label={t("ui.display")} htmlFor="note-count">
      <Select
        id="note-count"
        aria-label={t("ui.selectNoteCount")}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {NOTE_COUNT_OPTIONS.map((num) => (
          <option key={num} value={num}>
            {t("ui.noteCount", { n: num })}
          </option>
        ))}
      </Select>
    </Field>
  );
};
