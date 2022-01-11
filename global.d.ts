/* eslint-disable no-var,vars-on-top */
// noinspection ES6ConvertVarToLetConst

import "meteor/meteor";
import { Mongo } from "meteor/mongo";
import LoggerService from "./imports/server/service/LoggerService";
import Stoppable from "./lib/Stoppable";
import ClientUser from "/lib/client/ClientUser";
import ClientConnection from "/lib/client/ClientConnection";
import ReadOnlyLoggerConfigurationDao from "/imports/client/dao/ReadOnlyLoggerConfigurationDao";
import PooledEventEmitter from "/lib/PooledEventEmitter";
import CommonUserDao from "/imports/dao/CommonUserDao";
import { CollectionNames } from "/lib/CollectionNames";
import { SubscriptionNames } from "/lib/SubscriptionNames";
import CommonLogger from "/lib/CommonLogger";
import UserService from "/imports/server/service/UserService";
import ClientServer from "/lib/client/ClientServer";
import SubscriptionService from "/imports/client/service/SubscriptionService";

declare module "meteor/universe:i18n";

declare module "meteor/xolvio:cleaner" {
  var resetDatabase: () => void;
}

declare module "meteor/meteor" {
  module Meteor {
    var connection: { _lastSessionId: string };
    var directStream: {
      onMessage: (
        fn: (
          this: { preventCallingMeteorHandler: () => void },
          message: string,
          session: string,
        ) => void,
      ) => void;
      send(sMessage: string, sConnection?: string): void;
    };
  }
}

declare global {
  /* The client stuff that will be in 'window' */
  var icc: ClientServer;
  var subscriptionservice: SubscriptionService;
  var loggerdao: ReadOnlyLoggerConfigurationDao;
  var Assets: any;
  var user: ClientUser;
  var connection: ClientConnection;
  var subscriptions: { [K in SubscriptionNames]?: PooledEventEmitter };
  var loggerconfigdao: ReadOnlyLoggerConfigurationDao;
  var userdao: CommonUserDao;
  /* Most of this is really server only, but some of it is used by both, most notably collections and utilities.getLogger */
  var ICCServer: {
    collections: { [K in CollectionNames]?: Mongo.Collection<any> };
    services: {
      loggerservice?: LoggerService;
      userservice?: UserService;
    };
    utilities: {
      getLogger: (parent: Stoppable, identifier: string) => CommonLogger;
      getCollection: (collectionname: CollectionNames) => Mongo.Collection<any>;
    };
  };
}
