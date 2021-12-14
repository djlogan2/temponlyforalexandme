import { Meteor } from "meteor/meteor";
import { EEmitterEvents } from "/client/data/hooks/useEventEmitter/events";
import ClientICCServer from "/imports/client/clienticcserver";
import Emitter from "/zold/emitter";
import { Tracker } from "meteor/tracker";
import CommonMessages from "../../zold/commonmessages";
import { MessageRecord } from "../models/messagerecord";

export default class ClientMessages extends CommonMessages {
  static subscribe = (): Tracker.Computation =>
    Tracker.autorun(() => {
      const sub = Meteor.subscribe("messages");
      const isReady = sub.ready();
      if (isReady) {
        const messages = ClientICCServer.collections.messages?.find().fetch();

        if (!messages) {
          return;
        }

        const messagesHash: { [key: string]: MessageRecord[] } = {};
        const unreadMessagesHashCounter: { [key: string]: number } = {};
        const userId = ClientICCServer.getUserId();

        messages.forEach((msg) => {
          if (!msg.read && msg.creatorId !== userId) {
            unreadMessagesHashCounter[msg.chatId] =
              (unreadMessagesHashCounter[msg.chatId] || 0) + 1;
          }

          const msgs = messagesHash[msg.chatId] || [];
          msgs.push(msg);
          messagesHash[msg.chatId] = [...msgs];
        });

        Emitter.emit(EEmitterEvents.MESSAGES_FETCH, {
          isReady,
          messagesHash,
          unreadMessagesHashCounter,
        });
      }
    });

  static create = (message: MessageRecord): void => {
    Meteor.call("sendMessage", message);
  };

  static setMessagesRead = (ids: string[]): void => {
    Meteor.call("setMessagedRead", ids);
  };
}
