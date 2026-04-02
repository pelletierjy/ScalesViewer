"use client";
import React, { useState, useEffect } from "react";
import { GuitarNeck } from "./GuitarNeck/GuitarNeck";
import { Configuration } from "./Configuration/Configuration";
import { DataProvider } from "./context";
import { CustomTuningEditor } from "./CustomTuningEditor/CustomTuningEditor";
import { TuningPresetWithMetadata } from "./tuningConstants";
import { TuningPreset } from "./types/tuningPreset";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "@/features/globalConfig/globalConfigSlice";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function Guitar() {
  const isDarkMode = useSelector(selectIsDarkMode);
  const [showTuningEditor, setShowTuningEditor] = useState(false);
  const [editingTuning, setEditingTuning] = useState<TuningPresetWithMetadata | null>(null);

  // Load custom tunings from localStorage
  const [customTunings, setCustomTuningsStorage] = useLocalStorage<TuningPresetWithMetadata[]>(
    "custom-tunings",
    []
  );

  // Migrate existing custom tunings from "Special" to "Custom" category
  useEffect(() => {
    setCustomTuningsStorage((prevTunings) =>
      prevTunings.map((tuning) =>
        tuning.category === "Special"
          ? { ...tuning, category: "Custom" }
          : tuning
      )
    );
  }, [setCustomTuningsStorage]);

  const handleDeleteCustomTuning = (tuningName: string) => {
    console.log("[Guitar Page] Deleting custom tuning:", tuningName);
    setCustomTuningsStorage((prevTunings) => {
      const filtered = prevTunings.filter((t) => t.name !== tuningName);
      console.log("[Guitar Page] Filtered tunings:", filtered);
      return filtered;
    });
  };

  const handleSaveCustomTuning = (tuning: TuningPreset) => {
    const customTuning: TuningPresetWithMetadata = {
      ...tuning,
      description: `Custom ${tuning.strings.length}-string tuning`,
      category: "Custom",
    };

    if (editingTuning) {
      // Update existing tuning
      setCustomTuningsStorage((prevTunings) =>
        prevTunings.map((t) =>
          t.name === editingTuning.name ? customTuning : t
        )
      );
    } else {
      // Add new tuning
      setCustomTuningsStorage((prevTunings) => [...prevTunings, customTuning]);
    }

    setShowTuningEditor(false);
    setEditingTuning(null);
  };

  const openTuningEditor = (tuning?: TuningPresetWithMetadata | null) => {
    setEditingTuning(tuning || null);
    setShowTuningEditor(true);
  };

  return (
    <div className="w-full space-y-6">
      <DataProvider
        customTunings={customTunings}
        openTuningEditor={openTuningEditor}
      >
        <GuitarNeck />
        <Configuration onDeleteCustomTuning={handleDeleteCustomTuning} />
      </DataProvider>

      {showTuningEditor && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${
            isDarkMode ? "bg-black/50" : "bg-white/50"
          }`}
          onClick={() => {
            setShowTuningEditor(false);
            setEditingTuning(null);
          }}
          role="presentation"
        >
          <div
            className={`rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <CustomTuningEditor
              initialTuning={editingTuning}
              onSaveTuning={handleSaveCustomTuning}
              onCancel={() => {
                setShowTuningEditor(false);
                setEditingTuning(null);
              }}
              customTunings={customTunings}
            />
          </div>
        </div>
      )}
    </div>
  );
}
