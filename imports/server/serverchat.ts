import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import ServerICCServer from "./servericcserver";

declare const ICCServer: ServerICCServer;

Meteor.publish("chat", (chatId) => {
  check(chatId, String);

  if (!this.userId) return;

  return ICCServer?.collections?.chats?.findOne();
});

Meteor.startup(() => {
  if (Meteor.isTest || Meteor.isAppTest) {
    return;
  }

  const data = ICCServer.collections.chats?.findOne({ username: "test" });

  if (!data) {
    ICCServer.collections.chats?.insert({
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
