import { Mongo } from "meteor/mongo";
import MongoCollection from "/lib/MongoCollection";
import Selector = Mongo.Selector;

export default class ReadOnlyDao<T> extends MongoCollection<T> {
    // eslint-disable-next-line class-methods-use-this
    protected fields(includeOrExclude: "include" | "exclude" | undefined, fields?: (keyof T)[]): null | Mongo.Options<T> {
        if (!fields) return null;
        const fld: Mongo.Options<T> = { fields: {} };
        fields.forEach((f) => {
            // TODO: Why does typescript say fld.fields might be undefined????
            // @ts-ignore
            fld.fields[(f as string)] = includeOrExclude === "include" ? 1 : 0;
        });
        return fld;
    }

    public get(id: string): T | undefined {
        return this.readOne({ _id: id } as Selector<T>, undefined, undefined);
    }

    public readOne(selector: Mongo.Selector<T>, includeOrExclude?: "include" | "exclude", fields?: (keyof T)[]): T | undefined {
        const fld = this.fields(includeOrExclude, fields);
        if (fld) return this.mongocollection.findOne(selector, fld);
        return this.mongocollection.findOne(selector);
    }

    public readMany(selector: Mongo.Selector<T>, includeOrExclude?: "include" | "exclude", fields?: (keyof T)[]): T[] | undefined {
        const fld = this.fields(includeOrExclude, fields);
        if (fld) return this.mongocollection.find(selector, fld).fetch();
        return this.mongocollection.find(selector).fetch();
    }
}
