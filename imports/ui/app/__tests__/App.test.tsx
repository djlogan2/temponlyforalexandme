import React from "react";
import { render } from "@testing-library/react";

import App from "../App";

describe("Home Component", () => {
  it("Should render content property ", () => {
    const { getByText } = render(<App content={<div>Test</div>} />);

    expect(getByText("Test")).toBeInTheDocument();
  });
});
