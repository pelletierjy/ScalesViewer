"use client";
import { ROOTS, SCALE_TYPES } from "@/lib/utils/scaleConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDarkMode,
  setScale,
  toggleShowMonochrome,
  toggleShowFlats,
  toggleShowDegrees,
} from "@/features/globalConfig/globalConfigSlice";
import { setInstrument } from "../features/globalConfig/globalConfigSlice";
import {
  selectIsDarkMode,
  selectInstrument,
  selectScale,
  selectShowFlats,
  selectIsMonochrome,
  selectShowDegrees,
} from "../features/globalConfig/globalConfigSlice";
import { Instrument } from "@/lib/utils/instrument";
import { Note } from "@/lib/utils/note";
import { ScaleType } from "@/lib/utils/scaleType";
import React, { useRef, useMemo, useEffect } from "react";
import { HelpModal } from "./HelpModal";
import { SettingsPanel } from "@/features/settings/components/SettingsPanel";
import { useLocalStorage } from "@/app/guitar/hooks/useLocalStorage";
import {
  getCustomScales,
  registerCustomScales,
  CustomScaleDefinition,
} from "@/lib/utils/customScaleTypes";
import { LOCAL_STORAGE_KEYS } from "@/features/settings/types/settings.types";
import { CustomScaleEditor } from "@/app/guitar/CustomScaleEditor/CustomScaleEditor";
import { Field, Button, IconButton, Select } from "@/components/ui";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "./LanguageSelector";

