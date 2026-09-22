"use client";
import React, { useState, useEffect } from "react";
import { GuitarNeck } from "./GuitarNeck/GuitarNeck";
import { Configuration } from "./Configuration/Configuration";
import { DataProvider } from "./context";
import { CustomTuningEditor } from "./CustomTuningEditor/CustomTuningEditor";
import { TuningPresetWithMetadata } from "./tuningConstants";
import { TuningPreset } from "./types/tuningPreset";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { InstrumentViewProps } from "@/components/InstrumentWorkspace/types";

export const useGuitarSettings = (): void => undefined;

export const GuitarView: React.FC<InstrumentViewProps> = () => {
  const [showTuningEditor, setShowTuningEditor] = useState(false);
  const [editingTuning, setEditingTuning] = useState<TuningPresetWithMetadata | null>(
    null
  );

  const [customTunings, setCustomTuningsStorage] = useLocalStorage<
    TuningPresetWithMetadata[]
  >("custom-tunings", []);

  // Migrate existing custom tunings from "Special" to "Custom" category
  useEffect(() => {
    setCustomTuningsStorage((prevTunings) =>
      prevTunings.map((tuning) =>
        tuning.category === "Special" ? { ...tuning, category: "Custom" } : tuning
      )
    );
  }, [setCustomTuningsStorage]);

  const handleDeleteCustomTuning = (tuningName: string) => {
    setCustomTuningsStorage((prevTunings) =>
      prevTunings.filter((t) => t.name !== tuningName)
    );
  };

  const handleSaveCustomTuning = (tuning: TuningPreset) => {
    const customTuning: TuningPresetWithMetadata = {
      ...tuning,
      description: `Custom ${tuning.strings.length}-string tuning`,
      category: "Custom",
    };

    setCustomTuningsStorage((prevTunings) =>
      editingTuning
        ? prevTunings.map((t) => (t.name === editingTuning.name ? customTuning : t))
        : [...prevTunings, customTuning]
    );

    setShowTuningEditor(false);
    setEditingTuning(null);
  };

  const openTuningEditor = (tuning?: TuningPresetWithMetadata | null) => {
    setEditingTuning(tuning || null);
    setShowTuningEditor(true);
  };

  const closeTuningEditor = () => {
    setShowTuningEditor(false);
    setEditingTuning(null);
  };

  return (
    <>
      <DataProvider customTunings={customTunings} openTuningEditor={openTuningEditor}>
        <GuitarNeck />
        <Configuration onDeleteCustomTuning={handleDeleteCustomTuning} />
      </DataProvider>

      {showTuningEditor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60"
          onClick={closeTuningEditor}
          role="presentation"
        >
          <div
            className="rack-panel max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CustomTuningEditor
              initialTuning={editingTuning}
              onSaveTuning={handleSaveCustomTuning}
              onCancel={closeTuningEditor}
              customTunings={customTunings}
            />
          </div>
        </div>
      )}
    </>
  );
};
