import { ChatRecord } from '/zold/models/chatrecord';
import { Meteor } from "meteor/meteor";
import ServerICCServer from "../../imports/server/servericcserver";
import CommonChat from "../commonchat";

declare const ICCServer: ServerICCServer;

export default class ServerChat extends CommonChat {
  public static createChat(chat: ChatRecord) {
    ICCServer.collections.chat?.insert(chat);
  }
}

Meteor.publish("chat", () => {
  return ICCServer.collections.chat?.find();
});

Meteor.methods({
  createChat: ServerChat.createChat,
})
