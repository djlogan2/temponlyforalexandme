import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import ClientICCServer from "../../../imports/client/clienticcserver";
import userEvent from "@testing-library/user-event";

jest.mock("../../../imports/client/clienticcserver", () => ({
  userId: jest.fn(),
}));

jest.mock("../../../imports/client/clientI18n", () => ({
  subscribe: () => {},
}));

describe("Home Component", () => {
  it("Should render home page ", () => {
    (ClientICCServer.getUserId as unknown as jest.Mock).mockImplementation(
      () => "exists",
    );
    const { getByText } = render(<App />);

    const btn = getByText("logout");

    expect(btn).toBeInTheDocument();
  });

  it("Should render login page", () => {
    (ClientICCServer.getUserId as unknown as jest.Mock).mockImplementation(
      () => "",
    );
    const { getByText } = render(<App />);

    expect(getByText("Dont have account? Register here")).toBeInTheDocument();
  });

  it("Navigates to register page", () => {
    (ClientICCServer.getUserId as unknown as jest.Mock).mockImplementation(
      () => "",
    );
    const { getByText } = render(<App />);

    const btn = getByText("Dont have account? Register here");

    userEvent.click(btn);

    expect(getByText("Have account? Login here")).toBeInTheDocument();
  });

  it("Navigates to login page back", () => {
    const { getByText } = render(<App />);

    const btn = getByText("Have account? Login here");

    userEvent.click(btn);

    expect(getByText("Dont have account? Register here")).toBeInTheDocument();
  });
});
