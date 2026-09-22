import React from "react";
import { Field, Select } from "@/components/ui";
import { NOTE_COUNT_OPTIONS } from "./DiagramStrip";

interface NoteCountControlProps {
  value: number;
  onChange: (value: number) => void;
}

export const NoteCountControl: React.FC<NoteCountControlProps> = ({
  value,
  onChange,
}) => (
  <Field label="Display" htmlFor="note-count">
    <Select
      id="note-count"
      aria-label="Select number of notes to display"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {NOTE_COUNT_OPTIONS.map((num) => (
        <option key={num} value={num}>
          {num} note{num > 1 ? "s" : ""}
        </option>
      ))}
    </Select>
  </Field>
);
