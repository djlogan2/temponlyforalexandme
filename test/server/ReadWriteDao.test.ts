import { expect } from "chai";
// @ts-ignore
import { resetDatabase } from "meteor/xolvio:cleaner";
import ReadWriteDao from "/imports/server/dao/ReadWriteDao";

interface TestRecord {
    _id: string;
    data: string;
    upsertkey?: string;
}

describe("ReadWriteDao", function() {
    beforeEach(function(done) {
        resetDatabase(null, () => done());
    });

    describe("insert", function() {
        it("should work", function() {
            const dao = new ReadWriteDao<TestRecord>("readwritedaotest", null);
            const id = dao.insert({ data: "somedata" });
            expect(global.ICCServer.collections.readwritedaotest.findOne()).to.deep.equal({ _id: id, data: "somedata" });
        });
    });

    describe("remove", function() {
        it("should work", function() {
            const dao = new ReadWriteDao<TestRecord>("readwritedaotest", null);
            const id = dao.insert({ data: "somedata" });
            expect(global.ICCServer.collections.readwritedaotest.findOne()).to.deep.equal({ _id: id, data: "somedata" });
            dao.remove(id);
            expect(global.ICCServer.collections.readwritedaotest.findOne()).to.be.undefined;
        });
    });

    describe("removeMany", function() {
        it("should work", function() {
            const dao = new ReadWriteDao<TestRecord>("readwritedaotest", null);
            const ids = [];
            for (let x = 0; x < 10; x += 1) {
                ids.push(dao.insert({ data: "somedata" }));
            }
            expect(global.ICCServer.collections.readwritedaotest.find().count()).to.equal(10);
            dao.removeMany({ _id: { $in: ids.slice(0, 5) } });
            expect(global.ICCServer.collections.readwritedaotest.find().count()).to.equal(5);
        });
    });

    describe("update", function() {
        it("should work", function() {
            const dao = new ReadWriteDao<TestRecord>("readwritedaotest", null);
            const id = dao.insert({ data: "somedata" });
            expect(global.ICCServer.collections.readwritedaotest.findOne()).to.deep.equal({ _id: id, data: "somedata" });
            dao.update({ data: "somedata" }, { $set: { data: "moredata" } });
            expect(global.ICCServer.collections.readwritedaotest.findOne()).to.deep.equal({ _id: id, data: "moredata" });
        });
    });

    describe("upsert", function() {
        it("should insert a new record", function() {
            const dao = new ReadWriteDao<TestRecord>("readwritedaotest", null);
            const result = dao.upsert({ upsertkey: "up1" }, { $set: { data: "somedata" } });
            expect(global.ICCServer.collections.readwritedaotest.findOne()).to.deep.equal({ _id: result.insertedId, upsertkey: "up1", data: "somedata" });
        });

        it("should update an existing record", function() {
            const dao = new ReadWriteDao<TestRecord>("readwritedaotest", null);
            const result = dao.upsert({ upsertkey: "up1" }, { $set: { data: "somedata" } });
            expect(global.ICCServer.collections.readwritedaotest.findOne()).to.deep.equal({ _id: result.insertedId, upsertkey: "up1", data: "somedata" });
            dao.upsert({ upsertkey: "up1" }, { $set: { data: "moredata" } });
            expect(global.ICCServer.collections.readwritedaotest.findOne()).to.deep.equal({ _id: result.insertedId, upsertkey: "up1", data: "moredata" });
        });
    });
    // // TODO: What to do when things fail? duplicate records, missing fields, not even sure what else
});
