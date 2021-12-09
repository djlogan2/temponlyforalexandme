import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import ServerICCServer from "./servericcserver";

declare const ICCServer: ServerICCServer;

Meteor.publish("chat", (chatId) => {
  check(chatId, String);

  if (!this.userId) return;

  return ICCServer?.collections?.chats?.find({ _id: chatId });
});
