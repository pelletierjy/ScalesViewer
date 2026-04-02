import { screen, fireEvent, waitFor } from "@testing-library/react";
import { Configuration } from "../app/guitar/Configuration/Configuration";
import { renderWithProviders } from "./test-utils";
import { DataProvider } from "../app/guitar/context";

// Mock window.confirm
const mockConfirm = jest.fn();
window.confirm = mockConfirm;

describe("Custom Tuning Deletion", () => {
  beforeEach(() => {
    mockConfirm.mockClear();
    // Clear localStorage
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should delete a custom tuning when confirmed", async () => {
    // Setup initial custom tunings
    const initialCustomTunings = [
      {
        name: "Test Tuning",
        strings: ["E", "A", "D", "G", "B", "E"] as const,
        description: "Test tuning",
        category: "Custom" as const,
      },
    ];

    // Set the custom tuning in localStorage
    localStorage.setItem("custom-tunings", JSON.stringify(initialCustomTunings));
    localStorage.setItem("current-scaleRoot", JSON.stringify(initialCustomTunings[0]));

    const { container } = renderWithProviders(
      <DataProvider>
        <Configuration />
      </DataProvider>
    );

    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Tuning (Custom)")).toBeInTheDocument();
    });

    // Mock confirm to return true (user clicks "OK")
    mockConfirm.mockReturnValue(true);

    // Click the delete button
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Verify confirm was called
    expect(mockConfirm).toHaveBeenCalledWith("Are you sure you want to delete this custom tuning?");

    // Wait for the tuning to be removed from the dropdown
    await waitFor(() => {
      const select = screen.getByDisplayValue("Standard (6)") as HTMLSelectElement;
      expect(select.value).toBe("Standard (6)");
    });

    // Wait for localStorage to be updated (debounced save)
    await waitFor(() => {
      const updatedTunings = JSON.parse(localStorage.getItem("custom-tunings") || "[]");
      expect(updatedTunings).toHaveLength(0);
    }, { timeout: 1000 }); // Increase timeout for debounced save
  });

  it("should not delete a custom tuning when cancelled", async () => {
    // Setup initial custom tunings
    const initialCustomTunings = [
      {
        name: "Test Tuning",
        strings: ["E", "A", "D", "G", "B", "E"] as const,
        description: "Test tuning",
        category: "Custom" as const,
      },
    ];

    // Set the custom tuning in localStorage
    localStorage.setItem("custom-tunings", JSON.stringify(initialCustomTunings));
    localStorage.setItem("current-scaleRoot", JSON.stringify(initialCustomTunings[0]));

    renderWithProviders(
      <DataProvider>
        <Configuration />
      </DataProvider>
    );

    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Tuning (Custom)")).toBeInTheDocument();
    });

    // Mock confirm to return false (user clicks "Cancel")
    mockConfirm.mockReturnValue(false);

    // Click the delete button
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Verify confirm was called
    expect(mockConfirm).toHaveBeenCalledWith("Are you sure you want to delete this custom tuning?");

    // Verify the tuning was NOT removed from the dropdown
    expect(screen.getByDisplayValue("Test Tuning (Custom)")).toBeInTheDocument();

    // Verify the tuning was NOT removed from localStorage
    const updatedTunings = JSON.parse(localStorage.getItem("custom-tunings") || "[]");
    expect(updatedTunings).toHaveLength(1);
    expect(updatedTunings[0].name).toBe("Test Tuning");
  });

  it("should reset to standard tuning when deleting the currently selected custom tuning", async () => {
    // Setup initial custom tunings
    const initialCustomTunings = [
      {
        name: "Test Tuning",
        strings: ["D", "A", "D", "G", "A", "D"] as const,
        description: "Test tuning",
        category: "Custom" as const,
      },
    ];

    // Set the custom tuning as current
    localStorage.setItem("custom-tunings", JSON.stringify(initialCustomTunings));
    localStorage.setItem("current-scaleRoot", JSON.stringify(initialCustomTunings[0]));

    renderWithProviders(
      <DataProvider>
        <Configuration />
      </DataProvider>
    );

    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Tuning (Custom)")).toBeInTheDocument();
    });

    // Mock confirm to return true
    mockConfirm.mockReturnValue(true);

    // Click the delete button
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Verify we switched to Standard tuning
    await waitFor(() => {
      expect(screen.getByDisplayValue("Standard (6)")).toBeInTheDocument();
    });

    // Wait for localStorage to be updated (debounced save)
    await waitFor(() => {
      const currentTuning = JSON.parse(localStorage.getItem("current-scaleRoot") || "{}");
      expect(currentTuning.name).toBe("Standard (6)");
    }, { timeout: 1000 }); // Increase timeout for debounced save
  });
});