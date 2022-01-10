import { Mongo } from "meteor/mongo";
import PooledEventEmitter from "/lib/PooledEventEmitter";
import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import LoggerService from "/imports/server/service/LoggerService";
import Stoppable from "/lib/Stoppable";
import CommonLogger from "/lib/CommonLogger";

declare global {
  var ICCServer: {
    server?: {
      services: { loggerservice?: LoggerService };
    };
    client?: {
      subscriptions: { [key: string]: PooledEventEmitter };
      dao: { [key: string]: ReactiveReadOnlyDao<any> };
    };
    collections: { [key: string]: Mongo.Collection<any> };
    utilities: {
      getLogger: (parent: Stoppable, identifier: string) => CommonLogger;
    };
  };
}
