import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUp from "../SignUp";
import { inputs } from "../constants";

describe("SignUp Component", () => {
  it("Should have title 'Signup page'", () => {
    const { getByRole } = render(<SignUp />);
    expect(getByRole("heading", { level: 1 }).textContent).toBe("Signup page");
  });

  it("Should display labels", () => {
    const { getByText } = render(<SignUp />);

    inputs.forEach((input) => {
      expect(getByText(input.label)).toBeInTheDocument();
    });
  });

  it("Should display input elements", () => {
    const { getByLabelText } = render(<SignUp />);

    inputs.forEach((input) => {
      expect(getByLabelText(input.label)).toBeInTheDocument();
    });
  });

  it("Should display placeholders", () => {
    const { getByPlaceholderText } = render(<SignUp />);

    inputs.forEach((input) => {
      expect(getByPlaceholderText(input.placeholder)).toBeInTheDocument();
    });
  });

  it("Should contain button submit", () => {
    const { getByText } = render(<SignUp />);
    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("Should contain text in inputs when it is written there", () => {
    const { getByLabelText } = render(<SignUp />);

    inputs.forEach((input) => {
      const el = getByLabelText(input.label) as HTMLInputElement;

      userEvent.type(el, input.label);

      expect(el.value).toBe(input.label);
    });
  });
});
