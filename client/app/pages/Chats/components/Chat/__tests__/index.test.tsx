import { render } from "@testing-library/react";
import React from "react";
import Chat from "..";

jest.mock("/imports/client/clienticcserver", () => ({
  getUserId: () => "test",
}));

jest.mock("/imports/client/clientMessages", () => ({
  setMessagesRead: () => {},
}));

describe("<Chat /> component", () => {
  test("Should display 'No messages yet...' when there are no messages ", async () => {
    const { getByText } = render(
      <Chat unreadMessagesCount={2} messages={[]} currentChatId="123" />,
    );

    expect(getByText("No messages yet...")).toBeInTheDocument();
  });
});
