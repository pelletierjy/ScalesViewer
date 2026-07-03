/**
 * Tests for Flute page (T015)
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Flute from "@/app/flute/page";
import globalConfigReducer from "@/features/globalConfig/globalConfigSlice";
import audioReducer from "@/features/audio/audioSlice";

function createTestStore() {
  return configureStore({
    reducer: {
      globalConfig: globalConfigReducer,
      audio: audioReducer,
    },
  });
}

function renderWithProviders(ui: React.ReactElement) {
  const store = createTestStore();
  return render(<Provider store={store}>{ui}</Provider>);
}

describe("FlutePage (T015)", () => {
  it("renders 7 diagrams by default", () => {
    renderWithProviders(<Flute />);
    const diagrams = screen.getAllByRole("button");
    expect(diagrams).toHaveLength(7);
  });

  it("updates to 12 diagrams when note count changes to 12", () => {
    renderWithProviders(<Flute />);
    const select = screen.getByLabelText("Select number of notes to display");
    fireEvent.change(select, { target: { value: "12" } });
    const diagrams = screen.getAllByRole("button");
    expect(diagrams).toHaveLength(12);
  });

  it("updates to 3 diagrams when note count changes to 3", () => {
    renderWithProviders(<Flute />);
    const select = screen.getByLabelText("Select number of notes to display");
    fireEvent.change(select, { target: { value: "3" } });
    const diagrams = screen.getAllByRole("button");
    expect(diagrams).toHaveLength(3);
  });
});
