// eslint-disable-next-line max-classes-per-file
import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";
import EventEmitter from "eventemitter3";
import { expect } from "chai";
// prepare-to-remove-ts-ignore
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Meteor } from "meteor/meteor";

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

class TestReactiveReadOnlyDao2 extends ReactiveReadOnlyDao<TestRecord> {
  public events = new EventEmitter();

  constructor() {
    super(null, "reactivereadonlydaotest");
    this.start({}, undefined, undefined);
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

Meteor.subscribe("reactivereadonlydaotest");

describe("ReactiveReadOnlyDao", function () {
  beforeEach(function (done) {
    resetDatabase(null, () => done());
  });

  it("should call onRecordAdded when a record is added", function (done) {
    // eslint-disable-next-line no-invalid-this
    this.timeout(10000);
    const dao = new TestReactiveReadOnlyDao();
    const fn = function (id: string, record: Partial<TestRecord>) {
      expect(id).to.equal("found1");
      expect(record).to.deep.equal({ data: "data1" });
      dao.events.off("added", fn);
      dao.stop();
      done();
    };
    dao.events.on("added", fn);
    Meteor.call("reactivereadonlydaotest", "add");
  });

  it("should call onRecordAdded when a record is changed", function (done) {
    const dao = new TestReactiveReadOnlyDao();
    const added = function () {
      Meteor.call("reactivereadonlydaotest", "change");
    };
    const fn = function (id: string, record: Partial<TestRecord>) {
      expect(id).to.equal("found1");
      expect(record).to.deep.equal({ data: "data3" });
      dao.events.off("changed", fn);
      dao.stop();
      done();
    };
    dao.events.on("added", added);
    dao.events.on("changed", fn);
    Meteor.call("reactivereadonlydaotest", "add");
  });

  it("should call onRecordAdded when a record is removed", function (done) {
    const dao = new TestReactiveReadOnlyDao2();
    const added = function () {
      Meteor.call("reactivereadonlydaotest", "change");
    };
    const change = function () {
      Meteor.call("reactivereadonlydaotest", "remove");
    };
    const fn = function (id: string) {
      expect(id).to.equal("found1");
      dao.events.off("removed", fn);
      dao.stop();
      done();
    };
    dao.events.on("added", added);
    dao.events.on("changed", change);
    dao.events.on("removed", fn);
    Meteor.call("reactivereadonlydaotest", "add");
  });
});
