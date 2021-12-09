import React from "react";
import { render, waitFor } from "@testing-library/react";
import Chat from "..";
import userEvent from "@testing-library/user-event";

describe("<Chat /> component", () => {
  test("Should create message", async () => {
    const { getByPlaceholderText, getByText } = render(<Chat />);

    const input = getByPlaceholderText("Message...");
    const button = getByText("Send");

    userEvent.type(input, "Hello");
    userEvent.click(button);

    await waitFor(() => {
      expect(getByText("Hello")).toBeInTheDocument();
    });

    expect(getByPlaceholderText("Message...")).toBeInTheDocument();
  });
});
