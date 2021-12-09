import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { routeComponentPropsMock } from "../../../__mocks__/routeComponentPropsMock";

import Home from "../Home";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock("../../../../../imports/client/clienticcserver", () => ({
  logout: (callback: () => void) => {
    callback();
  },
}));

describe("Home Component", () => {
  it("Should render picture ", () => {
    const { getByAltText } = render(<Home {...routeComponentPropsMock} />);

    expect(getByAltText("chess club")).toBeInTheDocument();
  });

  it("Should render button", () => {
    const { getByText } = render(<Home {...routeComponentPropsMock} />);

    expect(getByText("logout")).toBeInTheDocument();
  });

  it("Should call logout upon clicking button", () => {
    const { getByText } = render(<Home {...routeComponentPropsMock} />);

    userEvent.click(getByText("logout"));
    expect(mockHistoryPush).toHaveBeenCalledWith("/login");
  });
});
