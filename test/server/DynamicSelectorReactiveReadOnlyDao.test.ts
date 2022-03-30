import * as chai from "chai";
import EventEmitter from "eventemitter3";
import { expect } from "chai";
import "../../lib/server/ICCGlobal";

// @ts-ignore
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";

interface TestRecord {
  _id: string;
  key1: number;
  key2: number;
  data: string;
}

class TestReactiveReadOnlyDao extends ReactiveReadOnlyDao<TestRecord> {
  public events = new EventEmitter();

  constructor() {
    super(null, "dynamicselectorreactivereadonlytest");
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

  protected stopping(): void {
    this.events.emit("onstop");
  }

  protected onReady(): void {
    this.events.emit("ready");
  }
}

describe("DynamicSelectorReactiveReadOnlyDao", function () {
  beforeEach(function (done) {
    if (!global.ICCServer.collections.dynamicselectorreactivereadonlytest)
      global.ICCServer.collections.dynamicselectorreactivereadonlytest =
        new Mongo.Collection<TestRecord>("dynamicselectorreactivereadonlytest");
    const collection = globalThis.ICCServer.utilities.getCollection(
      "dynamicselectorreactivereadonlytest",
    );
    const argh = Meteor.bindEnvironment((rec: any, callback: any) =>
      collection.insert(rec, callback),
    );
    resetDatabase(null, () => {
      const sigh: Promise<void>[] = [];
      const records = [
        { key1: 1, key2: 1, data: "rec1" },
        { key1: 1, key2: 1, data: "rec2" },
        { key1: 1, key2: 2, data: "rec3" },
        { key1: 1, key2: 2, data: "rec4" },
        { key1: 3, key2: 2, data: "rec5" },
        { key1: 3, key2: 2, data: "rec6" },
        { key1: 3, key2: 3, data: "rec7" },
        { key1: 3, key2: 3, data: "rec8" },
      ];
      records.forEach((rec) => {
        sigh.push(
          new Promise<void>((resolve) => {
            argh(rec, resolve);
          }),
        );
      });
      Promise.all(sigh).then(() => done());
    });
  });

  it("should call onRecordAdded when a record is added", function (done) {
    const dao = new TestReactiveReadOnlyDao();
    let records = [];
    dao.events.on("added", (id, record) => {
      expect(record.key1).to.equal(1);
      records.push(record);
    });

    dao.events.on("changed", () =>
      chai.assert.fail("Changed should not be called"),
    );
    dao.events.on("removed", () =>
      chai.assert.fail("Changed should not be called"),
    );

    //

    dao.events.on("ready", () => {
      expect(records.length).to.equal(4);
      records = [];
      const removed = [];
      dao.events.off("added");
      dao.events.off("ready");
      dao.events.off("removed");
      dao.events.on("removed", (rec) => removed.push(rec));
      dao.events.on("added", (id, record) => {
        expect(record.key1).to.equal(3);
        records.push(record);
      });
      dao.events.on("ready", () => {
        dao.events.removeAllListeners();
        expect(removed.length).to.equal(2);
        expect(records.length).to.equal(2);
        done();
      });
      dao.setSelector({ key2: 2 });
    });
    dao.setSelector({ key1: 1 });
  });
});
