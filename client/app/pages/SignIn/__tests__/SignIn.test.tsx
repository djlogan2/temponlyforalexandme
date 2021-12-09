import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignIn from "../SignIn";
import { inputs } from "../constants";
import { routeComponentPropsMock } from "../../../__mocks__/routeComponentPropsMock";

jest.mock("../../../../../imports/client/clienticcserver", () => ({
  loginWithPassword: (props: { callback: () => {} }) => {
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

describe("SignIn Component", () => {
  it("Should have title 'login'", () => {
    const { getByRole } = render(<SignIn {...routeComponentPropsMock} />);
    expect(getByRole("heading", { level: 1 }).textContent).toBe("login");
  });

  it("Should display labels", () => {
    const { getByText } = render(<SignIn {...routeComponentPropsMock} />);

    inputs.forEach((input) => {
      expect(getByText(input.label)).toBeInTheDocument();
    });
  });

  it("Should display input elements", () => {
    const { getByLabelText } = render(<SignIn {...routeComponentPropsMock} />);

    inputs.forEach((input) => {
      expect(getByLabelText(input.label)).toBeInTheDocument();
    });
  });

  it("Should contain button submit", () => {
    const { getByText } = render(<SignIn {...routeComponentPropsMock} />);
    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("Should contain text in inputs when it is written there", async () => {
    const { getByLabelText } = render(<SignIn {...routeComponentPropsMock} />);

    const el = getByLabelText(inputs[0].label) as HTMLInputElement;
    const mockText = "test";
    userEvent.type(el, mockText);

    await waitFor(() => {
      expect(el.value).toBe(mockText);
    });
  });

  it("Should submit form", async () => {
    const { getByLabelText, getByText } = render(
      <SignIn {...routeComponentPropsMock} />,
    );

    const email = getByLabelText(inputs[0].label);
    const password = getByLabelText(inputs[1].label);

    userEvent.type(email, "test@gmail.com");
    userEvent.type(password, "test");

    const btn = getByText("Submit");
    userEvent.click(btn);

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/");
    });
  });

  it("Should fire an onClick callback upon clicking login here button", async () => {
    const { getByText } = render(<SignIn {...routeComponentPropsMock} />);

    const btn = getByText("Dont have account? Register here");

    userEvent.click(btn);

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/register");
    });
  });
});