export const Header: React.FC = () => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const showFlats = useSelector(selectShowFlats);
  const scale = useSelector(selectScale);
  const instrument = useSelector(selectInstrument);
  const isDarkMode = useSelector(selectIsDarkMode);
  const showDegrees = useSelector(selectShowDegrees);
  const highlightRoots = useSelector(selectIsMonochrome);
  const [showHelp, setShowHelp] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [showScaleEditor, setShowScaleEditor] = React.useState(false);
  const [editingScale, setEditingScale] = React.useState<CustomScaleDefinition | null>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);

  // Load custom scales from localStorage
  const [customScales, setCustomScalesStorage] = useLocalStorage<CustomScaleDefinition[]>(
    LOCAL_STORAGE_KEYS.CUSTOM_SCALES,
    getCustomScales()
  );

  // Register custom scales in the runtime registry
  useEffect(() => {
    registerCustomScales(customScales);
  }, [customScales]);

  // Merge hardcoded and custom scale types for dropdown
  const allScaleTypes = useMemo(() => {
    const customEntries = customScales.map((cs) => ({
      value: cs.id,
      label: cs.label,
      group: cs.group,
    }));
    const builtInEntries = SCALE_TYPES.map((s) => ({
      value: s.value,
      label: s.labelKey ? t(s.labelKey) : s.value,
      group: s.groupKey ? t(s.groupKey) : "Other",
    }));
    return [...builtInEntries, ...customEntries];
  }, [customScales, t]);

  const handleInstrumentChange = (newInstrument: Instrument) => {
    dispatch(setInstrument(newInstrument));
  };

  const handleSaveCustomScale = (scale: CustomScaleDefinition) => {
    if (editingScale) {
      // Update existing scale
      setCustomScalesStorage((prevScales) =>
        prevScales.map((s) => (s.id === editingScale.id ? scale : s))
      );
    } else {
      // Add new scale
      setCustomScalesStorage((prevScales) => [...prevScales, scale]);
    }
    setShowScaleEditor(false);
    setEditingScale(null);
  };

  const handleEditScale = (scale: CustomScaleDefinition) => {
    setEditingScale(scale);
    setShowScaleEditor(true);
  };

  const handleDeleteCustomScale = (scaleId: string) => {
    if (confirm(t("confirm.deleteCustomScale"))) {
      setCustomScalesStorage((prevScales) =>
        prevScales.filter((s) => s.id !== scaleId)
      );
      // If the deleted scale was selected, revert to major
      if (scale.type === scaleId) {
        dispatch(setScale({ ...scale, type: "major" as ScaleType }));
      }
    }
  };

  const selectedCustomScale = customScales.find((cs) => cs.id === scale.type);

  return (
    <>
      <div className="rack-panel">
        <div className="rack-panel-header">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: "var(--console-accent)", boxShadow: "0 0 6px var(--console-accent)" }}
              aria-hidden="true"
            />
            <h1 className="rack-mono text-sm sm:text-base font-bold tracking-widest uppercase">
              {t("app.title")}
            </h1>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <IconButton
              onClick={() => dispatch(toggleShowDegrees())}
              title={showDegrees ? t("ui.showNoteNames") : t("ui.showScaleDegrees")}
            >
              {showDegrees ? "ABC" : "123"}
            </IconButton>
            <IconButton
              onClick={() => dispatch(toggleShowFlats())}
              title={showFlats ? t("ui.showSharpNotes") : t("ui.showFlatNotes")}
            >
              {showFlats ? "♯" : "♭"}
            </IconButton>
            <IconButton
              onClick={() => dispatch(toggleShowMonochrome())}
              title={highlightRoots ? t("ui.highlightIntervals") : t("ui.highlightRootNotes")}
            >
              {highlightRoots ? "🎨" : "⚫"}
            </IconButton>
            <IconButton onClick={() => setShowHelp(true)} title={t("ui.showHelp")}>
              ❓
            </IconButton>
            <IconButton
              ref={settingsButtonRef}
              onClick={() => setShowSettings(true)}
              title={t("ui.openSettings")}
              aria-label={t("ui.openSettings")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </IconButton>
            <IconButton
              active={isDarkMode}
              onClick={() => dispatch(toggleDarkMode())}
              title={isDarkMode ? t("ui.switchToLightMode") : t("ui.switchToDarkMode")}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </IconButton>
          </div>
        </div>

        <div className="p-2 sm:p-3 flex flex-wrap items-end gap-3 sm:gap-4">
          <Field label={t("ui.instrument")} htmlFor="instrument">
            <Select
              id="instrument"
              value={instrument}
              onChange={(e) => handleInstrumentChange(e.target.value as Instrument)}
            >
              <option value="guitar">{t("instrument.guitar")}</option>
              <option value="piano">{t("instrument.piano")}</option>
              <option value="kalimba">{t("instrument.kalimba")}</option>
              <option value="harmonica">{t("instrument.harmonica")}</option>
              <option value="flute">{t("instrument.flute")}</option>
              <option value="recorder">{t("instrument.recorder")}</option>
            </Select>
          </Field>

          <Field label={t("ui.scale")} htmlFor="scale-type">
            <div className="flex flex-col gap-1">
              <Select
                id="scale-type"
                value={scale.type}
                onChange={(e) => {
                  if (e.target.value === "__new__") {
                    setEditingScale(null);
                    setShowScaleEditor(true);
                  } else {
                    dispatch(setScale({ ...scale, type: e.target.value as ScaleType }));
                  }
                }}
              >
                {Object.entries(
                  allScaleTypes.reduce((groups, scaleEntry) => {
                    const group = scaleEntry.group || t("scaleGroup.other");
                    if (!groups[group]) {
                      groups[group] = [];
                    }
                    groups[group].push(scaleEntry);
                    return groups;
                  }, {} as Record<string, { value: string; label: string; group: string }[]>)
                ).map(([group, scales]) => (
                  <optgroup key={group} label={group}>
                    {scales.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
                <option value="__new__">{t("ui.customScale")}</option>
              </Select>
              {selectedCustomScale && (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleEditScale(selectedCustomScale)}>
                    {t("ui.edit")}
                  </Button>
                  <Button
                    size="sm"
                    className="!text-[var(--console-danger)]"
                    onClick={() => handleDeleteCustomScale(selectedCustomScale.id)}
                  >
                    {t("ui.delete")}
                  </Button>
                </div>
              )}
            </div>
          </Field>

          <Field label={t("ui.root")} htmlFor="root-note">
            <Select
              id="root-note"
              value={scale.root}
              onChange={(e) => dispatch(setScale({ ...scale, root: e.target.value as Note }))}
            >
              {ROOTS.map((note) => (
                <option key={note} value={note}>
                  {note}
                </option>
              ))}
            </Select>
          </Field>

          <Field label={t("ui.language")} htmlFor="language">
            <LanguageSelector />
          </Field>
        </div>
      </div>

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} isDarkMode={isDarkMode} />
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        triggerRef={settingsButtonRef}
      />

      {showScaleEditor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60"
          onClick={() => {
            setShowScaleEditor(false);
            setEditingScale(null);
          }}
          role="presentation"
        >
          <div className="rack-panel max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <CustomScaleEditor
              initialScale={editingScale}
              onSaveScale={handleSaveCustomScale}
              onCancel={() => {
                setShowScaleEditor(false);
                setEditingScale(null);
              }}
              customScales={customScales}
            />
          </div>
        </div>
      )}
    </>
  );
};
