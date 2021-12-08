import React from "react";
import { render } from "@testing-library/react";

import Home from "../Home";

describe("Home Component", () => {
  it("Should have picture ", () => {
    const { getByAltText } = render(<Home />);

    expect(getByAltText("chess club")).toBeInTheDocument();
  });
});
