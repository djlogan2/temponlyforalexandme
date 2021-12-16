import { Mongo } from "meteor/mongo";
import Singleton from "/lib/server/Singleton";

declare global {
    // eslint-disable-next-line vars-on-top, no-var
    var ICCServer: {
        collections: {[key: string]: Mongo.Collection<any>},
        dao: {[key: string]: any},
        singletons: {[key: string]: Singleton}
    };
}

if (!global.ICCServer) global.ICCServer = { collections: {}, dao: {}, singletons: {} };
