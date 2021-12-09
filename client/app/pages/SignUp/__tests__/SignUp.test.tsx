import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUp from "../SignUp";
import { inputs } from "../constants";
import { routeComponentPropsMock } from "../../../__mocks__/routeComponentPropsMock";

jest.mock("../../../../../imports/client/clienticcserver", () => ({
  createUser: (props: { callback: () => {} }) => {
    props.callback();
  },
}));

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("SignUp Component", () => {
  it("Should have title 'signup'", () => {
    const { getByRole } = render(<SignUp {...routeComponentPropsMock} />);
    expect(getByRole("heading", { level: 1 }).textContent).toBe("signup");
  });

  it("Should display labels", () => {
    const { getByText } = render(<SignUp {...routeComponentPropsMock} />);

    inputs.forEach((input) => {
      expect(getByText(input.label)).toBeInTheDocument();
    });
  });

  it("Should display input elements", () => {
    const { getByLabelText } = render(<SignUp {...routeComponentPropsMock} />);

    inputs.forEach((input) => {
      expect(getByLabelText(input.label)).toBeInTheDocument();
    });
  });

  it("Should contain button submit", () => {
    const { getByText } = render(<SignUp {...routeComponentPropsMock} />);
    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("Should contain text in inputs when it is written there", async () => {
    const { getByLabelText } = render(<SignUp {...routeComponentPropsMock} />);

    const el = getByLabelText(inputs[0].label) as HTMLInputElement;
    const mockText = "test";
    userEvent.type(el, mockText);

    await waitFor(() => {
      expect(el.value).toBe(mockText);
    });
  });

  it("Should submit form", async () => {
    const { getByLabelText, getByText } = render(
      <SignUp {...routeComponentPropsMock} />,
    );

    const email = getByLabelText(inputs[0].label);
    const username = getByLabelText(inputs[1].label);
    const password = getByLabelText(inputs[2].label);
    const confirmPassword = getByLabelText(inputs[3].label);

    userEvent.type(email, "test@gmail.com");
    userEvent.type(username, "test");
    userEvent.type(password, "test");
    userEvent.type(confirmPassword, "test");

    const btn = getByText("Submit");
    userEvent.click(btn);

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/");
    });
  });

  it("Should fire an onClick callback upon clicking login here button", async () => {
    const { getByText } = render(<SignUp {...routeComponentPropsMock} />);

    const btn = getByText("Have account? Login here");

    userEvent.click(btn);

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/login");
    });
  });
});
