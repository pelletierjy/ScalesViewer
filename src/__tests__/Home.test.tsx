import { describe, it, expect } from 'vitest';
import { screen } from "@testing-library/react";
import Home from "../app/page";
import { renderWithProviders } from "./test-utils";

describe("Home component", () => {
  it("renders correctly", () => {
    renderWithProviders(<Home />);

    // Check if loading text is displayed
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
