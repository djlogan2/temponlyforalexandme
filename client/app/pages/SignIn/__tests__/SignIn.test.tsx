import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignIn from "../SignIn";
import { inputs } from "../constants";

describe("SignIn Component", () => {
  it("Should have title 'Signin page'", () => {
    const { getByRole } = render(<SignIn />);
    expect(getByRole("heading", { level: 1 }).textContent).toBe("Signin page");
  });

  it("Should display labels", () => {
    const { getByText } = render(<SignIn />);

    inputs.forEach((input) => {
      expect(getByText(input.label)).toBeInTheDocument();
    });
  });

  it("Should display input elements", () => {
    const { getByLabelText } = render(<SignIn />);

    inputs.forEach((input) => {
      expect(getByLabelText(input.label)).toBeInTheDocument();
    });
  });

  it("Should display placeholders", () => {
    const { getByPlaceholderText } = render(<SignIn />);

    inputs.forEach((input) => {
      expect(getByPlaceholderText(input.placeholder)).toBeInTheDocument();
    });
  });

  it("Should contain button submit", () => {
    const { getByText } = render(<SignIn />);
    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("Should contain text in inputs when it is written there", () => {
    const { getByLabelText } = render(<SignIn />);

    inputs.forEach((input) => {
      const el = getByLabelText(input.label) as HTMLInputElement;

      userEvent.type(el, input.label);

      expect(el.value).toBe(input.label);
    });
  });
});
