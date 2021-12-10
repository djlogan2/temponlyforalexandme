import { Meteor } from "meteor/meteor";
import { EEmitterEvents } from "/client/data/hooks/useEventEmitter/events";
import ClientICCServer from "/imports/client/clienticcserver";
import CommonChat from "/imports/commonchat";
import Emitter from "/imports/emitter";
import { Tracker } from "meteor/tracker";
import { ChatRecord } from "../models/chatrecord";

export default class ClientChat extends CommonChat {
  static subscribe = (chatId: string): Tracker.Computation =>
    Tracker.autorun(() => {
      const sub = Meteor.subscribe("chat", chatId);
      const isReady = sub.ready();
      if (isReady) {
        const chats = ClientICCServer.collections.chat?.find().fetch();

        if (!chats) {
          return;
        }

        Emitter.emit(EEmitterEvents.CHAT_CHANGE, { isReady, chats });
      }
    });

  static create = (chat: ChatRecord): void => {
    ClientICCServer.collections.chat?.insert(chat);
  };
}
