import { ROOTS } from "@/lib/utils/scaleConstants";
import { Note } from "@/lib/utils/note";
import { useDataContext } from "@/app/guitar/context";
import { tuningGroups } from "@/app/guitar/tunings";
import { TuningPresetWithMetadata, TUNING_PRESETS } from "../tuningConstants";
import { MULTISCALE_PRESETS, PERPENDICULAR_FRET_OPTIONS } from "../multiscaleConstants";
import { Field, Select, TextInput, Button, IconButton } from "@/components/ui";
import { useTranslations } from "next-intl";

const PERPENDICULAR_FRET_KEY_MAP: Record<string, string> = {
  "Nut (0th fret)": "multiscale.nut0thFret",
  "7th fret": "multiscale.7thFret",
  "9th fret": "multiscale.9thFret",
  "12th fret": "multiscale.12thFret",
};

interface ConfigurationProps {
  onDeleteCustomTuning?: (tuningName: string) => void;
}

export const Configuration: React.FC<ConfigurationProps> = ({ onDeleteCustomTuning }) => {
  const t = useTranslations();
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
      name: `${tuning.name} (${t("ui.custom")})`,
    };
    setCustomTunings((prevTunings) => [...prevTunings, newTuning]);
  };

  const handleDeleteTuning = (tuningName: string) => {
    console.log("[DELETE] Attempting to delete tuning:", tuningName);
    console.log("[DELETE] Current custom tunings:", customTunings);

    if (confirm(t("confirm.deleteCustomTuning"))) {
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
        <h3 className="rack-label">{t("ui.rigSetup")}</h3>
      </div>
      <div className="p-2 sm:p-3 flex flex-col gap-3">
        <div className="flex flex-wrap justify-between items-start gap-3">
          {/* Left side inputs */}
          <div className="flex flex-col gap-2 sm:gap-3 md:flex-row md:flex-wrap md:items-start">
            <div className="flex flex-col gap-2 min-w-[160px]">
              <Field label={t("ui.tuning")} htmlFor="scaleRoot">
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
                      <optgroup key={category} label={tunings[0]?.categoryKey ? t(tunings[0].categoryKey) : category}>
                        {tunings.map((tuning: TuningPresetWithMetadata) => (
                          <option key={tuning.name} value={tuning.name}>
                            {tuning.nameKey ? t(tuning.nameKey) : tuning.name}
                            {customTunings.some((ct) => ct.name === tuning.name) &&
                              ` ${t("ui.custom")}`}
                          </option>
                        ))}
                      </optgroup>
                    )
                  )}
                  <option value="custom">{t("ui.customTuning")}</option>
                </Select>
              </Field>
              {customTunings.some((ct) => ct.name === scaleRoot.name) && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleEditTuning(scaleRoot as TuningPresetWithMetadata)}
                  >
                    {t("ui.edit")}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDuplicateTuning(scaleRoot as TuningPresetWithMetadata)}
                  >
                    {t("ui.duplicate")}
                  </Button>
                  <Button
                    size="sm"
                    className="!text-[var(--console-danger)]"
                    onClick={() => handleDeleteTuning(scaleRoot.name)}
                  >
                    {t("ui.delete")}
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-[70px]">
              <Field label={t("ui.baseTuning")} htmlFor="base-scaleRoot">
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
              <Field label={t("ui.numberOfFrets")} htmlFor="fret-count">
                <Select
                  id="fret-count"
                  value={fretCount}
                  className="w-full"
                  onChange={(e) => setFretCount(Number(e.target.value))}
                >
                  {[12, 20, 21, 22, 23, 24].map((num) => (
                    <option key={num} value={num}>
                      {num} {t("ui.numberOfFrets").toLowerCase()}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className="flex flex-col min-w-[110px]">
              <Field label={t("ui.fretboardTexture")} htmlFor="fretboard-texture">
                <Select
                  id="fretboard-texture"
                  value={fretboardTexture}
                  onChange={(e) => setFretboardTexture(e.target.value)}
                >
                  <option value="rosewood">{t("texture.rosewood")}</option>
                  <option value="ebony">{t("texture.ebony")}</option>
                  <option value="maple">{t("texture.maple")}</option>
                  <option value="pau-ferro">{t("texture.pauFerro")}</option>
                  <option value="richlite">{t("texture.richlite")}</option>
                </Select>
              </Field>
            </div>

            <div className="flex flex-col min-w-[100px]">
              <Field label={t("ui.stringSpacing")} htmlFor="string-spacing">
                <Select
                  id="string-spacing"
                  value={stringSpacing}
                  onChange={(e) => setStringSpacing(e.target.value as 'normal' | 'enlarged')}
                >
                  <option value="normal">{t("ui.stringSpacingNormal")}</option>
                  <option value="enlarged">{t("ui.stringSpacingEnlarged")}</option>
                </Select>
              </Field>
            </div>
          </div>

          {/* Right side orientation controls */}
          <div className="flex items-center self-start pt-0">
            <Field label={t("ui.orientation")}>
              <div className="flex gap-2">
                <IconButton active={flipX} onClick={() => setFlipX(!flipX)} title={t("ui.flipHorizontally")}>
                  ↔️
                </IconButton>
                <IconButton active={flipY} onClick={() => setFlipY(!flipY)} title={t("ui.flipVertically")}>
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
              {t("ui.multiscale")}
            </label>
          </div>

          {isMultiscale && (
            <>
              {/* Custom scale length inputs when no preset matches */}
              {MULTISCALE_PRESETS.filter(preset => preset.strings === scaleRoot.strings.length).length === 0 && (
                <div className="flex gap-2 sm:gap-4">
                  <Field label={t("ui.trebleScaleLength")} htmlFor="treble-length">
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
                  <Field label={t("ui.bassScaleLength")} htmlFor="bass-length">
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

              <Field label={t("ui.perpendicularFret")} htmlFor="perpendicular">
                <Select
                  id="perpendicular"
                  value={perpendicular}
                  onChange={(e) => setPerpendicular(Number(e.target.value))}
                >
                  {PERPENDICULAR_FRET_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t(PERPENDICULAR_FRET_KEY_MAP[option.label] || option.label)}
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
