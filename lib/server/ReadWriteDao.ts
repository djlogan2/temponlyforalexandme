import { Mongo } from "meteor/mongo";
import ReadOnlyDao from "/lib/ReadOnlyDao";

export default class ReadWriteDao<T> extends ReadOnlyDao<T> {
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
