import { Mongo } from "meteor/mongo";
import PooledEventEmitter from "/lib/PooledEventEmitter";

declare global {
    // eslint-disable-next-line vars-on-top, no-var
    var ICCServer: {
        collections: {[key: string]: Mongo.Collection<any>},
        subscriptions: {[key: string]: PooledEventEmitter}
    };
}
