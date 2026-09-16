import { TuningPreset } from "../../app/guitar/types/tuningPreset";

export interface TuningPresetWithMetadata extends TuningPreset {
  description: string;
  category: "Standard" | "Drop" | "Open" | "Special" | "Bass" | "Mandolin" | "Custom";
  nameKey?: string;
  categoryKey?: string;
}

export const TUNING_PRESETS: TuningPresetWithMetadata[] = [
  // 6-String Standard Tunings
  {
    name: "Standard (6)",
    strings: ["E", "A", "D", "G", "B", "E"],
    description:
      "The most common guitar scaleRoot used in rock, pop, and many other genres",
    category: "Standard",
    nameKey: "tuning.standard6",
    categoryKey: "tuningCategory.standard",
  },
  {
    name: "Perfect 4 Interval (6)",
    strings: ["E", "A", "D", "G", "C", "F"],
    description:
      "Tuning in perfect fourth intervals, great for jazz and fusion",
    category: "Special",
    nameKey: "tuning.perfect4Interval6",
    categoryKey: "tuningCategory.special",
  },
  {
    name: "Drop D (6)",
    strings: ["D", "A", "D", "G", "B", "E"],
    description:
      "Popular in rock and metal, allows easy power chords on the low strings",
    category: "Drop",
    nameKey: "tuning.dropD6",
    categoryKey: "tuningCategory.drop",
  },
  {
    name: "Open D (6)",
    strings: ["D", "A", "D", "F#", "A", "D"],
    description:
      "Forms a D major chord when strummed open, popular in folk and blues",
    category: "Open",
    nameKey: "tuning.openD6",
    categoryKey: "tuningCategory.open",
  },
  {
    name: "Open G (6)",
    strings: ["D", "G", "D", "G", "B", "D"],
    description: "Popular in blues and rock, famously used by Keith Richards",
    category: "Open",
    nameKey: "tuning.openG6",
    categoryKey: "tuningCategory.open",
  },
  {
    name: "DADGAD (6)",
    strings: ["D", "A", "D", "G", "A", "D"],
    description:
      "Celtic and folk scaleRoot with a modal sound, great for fingerstyle",
    category: "Special",
    nameKey: "tuning.dadgad6",
    categoryKey: "tuningCategory.special",
  },

  // 7-String Tunings
  {
    name: "Standard (7)",
    strings: ["B", "E", "A", "D", "G", "B", "E"],
    description: "Standard 7-string scaleRoot, adds a low B for extended range",
    category: "Standard",
    nameKey: "tuning.standard7",
    categoryKey: "tuningCategory.standard",
  },
  {
    name: "Perfect 4 Interval (7)",
    strings: ["B", "E", "A", "D", "G", "C", "F"],
    description: "Seven string scaleRoot in perfect fourth intervals",
    category: "Special",
    nameKey: "tuning.perfect4Interval7",
    categoryKey: "tuningCategory.special",
  },
  {
    name: "Drop A (7)",
    strings: ["A", "E", "A", "D", "G", "B", "E"],
    description:
      "Popular in modern metal, allows for easy power chords on the low string",
    category: "Drop",
    nameKey: "tuning.dropA7",
    categoryKey: "tuningCategory.drop",
  },
  {
    name: "Russian (7)",
    strings: ["D", "G", "B", "D", "G", "B", "D"],
    description: "Traditional Russian guitar scaleRoot with a rich, full sound",
    category: "Special",
    nameKey: "tuning.russian7",
    categoryKey: "tuningCategory.special",
  },

  // 8-String Tunings
  {
    name: "Standard (8)",
    strings: ["F#", "B", "E", "A", "D", "G", "B", "E"],
    description: "Standard 8-string scaleRoot, extends range down to F#",
    category: "Standard",
    nameKey: "tuning.standard8",
    categoryKey: "tuningCategory.standard",
  },
  {
    name: "Perfect 4 Interval (8)",
    strings: ["F#", "B", "E", "A", "D", "G", "C", "F"],
    description: "Eight string scaleRoot in perfect fourth intervals",
    category: "Special",
    nameKey: "tuning.perfect4Interval8",
    categoryKey: "tuningCategory.special",
  },
  {
    name: "Drop E (8)",
    strings: ["E", "B", "E", "A", "D", "G", "B", "E"],
    description: "Drop scaleRoot for 8-string, popular in progressive metal",
    category: "Drop",
    nameKey: "tuning.dropE8",
    categoryKey: "tuningCategory.drop",
  },
  {
    name: "Progressive (8)",
    strings: ["D#", "A#", "F", "C", "G", "D", "A", "E"],
    description: "Major thirds scaleRoot, offers unique chord voicings",
    category: "Special",
    nameKey: "tuning.progressive8",
    categoryKey: "tuningCategory.special",
  },

  // 9-String Tunings
  {
    name: "Perfect 4 Interval (9)",
    strings: ["C#", "F#", "B", "E", "A", "D", "G", "C", "F"],
    description: "Nine string scaleRoot in perfect fourth intervals",
    category: "Special",
    nameKey: "tuning.perfect4Interval9",
    categoryKey: "tuningCategory.special",
  },

  // 10-String Tunings
  {
    name: "Perfect 4 Interval (10)",
    strings: ["G#", "C#", "F#", "B", "E", "A", "D", "G", "C", "F"],
    description: "JY's favorite",
    category: "Special",
    nameKey: "tuning.perfect4Interval10",
    categoryKey: "tuningCategory.special",
  },

  // Alternative 6-String Tunings
  {
    name: "Half Step Down (6)",
    strings: ["D#", "G#", "C#", "F#", "A#", "D#"],
    description: "Everything tuned down half step, common in rock and metal",
    category: "Standard",
    nameKey: "tuning.halfStepDown6",
    categoryKey: "tuningCategory.standard",
  },
  {
    name: "Full Step Down (6)",
    strings: ["D", "G", "C", "F", "A", "D"],
    description: "Everything tuned down whole step, adds depth to the sound",
    category: "Standard",
    nameKey: "tuning.fullStepDown6",
    categoryKey: "tuningCategory.standard",
  },
  {
    name: "Open E (6)",
    strings: ["E", "B", "E", "G#", "B", "E"],
    description:
      "Forms an E major chord when strummed open, great for slide guitar",
    category: "Open",
    nameKey: "tuning.openE6",
    categoryKey: "tuningCategory.open",
  },
  {
    name: "Open A (6)",
    strings: ["E", "A", "E", "A", "C#", "E"],
    description:
      "Forms an A major chord when strummed open, popular in slide guitar",
    category: "Open",
    nameKey: "tuning.openA6",
    categoryKey: "tuningCategory.open",
  },
  {
    name: "Open C (6)",
    strings: ["C", "G", "C", "G", "C", "E"],
    description:
      "Forms a C major chord when strummed open, used in folk and alternative",
    category: "Open",
    nameKey: "tuning.openC6",
    categoryKey: "tuningCategory.open",
  },
  {
    name: "Nashville (6)",
    strings: ["E", "A", "D", "G", "B", "E"],
    description: "High-strung scaleRoot used in Nashville for a bright sound",
    category: "Special",
    nameKey: "tuning.nashville6",
    categoryKey: "tuningCategory.special",
  },
  {
    name: "Base (4)",
    strings: ["E", "A", "D", "G"],
    description:
      "The most common bass guitar scaleRoot used in rock, pop, and many other genres",
    category: "Bass",
    nameKey: "tuning.base4",
    categoryKey: "tuningCategory.bass",
  },
  {
    name: "Base (5)",
    strings: ["B", "E", "A", "D", "G"],
    description: "5 bass guitar scaleRoot",
    category: "Bass",
    nameKey: "tuning.base5",
    categoryKey: "tuningCategory.bass",
  },
  {
    name: "Mandolin",
    strings: ["G", "D", "A", "E"],
    description: "Mandolin scaleRoot",
    category: "Mandolin",
    nameKey: "tuning.mandolin",
    categoryKey: "tuningCategory.mandolin",
  },
] as const;
