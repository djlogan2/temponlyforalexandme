import { Mongo } from "meteor/mongo";
import MongoCollection from "/lib/MongoCollection";
import Selector = Mongo.Selector;

export default class ReadOnlyDao<T> extends MongoCollection<T> {
    protected fields(includeOrExclude: "include" | "exclude" | undefined, fields?: (keyof T)[]): null | Mongo.Options<T> {
        if (!fields) return null;
        const fld: Mongo.Options<T> = { fields: {} };
        fields.forEach((f) => {
          if (fld.fields) {
            fld.fields[f as string] = includeOrExclude === "include" ? 1 : 0;
          }
        });
        return fld;
    }

    /**
     * Retrieves a single record by id, or undefined if it does not exist.
     * @param{string} id
     * @return{T} A record or undefined
     */
    public get(id: string): T | undefined {
        return this.readOne({ _id: id } as Selector<T>, undefined, undefined);
    }

    /**
     * Reads a single record using a meteor mongo selector
     * @param{Mongo.Selector} selector The mongo selector
     * @param{"include"|"exclude"|undefined} includeOrExclude not specified, or whether to include or exclude the array of field names
     * @param{string[]} fields The array of field names (object keys) to include in this record or exclude from this record
     * @return{T} A located record or undefined
     */
    public readOne(selector: Mongo.Selector<T>, includeOrExclude?: "include" | "exclude", fields?: (keyof T)[]): T | undefined {
        const fld = this.fields(includeOrExclude, fields);
        if (fld) return this.mongocollection.findOne(selector, fld);
        return this.mongocollection.findOne(selector);
    }

    /**
     * Reads an array of records using a meteor mongo selector
     * @param{Mongo.Selector} selector The mongo selector
     * @param{"include"|"exclude"|undefined} includeOrExclude not specified, or whether to include or exclude the array of field names
     * @param{string[]} fields The array of field names (object keys) to include in this record or exclude from this record
     * @return{T[]} The array of located records, or an empty array
     */
    public readMany(selector: Mongo.Selector<T>, includeOrExclude?: "include" | "exclude", fields?: (keyof T)[]): T[] | undefined {
        const fld = this.fields(includeOrExclude, fields);
        if (fld) return this.mongocollection.find(selector, fld).fetch();
        return this.mongocollection.find(selector).fetch();
    }

    protected stopping(): void {
        // Nothing for us to stop here
    }
}
