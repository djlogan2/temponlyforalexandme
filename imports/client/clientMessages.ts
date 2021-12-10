import { Meteor } from "meteor/meteor";
import { EEmitterEvents } from "/client/data/hooks/useEventEmitter/events";
import ClientICCServer from "/imports/client/clienticcserver";
import Emitter from "/imports/emitter";
import { Tracker } from "meteor/tracker";
import CommonMessages from "../commonmessages";
import { MessageRecord } from "../models/messagerecord";

export default class ClientMessages extends CommonMessages {
  static subscribe = (chatId: string): Tracker.Computation =>
    Tracker.autorun(() => {
      const sub = Meteor.subscribe("messages", chatId);
      const isReady = sub.ready();
      if (isReady) {
        const messages = ClientICCServer.collections.messages?.find().fetch();

        if (!messages) {
          return;
        }

        Emitter.emit(EEmitterEvents.MESSAGES_FETCH, { isReady, messages });
      }
    });

  static create = (message: MessageRecord): void => {
    Meteor.call("sendMessage", message);
  };

  static getMessages = (chatId: string) => {
    return ClientICCServer.collections.messages?.find({ chatId }).fetch();
  };
}
