import useEventEmitter from '/client/data/hooks/useEventEmitter';
import { EEmitterEvents } from '/client/data/hooks/useEventEmitter/events';
import ClientChat from '/imports/clientchat';
import React, { useState } from 'react';
import ChatForm, { IMessage } from './components/ChatForm';
import Message from './components/Message';

const messagesMock = [
  {
    id: 1,
    message: "Hello world!",
    from: "123",
  },
  {
    id: 2,
    message: "My message",
    from: "12",
  },
  {
    id: 3,
    message: "Bobby's message",
    from: "123",
  },
];

const Chat = () => {
  const { data } = useEventEmitter({
    event: EEmitterEvents.CHAT_CHANGE,
    tracker: () => ClientChat.subscribe("fake_chat_id"),
    shouldTrackerUnmount: true,
  })
  const [messages, setMessages] = useState(messagesMock);
  console.log(data);

  const sendMessage = (msg: IMessage) => {
    const newMessages = [...messages, msg];
    setMessages(newMessages);
  };

  return (
    <div style={{ width: "50vw" }}>
      <div style={{ height: "90vh", backgroundColor: "#000", padding: "10px" }}>
        {messages.map((msg) => (
          <Message key={msg.id} message={msg.message} from={msg.from} />
        ))}
      </div>
      <ChatForm sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
