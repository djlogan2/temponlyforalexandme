import { Mongo } from "meteor/mongo";

declare global {
    // eslint-disable-next-line vars-on-top, no-var
    var ICCServer: {collections: {[key: string]: Mongo.Collection<any>}, dao: {[key: string]: any}};
}

if (!global.ICCServer) global.ICCServer = { collections: {}, dao: {} };
