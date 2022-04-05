import { render, screen } from "@testing-library/react";
import Home from "@pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    // Render component we want to test
    render(<Home />);

    // Find an element
    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    // Assertion
    expect(heading).toBeInTheDocument();
  });
});
