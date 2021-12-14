import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

type MongoFieldObject<P> = {fields: { [key in keyof P]?: boolean }};

const collections: {[key: string]: Mongo.Collection<any>} = {};

abstract class Stoppable {
    private children: Stoppable[] = [];

    protected abstract stopping(): void;

    constructor(parent: Stoppable) {
        parent.registerChild(this);
    }

    private registerChild(child: Stoppable): void {
        this.children.push(child);
    }

    public stop(): void {
        this.children.forEach((child) => child.stopping());
        this.stopping();
    }
}

export class ReadOnlyDao<T> {
    protected mongocollection: Mongo.Collection<T>;

    constructor(collection: string) {
        if (!collections[collection]) {collections[collection] = new Mongo.Collection<T>(collection);}
        this.mongocollection = collections[collection];
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

export abstract class ReactiveReadOnlyDao<T> extends Stoppable {
    protected mongocollection: Mongo.Collection<T>;

    private observehandle?: Meteor.LiveQueryHandle;

    constructor(parent: Stoppable, collection: string) {
        super(parent);
        if (!collections[collection]) {collections[collection] = new Mongo.Collection<T>(collection);}
        this.mongocollection = collections[collection];
    }

    // eslint-disable-next-line class-methods-use-this
    private fields(includeOrExclude: "include" | "exclude" | undefined, fields: [keyof T] | undefined): MongoFieldObject<T> | undefined {
        if (!fields) return;
        const fld: MongoFieldObject<T> = { fields: {} };
        fields.forEach((f) => {fld.fields[f] = includeOrExclude === "include";});
        return fld;
    }

    protected start(selector: Mongo.Selector<T>, includeOrExclude: "include" | "exclude" | undefined, fields: [keyof T] | undefined): void {
        const self = this;
        const fld = this.fields(includeOrExclude, fields);

        let cursor;

        if (fld) cursor = this.mongocollection.find(selector, fields);
        else cursor = this.mongocollection.find(selector);

        this.observehandle = cursor.observeChanges({
            added(id, doc) {self.onRecordAdded(id, doc);},
            changed(id, doc) {self.onFieldsChanged(id, doc);},
            removed(id) {self.onRecordRemoved(id);},
        });
    }

    protected stopping(): void {
        this.onStop();
        if (this.observehandle) this.observehandle.stop();
    }

    protected abstract onRecordAdded(id: string, record: Partial<T>): void;

    protected abstract onFieldsChanged(id: string, record: Partial<T>): void;

    protected abstract onRecordRemoved(id: string): void;

    protected abstract onStop(): void;
}

export class ReadWriteDao<T> extends ReadOnlyDao<T> {
    public insert(record: Mongo.OptionalId<T>): string {
        return this.mongocollection.insert(record);
    }

    public remove(id: string): boolean {
        return this.mongocollection.remove({ _id: id } as Mongo.Selector<T>) === 1;
    }

    public removeMany(selector: Mongo.Selector<T>): number {
        return this.mongocollection.remove(selector);
    }

    public update(selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>) {
        this.mongocollection.update(selector, modifier);
    }

    public upsert(selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>): { numberAffected?: number | undefined; insertedId?: string | undefined; } {
        return this.mongocollection.upsert(selector, modifier);
    }
}

export abstract class WritableReactiveDao<T> extends ReactiveReadOnlyDao<T> {
    public insert(record: Mongo.OptionalId<T>): string {
        return this.mongocollection.insert(record);
    }

    public remove(id: string): number {
        return this.mongocollection.remove({ _id: id } as Mongo.Selector<T>);
    }

    public update(selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>) {
        this.mongocollection.update(selector, modifier);
    }

    public upsert(selector: Mongo.Selector<T>, modifier: Mongo.Modifier<T>): { numberAffected?: number | undefined; insertedId?: string | undefined; } {
        return this.mongocollection.upsert(selector, modifier);
    }
}


class SomeService {
    private somedao: ReadOnlyDao<SomeRecord>;

    tell() {
        // on the server, we have to write to a writable dao
        // on the client, we have to do a meteor.call
    }
}
