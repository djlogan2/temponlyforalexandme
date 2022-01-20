import { Meteor, Subscription } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import Stoppable from "/lib/Stoppable";
import ServerLogger from "/lib/server/ServerLogger";
import CommonLogger from "/lib/CommonLogger";
import { CollectionNames } from "/lib/CollectionNames";
import ServerUser from "/lib/server/ServerUser";
import ServerConnection from "/lib/server/ServerConnection";
import { SubscriptionNames } from "/lib/SubscriptionNames";

globalThis.ICCServer = {
  collections: {},
  services: {},
  utilities: {
    getLogger: (parent: Stoppable, identifier: string) =>
      new ServerLogger(parent, identifier) as CommonLogger,
    getCollection(collectionname: CollectionNames): Mongo.Collection<any> {
      if (!globalThis.ICCServer.collections[collectionname])
        throw new Meteor.Error("MISSING_COLLECTION");
      return globalThis.ICCServer.collections[
        collectionname
      ] as Mongo.Collection<any>;
    },
    getUser: (connection: Meteor.Connection | null): ServerUser | undefined => {
      if (!connection?.id) return undefined;
      return (
        globalThis.ICCServer?.services?.connectionservice?.getUser(
          connection.id,
        ) || undefined
      );
    },
    getConnection: (
      connection: Meteor.Connection | null,
    ): ServerConnection | undefined => {
      if (!connection?.id) return undefined;
      return (
        globalThis.ICCServer?.services?.connectionservice?.getConnection(
          connection.id,
        ) || undefined
      );
    },
    publish: (
      subscription: SubscriptionNames,
      fn: (this: Subscription, ...any: string[]) => void,
    ) => {
      Meteor.publish(subscription, fn);
    },
  },
};
