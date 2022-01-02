import { Mongo } from "meteor/mongo";
import PooledEventEmitter from "/lib/PooledEventEmitter";
import ReactiveReadOnlyDao from "/lib/ReactiveReadOnlyDao";
import LoggerService from "/imports/server/service/LoggerService";

declare global {
    // eslint-disable-next-line vars-on-top, no-var
    var ICCServer: {
        server?: {
            services: {loggerservice?: LoggerService}
        },
        client?: {
            subscriptions: {[key: string]: PooledEventEmitter},
            dao: {[key: string]: ReactiveReadOnlyDao<any>}
        }
        collections: {[key: string]: Mongo.Collection<any>},
    };
}
