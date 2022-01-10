/* eslint-disable no-var,vars-on-top */
// noinspection ES6ConvertVarToLetConst

import "meteor/meteor";
import {Mongo} from "meteor/mongo";
import LoggerService from "./imports/server/service/LoggerService";
import Stoppable from "./lib/Stoppable";
import ClientUser from "/lib/client/ClientUser";
import ClientConnection from "/lib/client/ClientConnection";
import ReadOnlyLoggerConfigurationDao from "/imports/client/dao/ReadOnlyLoggerConfigurationDao";
import PooledEventEmitter from "/lib/PooledEventEmitter";
import CommonUserDao from "/imports/dao/CommonUserDao";
import {CollectionNames} from "/lib/CollectionNames";
import {SubscriptionNames} from "/lib/SubscriptionNames";
import CommonLogger from "/lib/CommonLogger";

declare module "meteor/universe:i18n";

declare module "meteor/xolvio:cleaner" {
    var resetDatabase: () => void;
}

declare module "meteor/meteor" {
    module Meteor {
        var connection: {_lastSessionId: string};
        var directStream: {
            onMessage: (fn: (this: { preventCallingMeteorHandler: () => void }, message: string, session: string) => void) => void;
            send(sMessage: string, sConnection?: string): void;
        };
    }
}

declare global {
    var Assets: any;
    var user: ClientUser;
    var connection: ClientConnection;
    var subscriptions: { [K in SubscriptionNames]?: PooledEventEmitter };
    var loggerconfigdao: ReadOnlyLoggerConfigurationDao;
    var userdao: CommonUserDao;
    var ICCServer: {
        collections: { [K in CollectionNames]?: Mongo.Collection<any> };
        loggerservice?: LoggerService;
        utilities: {
            getLogger: (parent: Stoppable, identifier: string) => CommonLogger;
            getCollection: (collectionname: CollectionNames) => Mongo.Collection<any>,
        };
    };
}
