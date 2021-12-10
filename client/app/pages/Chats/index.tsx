import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import Chat from "./components/Chat";
import ChatsList from "./components/ChatsList";
import useEventEmitter from "/client/data/hooks/useEventEmitter";
import { EEmitterEvents } from "/client/data/hooks/useEventEmitter/events";
import ClientChat from "/imports/clientchat";

const chats = new Array(10).fill(0).map((_, i) => ({
  id: `${i}`,
  name: `Chat-${i}`,
}));

const messages = new Array(10).fill(0).map((_, i) => ({
  id: `${i}`,
  message: `Msg ${i}`,
  from: `${i % 2}`,
  createdAt: new Date().toISOString(),
}));

const Chats: FC<RouteComponentProps> = ({ history }) => {
  const { data } = useEventEmitter({
    event: EEmitterEvents.CHAT_CHANGE,
    tracker: () => ClientChat.subscribe("fake_chat_id"),
    shouldTrackerUnmount: true,
  });

  const { id } = useParams<{ id: string }>();
  const [selectedChat, setSelectedChat] =
    useState<{ id: string; name: string }>();

  useEffect(() => {
    // make a call to fetch chat
    const chat = chats.find((chat) => chat.id === id);
    setSelectedChat(chat);
  }, [id]);

  const onChooseChat = (id: string) => {
    history.push(`/chats/${id}`);
  };

  return (
    <div style={{ display: "flex" }}>
      <ChatsList currentChatId={id} onChooseChat={onChooseChat} chats={chats} />
      {selectedChat && <Chat messages={messages} />}
    </div>
  );
};

export default Chats;
