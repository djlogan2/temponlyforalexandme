import React from "react";
import { render } from "@testing-library/react";
import Message from "..";

describe("<Message /> component", () => {
  test("Should display message", () => {
    const { getByText } = render(<Message message="Test" from="123" />);

    expect(getByText("Test")).toBeInTheDocument();
  });
});
