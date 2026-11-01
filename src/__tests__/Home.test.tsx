import { screen } from "@testing-library/react";
import Home from "../app/page";
import { createTestStore, renderWithProviders } from "./test-utils";
import { setInstrument } from "@/features/globalConfig/globalConfigSlice";

jest.mock("@/lib/hooks/usePlayNote", () => ({
  usePlayNote: () => jest.fn(),
}));

/**
 * The root route ("/") is served as a static document for every URL that
 * doesn't name an instrument. It must always show an instrument — the saved
 * one once the store has initialised, the default one before that — never a
 * bare spinner, so a stalled/failed redirect can't leave a blank app behind.
 */
describe("Home component (root route, no instrument in the URL)", () => {
  it("renders the default instrument instead of a loading spinner", () => {
    renderWithProviders(<Home />);

    // defaultInstrument === "flute"; this control only exists in the flute view.
    expect(
      screen.getByLabelText("Select number of notes to display")
    ).toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("renders the selected instrument once the store has one", () => {
    const store = createTestStore();
    store.dispatch(setInstrument("guitar"));

    renderWithProviders(<Home />, { store });

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("Select number of notes to display")
    ).not.toBeInTheDocument();
    // Guitar-specific affordance from the guitar neck.
    expect(screen.getByLabelText("String enable toggles")).toBeInTheDocument();
  });
});