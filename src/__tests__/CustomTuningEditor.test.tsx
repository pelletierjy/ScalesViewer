import { render, screen, fireEvent } from "@testing-library/react";
import { CustomTuningEditor } from "../app/guitar/CustomTuningEditor/CustomTuningEditor";
import { selectIsDarkMode } from "@/features/globalConfig/globalConfigSlice";

// Mock the Redux store
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

// Mock the selectIsDarkMode selector
jest.mock("@/features/globalConfig/globalConfigSlice", () => ({
  selectIsDarkMode: jest.fn(),
}));

describe("CustomTuningEditor", () => {
  beforeEach(() => {
    // Mock the useSelector to return false for dark mode
    (selectIsDarkMode as jest.Mock).mockReturnValue(false);
  });

  it("renders with default values", () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();

    render(
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
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();

    render(
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
