import { screen } from "@testing-library/react";
import React from "react";
import { Heading1 } from "..";
import { render } from "/client/app/test/test-utils";

describe("<Heading1/>", () => {
  it("Should render content", () => {
    const text = "Heading1";
    render(<Heading1>{text}</Heading1>);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveTextContent(text);
  });
});
