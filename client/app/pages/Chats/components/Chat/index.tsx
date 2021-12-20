import _ from "lodash";
import React, { FC, useEffect, useRef, useState } from "react";
import Message from "./components/Message";
import NoMessages from "./components/NoMessages";
import usePrev from "/client/data/hooks/usePrev";
import ClientICCServer from "/zold/client/clienticcserver";
import ClientMessages from "/zold/client/clientMessages";
import { MessageRecord } from "/zold/models/messagerecord";

interface IChatProps {
  messages: MessageRecord[];
  currentChatId: string;
  unreadMessagesCount: number;
  chatRef: React.RefObject<HTMLDivElement>;
}

const DEBOUNCE_DELAY = 500;
const ALLOW_TO_SCROLL_MESSAGES_COUNT = 5;

const Chat: FC<IChatProps> = ({
  messages,
  currentChatId,
  unreadMessagesCount,
  chatRef = { current: null },
}) => {
  const prevId = usePrev(currentChatId);
  const [startWithMessage, setStartWithMessage] = useState<string>("");
  const seenMessages = useRef<string[]>([]);

  const userId = ClientICCServer.getUserId();

  useEffect(() => {
    const firstUnread = messages.find((msg) => !msg.read);

    const isMyMessage = firstUnread?.creatorId === userId;
    const isNewChat = prevId !== currentChatId;

    if (firstUnread && !isMyMessage && isNewChat) {
      setStartWithMessage(firstUnread._id!);
    }
  }, [messages, currentChatId, prevId]);

  useEffect(() => {
    if (chatRef.current) {
      if (
        !unreadMessagesCount ||
        unreadMessagesCount < ALLOW_TO_SCROLL_MESSAGES_COUNT
      ) {
        scrollDown();
      }
    }
  }, [unreadMessagesCount, chatRef.current, currentChatId]);

  useEffect(() => {
    if (!chatRef.current || !messages.length) {
      return;
    }

    const hasVerticalScrollbar =
      chatRef.current.scrollHeight > chatRef.current.clientHeight;

    if (!hasVerticalScrollbar) {
      onScroll();
    }
    const lastMessage = messages.at(-1);
    if (lastMessage?.creatorId === userId) {
      scrollDown();
    }
  }, [messages, chatRef]);

  const onScroll = _.debounce(() => {
    if (seenMessages.current.length) {
      const ids = [...new Set(seenMessages.current)];
      ClientMessages.setMessagesRead(ids);
      seenMessages.current = [];
    }
  }, DEBOUNCE_DELAY);

  const onChange = (id: string, creatorId: string) => {
    if (creatorId !== userId) {
      seenMessages.current.push(id);
    }
  };

  const scrollDown = () => {
    const container = chatRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }
  };

  return (
    <div
      ref={chatRef}
      style={{
        height: "95vh",
        padding: "10px",
        overflowY: "auto",
        position: "relative",
        scrollBehavior: "smooth",
      }}
      onScroll={onScroll}
    >
      {messages.length < 1 && <NoMessages />}
      {messages.map((msg) => (
        <Message
          key={msg._id}
          onChange={onChange}
          creatorId={msg.creatorId}
          id={msg._id!}
          message={msg.content}
          from={msg.creatorId}
          scrollToMe={startWithMessage === msg._id}
          read={msg.read}
        />
      ))}
    </div>
  );
};

export default Chat;
