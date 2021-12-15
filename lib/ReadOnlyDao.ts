import { Mongo } from "meteor/mongo";
import MongoCollection from "/lib/MongoCollection";
import {MongoFieldObject} from "/lib/MongoFieldObject";

export class ReadOnlyDao<T> extends MongoCollection<T> {
    // eslint-disable-next-line class-methods-use-this
    protected stopping(): void {
        // Nothing to do
    }

    // eslint-disable-next-line class-methods-use-this
    private fields(includeOrExclude: "include" | "exclude" | undefined, fields: [keyof T] | undefined): MongoFieldObject<T> | undefined {
        if (!fields) return;
        const fld: MongoFieldObject<T> = { fields: {} };
        fields.forEach((f) => {fld.fields[f] = includeOrExclude === "include";});
        return fld;
    }

    public readOne(selector: Mongo.Selector<T>, includeOrExclude: "include" | "exclude" | undefined, fields: [keyof T] | undefined): T | undefined {
        const fld = this.fields(includeOrExclude, fields);
        if (fld) return this.mongocollection.findOne(selector, fields);
        return this.mongocollection.findOne(selector);
    }

    public readMany(selector: Mongo.Selector<T>, includeOrExclude: "include" | "exclude" | undefined, fields: [keyof T] | undefined): T[] | undefined {
        const fld = this.fields(includeOrExclude, fields);
        if (fld) return this.mongocollection.find(selector, fields).fetch();
        return this.mongocollection.find(selector).fetch();
    }
}