import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from "@testing-library/react";
import { CustomTuningEditor } from "../app/guitar/CustomTuningEditor/CustomTuningEditor";
import { renderWithProviders } from "./test-utils";

describe("CustomTuningEditor", () => {
  it("renders with default values", () => {
    const onSaveMock = vi.fn();
    const onCancelMock = vi.fn();

    renderWithProviders(
      <CustomTuningEditor
        onSaveTuning={onSaveMock}
        onCancel={onCancelMock}
        initialTuning={null}
      />
    );

    // Check if the component renders with the default tuning name
    expect(screen.getByDisplayValue("Custom Tuning")).toBeInTheDocument();

    // Check if the save and cancel buttons are rendered
    expect(screen.getByText("Save Tuning")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("calls onCancel when cancel button is clicked", () => {
    const onSaveMock = vi.fn();
    const onCancelMock = vi.fn();

    renderWithProviders(
      <CustomTuningEditor
        onSaveTuning={onSaveMock}
        onCancel={onCancelMock}
        initialTuning={null}
      />
    );

    // Click the cancel button
    fireEvent.click(screen.getByText("Cancel"));

    // Check if onCancel was called
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });
});
