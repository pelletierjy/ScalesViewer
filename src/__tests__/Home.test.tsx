import { render } from "@testing-library/react";
import Home from "../app/page";

describe("Home component", () => {
  it("renders correctly", () => {
    render(<Home />);
    // Since Home returns null, we're just testing that it doesn't throw an error
    expect(true).toBe(true);
  });
});
