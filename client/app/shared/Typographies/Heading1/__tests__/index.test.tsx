import React from "react";
import { render, screen } from "@testing-library/react";
import Heading1 from "..";

describe("<Heading1/>", () => {
  it("Should render content", () => {
    const text = "Heading1";
    render(<Heading1>{text}</Heading1>);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveTextContent(text);
  });
});
