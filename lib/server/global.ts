import { Mongo } from "meteor/mongo";
import PooledEventEmitter from "/lib/PooledEventEmitter";
import ReactiveReadOnlyDao from "/lib/ReactiveReadOnlyDao";

declare global {
    // eslint-disable-next-line vars-on-top, no-var
    var ICCServer: {
        client?: {
            subscriptions: {[key: string]: PooledEventEmitter},
            dao: {[key: string]: ReactiveReadOnlyDao<any>}
        }
        collections: {[key: string]: Mongo.Collection<any>},
    };
}
