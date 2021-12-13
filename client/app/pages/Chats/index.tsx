import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import ClientMessages from "../../../../imports/client/clientMessages";
import Chat from "./components/Chat";
import ChatForm from "./components/ChatForm";
import ChatsList from "./components/ChatsList";
import useEventEmitter from "/client/data/hooks/useEventEmitter";
import { EEmitterEvents } from "/client/data/hooks/useEventEmitter/events";
import ClientICCServer from "/imports/client/clienticcserver";
import { MessageRecord } from "/imports/models/messagerecord";

const useEventEmitterProps = {
  event: EEmitterEvents.MESSAGES_FETCH,
  tracker: () => ClientMessages.subscribe(),
  shouldTrackerUnmount: true,
};

const Chats: FC<RouteComponentProps> = ({ history }) => {
  const { id: currentChatId } = useParams<{ id: string }>();

  const { data } =
    useEventEmitter<{ isReady: boolean; messages: MessageRecord[] }>(
      useEventEmitterProps,
    );

  const [messages, setMessages] = useState<{ [key: string]: MessageRecord[] }>(
    {},
  );

  const [unreadMessages, setUnreadMessages] = useState<{
    [key: string]: number;
  }>({});

  const sendMessage = (content: string) => {
    const msg: MessageRecord = {
      content,
      creatorId: ClientICCServer.getUserId()!,
      chatId: currentChatId,
      read: false,
    };

    ClientMessages.create(msg);
  };

  useEffect(() => {
    if (data?.messages.length) {
      const messagesHash: { [key: string]: MessageRecord[] } = {};
      const unreadHash: { [key: string]: number } = {};
      const userId = ClientICCServer.getUserId();

      data.messages.forEach((msg) => {
        if (!msg.read && msg.creatorId !== userId) {
          unreadHash[msg.chatId] = (unreadHash[msg.chatId] || 0) + 1;
        }
      });

      data.messages.forEach((msg) => {
        const msgs = messagesHash[msg.chatId] || [];

        msgs.push(msg);

        messagesHash[msg.chatId] = [...msgs];
      });


      setMessages(messagesHash);
      setUnreadMessages(unreadHash);
    }
  }, [data]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "max-content" }}>
        <ChatsList
          currentChatId={currentChatId}
          history={history}
          unreadMessages={unreadMessages}
        />
      </div>

      {currentChatId && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            marginLeft: "5px",
            width: "100%",
          }}
        >
          <Chat messages={messages[currentChatId] || []} currentChatId={currentChatId} />
          <ChatForm sendMessage={sendMessage} />
        </div>
      )}
    </div>
  );
};

export default Chats;
