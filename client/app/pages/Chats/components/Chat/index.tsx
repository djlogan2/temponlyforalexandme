import React, { FC, useEffect, useRef, useState } from "react";
import Message from "./components/Message";
import { MessageRecord } from "/imports/models/messagerecord";
import ClientICCServer from "/imports/client/clienticcserver";
import VisibilitySensor from "react-visibility-sensor";
import _ from "lodash";
import ClientMessages from "/imports/client/clientMessages";
import usePrev from "/client/data/hooks/usePrev";

interface IChatProps {
  messages: MessageRecord[];
  currentChatId: string;
}

const DEBOUNCE_DELAY = 500;

const Chat: FC<IChatProps> = ({ messages, currentChatId }) => {
  const prevId = usePrev(currentChatId);
  const containerRef = useRef<HTMLDivElement>(null);
  const [startWithMessage, setStartWithMessage] = useState<number | null>(null);
  const seenMessages = useRef<string[]>([]);

  const userId = ClientICCServer.getUserId();

  useEffect(() => {
    if (!messages.length) {
      return;
    }

    let firstUnreadIndex = -1;
    const firstUnread = messages.find((msg, i) => {
      firstUnreadIndex = i;
      return !msg.read;
    });

    const isMyMessage = firstUnread?.creatorId === userId;
    const isNewChat = prevId && prevId !== currentChatId;

    if (firstUnread && !isMyMessage && isNewChat) {
      setStartWithMessage(firstUnreadIndex);
    } else if (isMyMessage || !firstUnread) {
      const container = containerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight - container.clientHeight;
      }
    }
  }, [messages, currentChatId, prevId]);

  const onScroll = _.debounce(() => {
    if (seenMessages.current.length) {
      const ids = [...new Set(seenMessages.current)];
      ClientMessages.setMessagesRead(ids);
    }
  }, DEBOUNCE_DELAY);

  const onChange = (id: string, creatorId: string) => {
    if (creatorId !== userId) {
      seenMessages.current = [...seenMessages.current, id];
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: "95vh",
        padding: "10px",
        overflowY: "auto",
        position: "relative",
      }}
      onScroll={onScroll}
    >
      {!messages.length && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "30px",
          }}
        >
          No messages yet...
        </div>
      )}
      {messages.map((msg, i) => (
        <VisibilitySensor
          onChange={(visible) => visible && onChange(msg._id!, msg.creatorId)}
          key={msg._id}
          active={!msg.read}
        >
          <Message
            message={msg.content}
            from={msg.creatorId}
            scrollToMe={startWithMessage === i}
          />
        </VisibilitySensor>
      ))}
    </div>
  );
};

export default Chat;
