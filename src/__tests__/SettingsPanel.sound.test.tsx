/**
 * Spec: specs/instrument-audio/spec.md — FR-006
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import globalConfigReducer, {
  initialState as globalConfigInitialState,
} from "@/features/globalConfig/globalConfigSlice";
import audioReducer from "@/features/audio/audioSlice";
import applicationReducer from "@/features/application/applicationSlice";
import selectedNoteReducer from "@/features/selectedNote/selectedNoteSlice";
import { SettingsPanel } from "@/features/settings/components/SettingsPanel";

jest.mock("@/features/settings/hooks/useSettingsManager", () => ({
  useSettingsManager: () => ({
    error: null,
    clearError: jest.fn(),
    exportSettings: jest.fn(),
    importSettings: jest.fn(),
    resetSettings: jest.fn(),
    isExporting: false,
    isImporting: false,
    isResetting: false,
  }),
}));

function renderPanel(soundEngine: "sample" | "synth" | "sine" = "sample") {
  const store = configureStore({
    reducer: {
      globalConfig: globalConfigReducer,
      audio: audioReducer,
      applicationState: applicationReducer,
      selectedNote: selectedNoteReducer,
    },
    preloadedState: {
      globalConfig: {
        ...globalConfigInitialState,
        soundEngine,
      },
    },
  });

  return render(
    <Provider store={store}>
      <SettingsPanel isOpen onClose={jest.fn()} />
    </Provider>
  );
}

describe("SettingsPanel Sound section (FR-006)", () => {
  it("shows playback engine options", () => {
    renderPanel();
    expect(screen.getByLabelText(/playback engine/i)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /instrument samples/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /pluck synth/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /classic sine/i })).toBeInTheDocument();
  });

  it("updates soundEngine when selection changes", () => {
    renderPanel();
    const select = screen.getByLabelText(/playback engine/i);
    fireEvent.change(select, { target: { value: "sine" } });
    expect(select).toHaveValue("sine");
  });
});
