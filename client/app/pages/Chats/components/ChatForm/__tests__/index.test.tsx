import React from "react";
import { render, waitFor } from "@testing-library/react";
import ChatForm from "..";
import userEvent from "@testing-library/user-event";

describe("<ChatForm /> component", () => {
  test("Should display input", () => {
    const { getByPlaceholderText } = render(
      <ChatForm sendMessage={() => {}} />,
    );

    expect(getByPlaceholderText("Message...")).toBeInTheDocument();
  });

  test("Should display button", () => {
    const { getByText } = render(<ChatForm sendMessage={() => {}} />);

    expect(getByText("Send")).toBeInTheDocument();
  });

  test("Should call sendMessage callback upon button click", async () => {
    const sendMessageMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <ChatForm sendMessage={sendMessageMock} />,
    );

    const input = getByPlaceholderText("Message...") as HTMLInputElement;
    const button = getByText("Send");

    userEvent.type(input, "Message");
    userEvent.click(button);

    await waitFor(() => {
      expect(sendMessageMock).toHaveBeenCalled();
      expect(input.value.length).toBe(0);
    });
  });
});
