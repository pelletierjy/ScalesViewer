import { tuningGroups } from "@/app/guitar/tunings";
import {
  TUNING_PRESETS,
  TuningPresetWithMetadata,
} from "@/app/guitar/tuningConstants";

describe("tuningGroups", () => {
  it("should group tunings by category", () => {
    // Create a sample custom tuning
    const customTuning: TuningPresetWithMetadata = {
      name: "My Custom Tuning",
      strings: ["E", "A", "D", "G", "B", "E"],
      description: "A custom tuning for testing",
      stringCount: 6,
      category: "Custom",
    };

    // Call the tuningGroups function with the custom tuning
    const groups = tuningGroups([customTuning]);

    // Check that the result contains all categories from TUNING_PRESETS plus the custom category
    expect(groups).toHaveProperty("Standard");
    expect(groups).toHaveProperty("Drop");
    expect(groups).toHaveProperty("Open");
    expect(groups).toHaveProperty("Special");
    expect(groups).toHaveProperty("Custom");

    // Check that the custom tuning is in the Custom category
    expect(groups.Custom).toContainEqual(
      expect.objectContaining({
        name: "My Custom Tuning",
      })
    );

    // Check that all tunings from TUNING_PRESETS are included
    const totalTunings = Object.values(groups).flat().length;
    expect(totalTunings).toBe(TUNING_PRESETS.length + 1); // +1 for the custom tuning
  });

  it("should handle empty custom tunings array", () => {
    // Call the tuningGroups function with an empty array
    const groups = tuningGroups([]);

    // Check that the result contains all categories from TUNING_PRESETS
    expect(groups).toHaveProperty("Standard");
    expect(groups).toHaveProperty("Drop");
    expect(groups).toHaveProperty("Open");
    expect(groups).toHaveProperty("Special");

    // Check that all tunings from TUNING_PRESETS are included
    const totalTunings = Object.values(groups).flat().length;
    expect(totalTunings).toBe(TUNING_PRESETS.length);
  });
});
