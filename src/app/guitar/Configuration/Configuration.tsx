import { ROOTS } from "@/lib/utils/scaleConstants";
import { Note } from "@/lib/utils/note";
import { useDataContext } from "@/app/guitar/context";
import { tuningGroups } from "@/app/guitar/tunings";
import { TuningPresetWithMetadata, TUNING_PRESETS } from "../tuningConstants";
import { MULTISCALE_PRESETS, PERPENDICULAR_FRET_OPTIONS } from "../multiscaleConstants";
import { Field, Select, TextInput, Button, IconButton } from "@/components/ui";

interface ConfigurationProps {
  onDeleteCustomTuning?: (tuningName: string) => void;
}

export const Configuration: React.FC<ConfigurationProps> = ({ onDeleteCustomTuning }) => {
  const {
    // Display settings
    flipX,
    flipY,
    fretCount,
    baseTuning,
    setFretCount,
    setFlipY,
    setBaseTuning,
    setFlipX,
    isMultiscale,
    setIsMultiscale,
    scaleLength,
    setScaleLength,
    perpendicular,
    setPerpendicular,
    fretboardTexture,
    setFretboardTexture,
    stringSpacing,
    setStringSpacing,

    // Tuning management
    scaleRoot,
    customTunings,
    setEditingTuning,
    setCustomTunings,
    saveCustomTuningsImmediately,
    saveScaleRootImmediately,
    setScaleRoot,
    editingTuning,
    showCustomTuning,
    setShowCustomTuning,
    handleSaveCustomTuning,
    openTuningEditor,
  } = useDataContext();

  const handleEditTuning = (tuning: TuningPresetWithMetadata): void => {
    openTuningEditor(tuning);
  };
  
  const handleDuplicateTuning = (tuning: TuningPresetWithMetadata) => {
    const newTuning: TuningPresetWithMetadata = {
      ...tuning,
      name: `${tuning.name} (Copy)`,
    };
    setCustomTunings((prevTunings) => [...prevTunings, newTuning]);
  };
  
  const handleDeleteTuning = (tuningName: string) => {
    console.log("[DELETE] Attempting to delete tuning:", tuningName);
    console.log("[DELETE] Current custom tunings:", customTunings);

    if (confirm("Are you sure you want to delete this custom tuning?")) {
      console.log("[DELETE] User confirmed deletion");

      // Filter out the deleted tuning
      const filteredTunings = customTunings.filter((t) => t.name !== tuningName);
      console.log("[DELETE] Filtered tunings:", filteredTunings);

      // If parent provided a callback, use it (for prop-based management)
      if (onDeleteCustomTuning) {
        console.log("[DELETE] Using parent callback");
        onDeleteCustomTuning(tuningName);
      } else {
        // Otherwise, use the context-based approach
        console.log("[DELETE] Using context-based approach");

        // Update state
        setCustomTunings(filteredTunings);
        console.log("[DELETE] State updated");

        // Immediately save to localStorage (don't wait for debounce)
        saveCustomTuningsImmediately(filteredTunings);
        console.log("[DELETE] Saved to localStorage immediately");
      }

      // If the deleted tuning was selected, switch to standard tuning
      if (scaleRoot.name === tuningName) {
        console.log("[DELETE] Deleted tuning was selected, switching to standard");
        const standardTuning = TUNING_PRESETS[0];
        setScaleRoot(standardTuning);
        // Immediately save the new current tuning
        saveScaleRootImmediately(standardTuning);
        console.log("[DELETE] Switched to standard tuning:", standardTuning.name);
      }
    } else {
      console.log("[DELETE] User cancelled deletion");
    }
  };

  return (
    <div className="rack-panel">
      <div className="rack-panel-header">
        <h3 className="rack-label">Rig Setup</h3>
      </div>
      <div className="p-2 sm:p-3 flex flex-col gap-3">
        <div className="flex flex-wrap justify-between items-start gap-3">
          {/* Left side inputs */}
          <div className="flex flex-col gap-2 sm:gap-3 md:flex-row md:flex-wrap md:items-start">
            <div className="flex flex-col gap-2 min-w-[160px]">
              <Field label="Tuning" htmlFor="scaleRoot">
                <Select
                  id="scaleRoot"
                  value={scaleRoot.name}
                  className="w-full"
                  onChange={(e) => {
                    if (e.target.value === "custom") {
                      openTuningEditor(null);
                    } else {
                      const selectedTuning = [
                        ...TUNING_PRESETS,
                        ...customTunings,
                      ].find((t) => t.name === e.target.value);
                      if (selectedTuning) {
                        setScaleRoot(selectedTuning);
                      }
                    }
                  }}
                >
                  {Object.entries(tuningGroups(customTunings)).map(
                    ([category, tunings]) => (
                      <optgroup key={category} label={category}>
                        {tunings.map((t: TuningPresetWithMetadata) => (
                          <option key={t.name} value={t.name}>
                            {t.name}
                            {customTunings.some((ct) => ct.name === t.name) &&
                              " (Custom)"}
                          </option>
                        ))}
                      </optgroup>
                    )
                  )}
                  <option value="custom">+ Custom Tuning</option>
                </Select>
              </Field>
              {customTunings.some((ct) => ct.name === scaleRoot.name) && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleEditTuning(scaleRoot as TuningPresetWithMetadata)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDuplicateTuning(scaleRoot as TuningPresetWithMetadata)}
                  >
                    Duplicate
                  </Button>
                  <Button
                    size="sm"
                    className="!text-[var(--console-danger)]"
                    onClick={() => handleDeleteTuning(scaleRoot.name)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-[70px]">
              <Field label="Base Tuning" htmlFor="base-scaleRoot">
                <Select
                  id="base-scaleRoot"
                  value={baseTuning}
                  className="w-full"
                  onChange={(e) => setBaseTuning(e.target.value as Note)}
                >
                  {ROOTS.map((note) => (
                    <option key={note} value={note}>
                      {note}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className="flex flex-col min-w-[90px]">
              <Field label="Number of frets" htmlFor="fret-count">
                <Select
                  id="fret-count"
                  value={fretCount}
                  className="w-full"
                  onChange={(e) => setFretCount(Number(e.target.value))}
                >
                  {[12, 20, 21, 22, 23, 24].map((num) => (
                    <option key={num} value={num}>
                      {num} frets
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className="flex flex-col min-w-[110px]">
              <Field label="Fretboard Texture" htmlFor="fretboard-texture">
                <Select
                  id="fretboard-texture"
                  value={fretboardTexture}
                  onChange={(e) => setFretboardTexture(e.target.value)}
                >
                  <option value="rosewood">Rosewood</option>
                  <option value="ebony">Pale moon ebony</option>
                  <option value="maple">Maple</option>
                  <option value="pau-ferro">Pau Ferro</option>
                  <option value="richlite">Richlite</option>
                </Select>
              </Field>
            </div>

            <div className="flex flex-col min-w-[100px]">
              <Field label="String Spacing" htmlFor="string-spacing">
                <Select
                  id="string-spacing"
                  value={stringSpacing}
                  onChange={(e) => setStringSpacing(e.target.value as 'normal' | 'enlarged')}
                >
                  <option value="normal">Normal</option>
                  <option value="enlarged">Enlarged</option>
                </Select>
              </Field>
            </div>
          </div>

          {/* Right side orientation controls */}
          <div className="flex items-center self-start pt-0">
            <Field label="Orientation">
              <div className="flex gap-2">
                <IconButton active={flipX} onClick={() => setFlipX(!flipX)} title="Flip horizontally">
                  ↔️
                </IconButton>
                <IconButton active={flipY} onClick={() => setFlipY(!flipY)} title="Flip vertically">
                  ↕️
                </IconButton>
              </div>
            </Field>
          </div>
        </div>

        {/* Multiscale Settings Row */}
        <div className="flex flex-wrap gap-4 pt-3 border-t border-[var(--console-border)]">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="multiscale"
              checked={isMultiscale}
              onChange={(e) => setIsMultiscale(e.target.checked)}
              className="rounded-none accent-[var(--console-accent)]"
            />
            <label htmlFor="multiscale" className="rack-label">
              Multiscale/Fanned Frets
            </label>
          </div>

          {isMultiscale && (
            <>
              {/* Custom scale length inputs when no preset matches */}
              {MULTISCALE_PRESETS.filter(preset => preset.strings === scaleRoot.strings.length).length === 0 && (
                <div className="flex gap-2 sm:gap-4">
                  <Field label="Treble Scale Length" htmlFor="treble-length">
                    <TextInput
                      type="number"
                      id="treble-length"
                      value={scaleLength.treble}
                      onChange={(e) => setScaleLength({
                        ...scaleLength,
                        treble: parseFloat(e.target.value) || scaleLength.treble
                      })}
                      step="0.25"
                      min="20"
                      max="35"
                      className="w-16"
                    />
                  </Field>
                  <Field label="Bass Scale Length" htmlFor="bass-length">
                    <TextInput
                      type="number"
                      id="bass-length"
                      value={scaleLength.bass}
                      onChange={(e) => setScaleLength({
                        ...scaleLength,
                        bass: parseFloat(e.target.value) || scaleLength.bass
                      })}
                      step="0.25"
                      min="20"
                      max="35"
                      className="w-16"
                    />
                  </Field>
                </div>
              )}

              <Field label="Perpendicular Fret" htmlFor="perpendicular">
                <Select
                  id="perpendicular"
                  value={perpendicular}
                  onChange={(e) => setPerpendicular(Number(e.target.value))}
                >
                  {PERPENDICULAR_FRET_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </Field>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
