import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import ReadOnlyDao from "/lib/ReadOnlyDao";
import Stoppable from "/lib/Stoppable";

export default class ReadWriteDao<T> extends ReadOnlyDao<T> {
    private boundinsert: (record: Mongo.OptionalId<T>) => string;

    private boundremove: (selector: Mongo.Selector<T>) => number;

    private boundupdate: (selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>) => number;

    private boundupsert: (selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>) => { numberAffected?: number | undefined; insertedId?: string | undefined; };

    constructor(collection: string, parent: Stoppable | null) {
        super(collection, parent);
        this.boundinsert = Meteor.bindEnvironment((record: Mongo.OptionalId<T>) => this.mongocollection.insert(record));
        this.boundremove = Meteor.bindEnvironment((selector: Mongo.Selector<T>) => this.mongocollection.remove(selector));
        this.boundupdate = Meteor.bindEnvironment((selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>) => this.mongocollection.update(selector, modifier));
        this.boundupsert = Meteor.bindEnvironment((selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>) => this.mongocollection.upsert(selector, modifier));
    }

    public insert(record: Mongo.OptionalId<T>): string {
        return this.boundinsert(record);
    }

    public remove(id: string): boolean {
        return this.boundremove({ _id: id } as Mongo.Selector<T>) === 1;
    }

    public removeMany(selector: Mongo.Selector<T>): number {
        return this.boundremove(selector);
    }

    public update(selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>): number {
        return this.boundupdate(selector, modifier);
    }

    public upsert(selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>): { numberAffected?: number | undefined; insertedId?: string | undefined; } {
        return this.boundupsert(selector, modifier);
    }
}
