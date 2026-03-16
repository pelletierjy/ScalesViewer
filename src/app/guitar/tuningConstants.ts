import { TuningPreset } from "../../app/guitar/types/tuningPreset";

export interface TuningPresetWithMetadata extends TuningPreset {
  description: string;
  category: "Standard" | "Drop" | "Open" | "Special" | "Bass" | "Mandolin" | "Custom";
}

export const TUNING_PRESETS: TuningPresetWithMetadata[] = [
  // 6-String Standard Tunings
  {
    name: "Standard (6)",
    strings: ["E", "A", "D", "G", "B", "E"],
    description:
      "The most common guitar scaleRoot used in rock, pop, and many other genres",
    category: "Standard",
  },
  {
    name: "Perfect 4 Interval (6)",
    strings: ["E", "A", "D", "G", "C", "F"],
    description:
      "Tuning in perfect fourth intervals, great for jazz and fusion",
    category: "Special",
  },
  {
    name: "Drop D (6)",
    strings: ["D", "A", "D", "G", "B", "E"],
    description:
      "Popular in rock and metal, allows easy power chords on the low strings",
    category: "Drop",
  },
  {
    name: "Open D (6)",
    strings: ["D", "A", "D", "F#", "A", "D"],
    description:
      "Forms a D major chord when strummed open, popular in folk and blues",
    category: "Open",
  },
  {
    name: "Open G (6)",
    strings: ["D", "G", "D", "G", "B", "D"],
    description: "Popular in blues and rock, famously used by Keith Richards",
    category: "Open",
  },
  {
    name: "DADGAD (6)",
    strings: ["D", "A", "D", "G", "A", "D"],
    description:
      "Celtic and folk scaleRoot with a modal sound, great for fingerstyle",
    category: "Special",
  },

  // 7-String Tunings
  {
    name: "Standard (7)",
    strings: ["B", "E", "A", "D", "G", "B", "E"],
    description: "Standard 7-string scaleRoot, adds a low B for extended range",
    category: "Standard",
  },
  {
    name: "Perfect 4 Interval (7)",
    strings: ["B", "E", "A", "D", "G", "C", "F"],
    description: "Seven string scaleRoot in perfect fourth intervals",
    category: "Special",
  },
  {
    name: "Drop A (7)",
    strings: ["A", "E", "A", "D", "G", "B", "E"],
    description:
      "Popular in modern metal, allows for easy power chords on the low string",
    category: "Drop",
  },
  {
    name: "Russian (7)",
    strings: ["D", "G", "B", "D", "G", "B", "D"],
    description: "Traditional Russian guitar scaleRoot with a rich, full sound",
    category: "Special",
  },

  // 8-String Tunings
  {
    name: "Standard (8)",
    strings: ["F#", "B", "E", "A", "D", "G", "B", "E"],
    description: "Standard 8-string scaleRoot, extends range down to F#",
    category: "Standard",
  },
  {
    name: "Perfect 4 Interval (8)",
    strings: ["F#", "B", "E", "A", "D", "G", "C", "F"],
    description: "Eight string scaleRoot in perfect fourth intervals",
    category: "Special",
  },
  {
    name: "Drop E (8)",
    strings: ["E", "B", "E", "A", "D", "G", "B", "E"],
    description: "Drop scaleRoot for 8-string, popular in progressive metal",
    category: "Drop",
  },
  {
    name: "Progressive (8)",
    strings: ["D#", "A#", "F", "C", "G", "D", "A", "E"],
    description: "Major thirds scaleRoot, offers unique chord voicings",
    category: "Special",
  },

  // 9-String Tunings
  {
    name: "Perfect 4 Interval (9)",
    strings: ["C#", "F#", "B", "E", "A", "D", "G", "C", "F"],
    description: "Nine string scaleRoot in perfect fourth intervals",
    category: "Special",
  },

  // 10-String Tunings
  {
    name: "Perfect 4 Interval (10)",
    strings: ["G#", "C#", "F#", "B", "E", "A", "D", "G", "C", "F"],
    description: "JY's favorite",
    category: "Special",
  },

  // Alternative 6-String Tunings
  {
    name: "Half Step Down (6)",
    strings: ["D#", "G#", "C#", "F#", "A#", "D#"],
    description: "Everything tuned down half step, common in rock and metal",
    category: "Standard",
  },
  {
    name: "Full Step Down (6)",
    strings: ["D", "G", "C", "F", "A", "D"],
    description: "Everything tuned down whole step, adds depth to the sound",
    category: "Standard",
  },
  {
    name: "Open E (6)",
    strings: ["E", "B", "E", "G#", "B", "E"],
    description:
      "Forms an E major chord when strummed open, great for slide guitar",
    category: "Open",
  },
  {
    name: "Open A (6)",
    strings: ["E", "A", "E", "A", "C#", "E"],
    description:
      "Forms an A major chord when strummed open, popular in slide guitar",
    category: "Open",
  },
  {
    name: "Open C (6)",
    strings: ["C", "G", "C", "G", "C", "E"],
    description:
      "Forms a C major chord when strummed open, used in folk and alternative",
    category: "Open",
  },
  {
    name: "Nashville (6)",
    strings: ["E", "A", "D", "G", "B", "E"],
    description: "High-strung scaleRoot used in Nashville for a bright sound",
    category: "Special",
  },
  {
    name: "Base (4)",
    strings: ["E", "A", "D", "G"],
    description:
      "The most common bass guitar scaleRoot used in rock, pop, and many other genres",
    category: "Bass",
  },
  {
    name: "Base (5)",
    strings: ["B", "E", "A", "D", "G"],
    description: "5 bass guitar scaleRoot",
    category: "Bass",
  },
  {
    name: "Mandolin",
    strings: ["G", "D", "A", "E"],
    description: "Mandolin scaleRoot",
    category: "Mandolin",
  },
] as const;
