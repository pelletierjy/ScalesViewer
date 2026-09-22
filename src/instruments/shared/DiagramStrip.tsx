import React from "react";
import { NoteWithOctave } from "@/lib/utils/note";

export const NOTE_COUNT_OPTIONS = [1, 3, 5, 7, 12, 16];

const DIAGRAM_WIDTH = 80;
const GAP = 20;
const PADDING = 20;

interface DiagramStripProps {
  notes: NoteWithOctave[];
  children: (note: NoteWithOctave, index: number) => React.ReactNode;
}

/**
 * Lays a fingering diagram out per note, side by side. Shared by the wind
 * instruments, whose only difference is the diagram they draw.
 */
export const DiagramStrip: React.FC<DiagramStripProps> = ({ notes, children }) => {
  const totalWidth =
    notes.length * DIAGRAM_WIDTH + (notes.length - 1) * GAP + PADDING * 2;

  return (
    <svg width="100%" height="400" viewBox={`0 0 ${totalWidth} 400`}>
      {notes.map((note, i) => (
        <g
          key={`${note}-${i}`}
          transform={`translate(${
            PADDING + i * (DIAGRAM_WIDTH + GAP) + DIAGRAM_WIDTH / 2
          }, 20)`}
        >
          {children(note, i)}
        </g>
      ))}
    </svg>
  );
};
