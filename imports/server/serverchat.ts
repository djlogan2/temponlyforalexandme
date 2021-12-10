import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import ServerICCServer from "./servericcserver";
import CommonChat from "../commonchat";

declare const ICCServer: ServerICCServer;

export default class ServerChat extends CommonChat {}

Meteor.publish("chat", (chatId) => {
  check(chatId, String);

  if (!this.userId) return;

  return ICCServer?.collections?.chat?.findOne();
});

Meteor.startup(() => {
  if (Meteor.isTest || Meteor.isAppTest) {
    return;
  }

  const data = ICCServer.collections.chat?.findOne({ username: "test" });

  if (!data) {
    ICCServer.collections.chat?.insert({
      isolation_group: "isolation_group",
      issuer: {
        id: "string",
      },
      type: "chat",
      what: "yes",
      username: "test",
    });
  }
});
