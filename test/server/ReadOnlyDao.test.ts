import { Meteor } from "meteor/meteor";
import ReadOnlyDao from "/lib/ReadOnlyDao";
// @ts-ignore
import { resetDatabase } from "meteor/xolvio:cleaner";
import { expect } from "chai";
import ReadWriteDao from "/lib/server/ReadWriteDao";

interface TestRecord {
    _id: string;
    data1: string;
    data2: string;
    data3: string;
}

if (!global.ICCServer) global.ICCServer = { collections: {}, dao: {}, singletons: {} };

const w = new ReadWriteDao<TestRecord>("readonlydaotest", null);

function insert(): void {
    w.insert({
        _id: "found1", data1: "1", data2: "2", data3: "3",
    });
    w.insert({
        _id: "found2", data1: "2", data2: "3", data3: "1",
    });
    w.insert({
        _id: "found3", data1: "3", data2: "1", data3: "2",
    });
    w.insert({
        _id: "found4", data1: "1", data2: "2", data3: "3",
    });
    w.insert({
        _id: "found5", data1: "2", data2: "2", data3: "1",
    });
}

Meteor.methods({ ReadOnlyDaoTest: insert });

describe("ReadOnlyDao", function() {
    beforeEach(function() {
        resetDatabase();
        insert();
    });

    describe("new instance", function() {
        it("should allow creation of multiple instances of a read only dao without crashing (i.e. multiple mongo collections", function() {
            for (let x = 0; x < 5; x += 1) {
                expect(new ReadOnlyDao("readonlydao", null)).to.not.throw;
            }
        });
    });

    describe("get", function() {
        it("should return undefined when id not found", function() {
            // @ts-ignore
            // eslint-disable-next-line no-invalid-this
            const r = new ReadOnlyDao<TestRecord>("readonlydaotest", null);
            const tr = r.get("notfound");
            expect(tr).to.be.undefined;
        });

        it("should return a found record", function() {
            const r = new ReadOnlyDao<TestRecord>("readonlydaotest", null);
            const tr = r.get("found1");
            expect(tr).to.deep.equal({
                _id: "found1", data1: "1", data2: "2", data3: "3",
            });
        });
    });

    describe("readOne", function() {
        it("should return undefined when id not found", function() {
            // @ts-ignore
            // eslint-disable-next-line no-invalid-this
            const r = new ReadOnlyDao<TestRecord>("readonlydaotest", null);
            const tr = r.readOne({ data1: "a" });
            expect(tr).to.be.undefined;
        });

        it("should return a found record", function() {
            const r = new ReadOnlyDao<TestRecord>("readonlydaotest", null);
            const tr = r.readOne({ data1: "2", data2: "3" });
            expect(tr).to.deep.equal({
                _id: "found2", data1: "2", data2: "3", data3: "1",
            });
        });

        it("should return specific fields when included", function() {
            const r = new ReadOnlyDao<TestRecord>("readonlydaotest", null);
            const tr = r.readOne({ data1: "2", data2: "3" }, "include", ["data2", "data3"]);
            expect(tr).to.deep.equal({
                _id: "found2", data2: "3", data3: "1",
            });
        });

        it("should return specific with fields excluded when excluded", function() {
            const r = new ReadOnlyDao<TestRecord>("readonlydaotest", null);
            const tr = r.readOne({ data1: "2", data2: "3" }, "exclude", ["data2", "data3"]);
            expect(tr).to.deep.equal({
                _id: "found2", data1: "2",
            });
        });
    });

    // describe("readMany", function() {
    //     it("should return undefined when id not found", function() {
    //         // @ts-ignore
    //         // eslint-disable-next-line no-invalid-this
    //         const r = new ReadOnlyDao<TestRecord>("readonlydaotest", null);
    //         const tr = r.get("notfound");
    //         expect(tr).to.be.undefined;
    //     });
    //
    //     it("should return a found record", function() {
    //         const r = new ReadOnlyDao<TestRecord>("readonlydaotest", null);
    //         const tr = r.get("found");
    //         expect(tr?.data).toBe("record");
    //     });
    // });
});
