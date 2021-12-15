import React from "react";
import { render } from "@testing-library/react";
import Message from "..";

jest.mock("/imports/client/clienticcserver", () => ({
  getUserId: () => "test",
}));

describe("<Message /> component", () => {
  test("Should display message", () => {
    const { getByText } = render(
      <Message
        message="Test"
        from="123"
        id="123"
        creatorId="12345"
        scrollToMe={false}
        read={false}
        onChange={() => {}}
      />,
    );

    expect(getByText("Test")).toBeInTheDocument();
  });
});
