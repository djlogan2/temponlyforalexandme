import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import CommonICCServer from "./commoniccserver";

declare const ICCServer: CommonICCServer;

export default abstract class CommonChat {};

Meteor.startup(() => {
  if (!ICCServer.collections.chat) {
    ICCServer.collections.chat = new Mongo.Collection(
      "chat",
    );
  }
});
