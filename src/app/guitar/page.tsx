"use client";
import React, { useState, useEffect } from "react";
import { GuitarNeck } from "./GuitarNeck/GuitarNeck";
import { getCustomTunings, getTuning } from "@/app/guitar/tunings";
import { CustomTuningEditor } from "./CustomTuningEditor/CustomTuningEditor";
import { TuningPreset } from "./types/tuningPreset";
import { Configuration } from "./Configuration/Configuration";
import { DataProvider } from "./context";
import { TuningPresetWithMetadata } from "./tuningConstants";

export default function Guitar() {
  const [editingTuning, setEditingTuning] =
    useState<TuningPresetWithMetadata | null>(null);
  const [showCustomTuning, setShowCustomTuning] = useState(false);
  const [customTunings, setCustomTunings] =
    useState<TuningPresetWithMetadata[]>(getCustomTunings);
  const [scaleRoot, setScaleRoot] = useState<TuningPreset>(getTuning());

  // Save custom tunings to localStorage when they change
  useEffect(() => {
    // Skip during server-side rendering or when window is not available
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("custom-tunings", JSON.stringify(customTunings));
      } catch (e) {
        console.error("Failed to save custom tunings:", e);
      }
    }
  }, [customTunings]);

  useEffect(() => {
    localStorage.setItem("current-scaleRoot", JSON.stringify(scaleRoot));
  }, [scaleRoot]);

  const handleSaveCustomTuning = (newTuning: TuningPreset) => {
    const customTuning: TuningPresetWithMetadata = {
      ...newTuning,
      description: `Custom ${newTuning.strings.length}-string scaleRoot`,
      stringCount: newTuning.strings.length,
      category: "Special",
    };

    if (editingTuning) {
      setCustomTunings((prevTunings) =>
        prevTunings.map((t) =>
          t.name === editingTuning.name ? customTuning : t
        )
      );
    } else {
      setCustomTunings((prevTunings) => [...prevTunings, customTuning]);
    }

    setScaleRoot(customTuning);
    setShowCustomTuning(false);
    setEditingTuning(null);
  };

  return (
    <div className="w-full space-y-6">
      <DataProvider>
        <GuitarNeck scaleRoot={scaleRoot} />
        <Configuration
          scaleRoot={scaleRoot}
          customTunings={customTunings}
          setEditingTuning={setEditingTuning}
          setCustomTunings={setCustomTunings}
          setScaleRoot={setScaleRoot}
          setShowCustomTuning={setShowCustomTuning}
        />
        {showCustomTuning && (
          <div className="mt-4">
            <CustomTuningEditor
              initialTuning={editingTuning}
              onSaveTuning={handleSaveCustomTuning}
              onCancel={() => {
                setShowCustomTuning(false);
                setEditingTuning(null);
              }}
            />
          </div>
        )}
      </DataProvider>
    </div>
  );
}
