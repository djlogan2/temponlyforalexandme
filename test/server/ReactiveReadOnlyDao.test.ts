import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import EventEmitter from "eventemitter3";
import { expect } from "chai";
// prepare-to-remove-ts-ignore
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

interface TestRecord {
    _id: string;
    data: string;
}
class TestReactiveReadOnlyDao extends ReactiveReadOnlyDao<TestRecord> {
    public events = new EventEmitter();

    constructor() {
        super(null, "reactivereadonlydaotest");
        this.start({}, "include", ["data"]);
    }

    protected onFieldsChanged(id: string, record: Partial<TestRecord>): void {
        this.events.emit("changed", id, record);
    }

    protected onRecordAdded(id: string, record: Partial<TestRecord>): void {
        this.events.emit("added", id, record);
    }

    protected onRecordRemoved(id: string): void {
        this.events.emit("removed", id);
    }

    protected onStop(): void {
        this.events.emit("onstop");
    }
}

function remotedb(what: string) {
    switch (what) {
    case "add":
        return new Promise<void>((resolve, reject) => {
            globalThis.ICCServer.utilities.getCollection("reactivereadonlydaotest").insert({ _id: "found1", data: "data1" }, (err: any) => {if (err) reject(err); else resolve();});
        });
    case "change":
        return new Promise<void>((resolve, reject) => {
            globalThis.ICCServer.utilities.getCollection("reactivereadonlydaotest").update({ _id: "found1" }, { $set: { data: "data3" } }, undefined, (err: any) => {if (err) reject(err); else resolve();});
        });
    case "remove":
        return new Promise<void>((resolve, reject) => {
            globalThis.ICCServer.utilities.getCollection("reactivereadonlydaotest").remove({ _id: "found1" }, (err: any) => {if (err) reject(err); else resolve();});
        });
    default:
        return Promise.reject(new Error("Unknown case"));
    }
}

function setdb(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        globalThis.ICCServer.utilities.getCollection("reactivereadonlydaotest").insert({ _id: "found1", data: "data1" }, (err: any) => {
            if (err) {reject(err); return;}
            globalThis.ICCServer.utilities.getCollection("reactivereadonlydaotest").update({ _id: "found1" }, { $set: { data: "data3" } }, undefined, (err2: any) => {
                if (err2) {reject(err2); return;}
                globalThis.ICCServer.utilities.getCollection("reactivereadonlydaotest").remove({ _id: "found1" }, (err3: any) => {
                    if (err3) reject(err3); else {
                        resolve();
                    }
                });
            });
        });
    });
}

if (!global.ICCServer.collections.readonlydaotest) global.ICCServer.collections.reactivereadonlydaotest = new Mongo.Collection<TestRecord>("reactivereadonlydaotest");

Meteor.publish("reactivereadonlydaotest", () => globalThis.ICCServer.utilities.getCollection("reactivereadonlydaotest").find());

Meteor.methods({
    reactivereadonlydaotest: remotedb,
});

describe("ReactiveReadOnlyDao", function() {
    beforeEach(function(done) {
        resetDatabase(null, () => done());
    });

    it("should call onRecordAdded when a record is added", function(done) {
        const dao = new TestReactiveReadOnlyDao();
        const fn = function(id: string, record: Partial<TestRecord>) {
            expect(id).to.equal("found1");
            expect(record).to.deep.equal({ data: "data1" });
            dao.events.off("added", fn);
            dao.stop();
            done();
        };
        dao.events.on("added", fn);
        setdb();
    });

    it("should call onRecordAdded when a record is changed", function(done) {
        const dao = new TestReactiveReadOnlyDao();
        const fn = function(id: string, record: Partial<TestRecord>) {
            expect(id).to.equal("found1");
            expect(record).to.deep.equal({ data: "data3" });
            dao.events.off("changed", fn);
            dao.stop();
            done();
        };
        dao.events.on("changed", fn);
        setdb();
    });

    it("should call onRecordAdded when a record is removed", function(done) {
        const dao = new TestReactiveReadOnlyDao();
        const fn = function(id: string) {
            expect(id).to.equal("found1");
            dao.events.off("removed", fn);
            dao.stop();
        };
        dao.events.on("removed", fn);
        setdb();
        done();
    });
});
