import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import ReadOnlyDao from "/lib/ReadOnlyDao";
import Stoppable from "/lib/Stoppable";

export default class ReadWriteDao<T> extends ReadOnlyDao<T> {
    private boundinsert: (record: Mongo.OptionalId<T>) => string;

    private boundremove: (selector: Mongo.Selector<T>) => number;

    private boundupdate: (selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>) => number;

    private boundupsert: (selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>) => { numberAffected?: number | undefined; insertedId?: string | undefined; };

    /**
     *
     * @param{string} collection The name of the Mongo collection
     * @param{Stoppable | null} parent Our parent, if we have one
     */
    constructor(collection: string, parent: Stoppable | null) {
        super(collection, parent);
        this.boundinsert = Meteor.bindEnvironment((record: Mongo.OptionalId<T>) => this.mongocollection.insert(record));
        this.boundremove = Meteor.bindEnvironment((selector: Mongo.Selector<T>) => this.mongocollection.remove(selector));
        this.boundupdate = Meteor.bindEnvironment((selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>) => this.mongocollection.update(selector, modifier));
        this.boundupsert = Meteor.bindEnvironment((selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>) => this.mongocollection.upsert(selector, modifier));
    }

    /**
     * Standard mongo insert
     * @param{T} record
     * @return{string} The id of the inserted record
     */
    public insert(record: Mongo.OptionalId<T>): string {
        return this.boundinsert(record);
    }

    /**
     * Remove a mongo record by id
     * @param{string} id The id of the record to delete
     * @return{boolean} True if deleted
     */
    public remove(id: string): boolean {
        return this.boundremove({ _id: id } as Mongo.Selector<T>) === 1;
    }

    /**
     * Remove records using standard mongo selector
     * @param{Mongo.Selector} selector
     * @return{number} The number of records removed
     */
    public removeMany(selector: Mongo.Selector<T>): number {
        return this.boundremove(selector);
    }

    /**
     * Standard mongo update
     * @param{Mongo.Selector} selector Standard mongo selector
     * @param{Mongo.Modifier} modifier Standard mongo modifier
     * @return{number} The number of updated records
     */
    public update(selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>): number {
        return this.boundupdate(selector, modifier);
    }

    /**
     * Standard mongo update
     * @param{Mongo.Selector} selector Standard mongo selector
     * @param{Mongo.Modifier} modifier Standard mongo modifier
     * @return{ numberAffected?: number | undefined; insertedId?: string | undefined; } xxx
     */
    public upsert(selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>): { numberAffected?: number | undefined; insertedId?: string | undefined; } {
        return this.boundupsert(selector, modifier);
    }
}
