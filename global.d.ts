/* eslint-disable no-var,vars-on-top */
// noinspection ES6ConvertVarToLetConst

import { Mongo } from "meteor/mongo";
import LoggerService from "./imports/server/service/LoggerService";
import Stoppable from "./lib/Stoppable";
import ClientUser from "/lib/client/ClientUser";
import ClientConnection from "/lib/client/ClientConnection";
import ReadOnlyLoggerConfigurationDao from "/imports/client/dao/ReadOnlyLoggerConfigurationDao";
import PooledEventEmitter from "/lib/client/PooledEventEmitter";
import { CollectionNames } from "/lib/CollectionNames";
import { SubscriptionNames } from "/lib/SubscriptionNames";
import CommonLogger from "/lib/logger/CommonLogger";
import ClientServer from "/lib/client/ClientServer";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import Clienti18n from "/lib/client/Clienti18n";
import ClientTheme from "/lib/client/ClientTheme";
import GlobalGame from "/lib/server/game/GlobalGame";

declare module "meteor/universe:i18n";

declare module "meteor/xolvio:cleaner" {
  var resetDatabase: () => void;
}

declare module "react" {
  type TToken = {
    token: string;
    args: string[];
  };

  type TRequiredComponentProps = {
    keyboardFunctions: { [key: string]: void }[];
    token: TToken;
    classes: string[];
  };
  type FCICC<P = {}> = FunctionComponent<P & TRequiredComponentProps>;
}

declare module "meteor/meteor" {
  // eslint-disable-next-line @typescript-eslint/no-shadow
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
  var DDP: { onReconnect: (fn: () => void) => void };
  /* The client stuff that will be in 'window' */
  var icc: ClientServer;
  var i18n: Clienti18n;
  var theme: ClientTheme;
  var subscriptionservice: SubscriptionService;
  var Assets: any;
  var cuser: ClientUser;
  var userlist: { [id: string]: ClientUser };
  var connection: ClientConnection;
  var subscriptions: { [K in SubscriptionNames]?: PooledEventEmitter<any> };
  var loggerconfigdao: ReadOnlyLoggerConfigurationDao;
  var userdao: CommonReadOnlyUserDao;
  /* Most of this is really server only, but some of it is used by both, most notably collections and utilities.getLogger */
  var ICCServer: {
    connections: { [key: string]: ServerConnection };
    collections: { [K in CollectionNames]?: Mongo.Collection<any> };
    games: { [id: string]: GlobalGame };
    services: {
      loggerservice?: LoggerService;
    };
    utilities: {
      getLogger: (parent: Stoppable, identifier: string) => CommonLogger;
      getCollection: (collectionname: CollectionNames) => Mongo.Collection<any>;
    };
  };
}
