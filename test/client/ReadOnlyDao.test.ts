import { Meteor } from "meteor/meteor";
import ReadOnlyDao from "/lib/ReadOnlyDao";
// @ts-ignore
import { resetDatabase } from "meteor/xolvio:cleaner";
// @ts-ignore
import { expect } from "chai";

interface TestRecord {
    _id: string;
    data1: string;
    data2: string;
    data3: string;
}

if (!global.ICCServer) global.ICCServer = { collections: {}, client: { subscriptions: {}, dao: {} } };
Meteor.subscribe("readonlydaotest");

describe("ReadOnlyDao", function() {
    beforeEach(function(done) {
        resetDatabase(null, () => {
            Meteor.call("ReadOnlyDaoTest", done);
        });
    });

    describe("new instance", function() {
        it("should allow creation of multiple instances of a read only dao without crashing (i.e. multiple mongo collections", function() {
            for (let x = 0; x < 5; x += 1) {
                expect(new ReadOnlyDao("readonlydaotest", null)).to.not.throw;
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

    describe("readMany", function() {
        it("should return undefined when id not found", function() {
            // @ts-ignore
            // eslint-disable-next-line no-invalid-this
            const r = new ReadOnlyDao<TestRecord>("readonlydaotest", null);
            const tr = r.readMany({ data1: "a" });
            expect(tr).to.be.empty;
        });

        it("should return a found record", function() {
            const r = new ReadOnlyDao<TestRecord>("readonlydaotest", null);
            const tr = r.readMany({ data1: "1", data2: "2" });
            expect(tr).to.deep.equal([
                {
                    _id: "found1", data1: "1", data2: "2", data3: "3",
                },
                {
                    _id: "found4", data1: "1", data2: "2", data3: "3",
                },
            ]);
        });

        it("should return specific fields when included", function() {
            const r = new ReadOnlyDao<TestRecord>("readonlydaotest", null);
            const tr = r.readMany({ data1: "1", data2: "2" }, "include", ["data2", "data3"]);
            expect(tr).to.deep.equal([
                { _id: "found1", data2: "2", data3: "3" },
                { _id: "found4", data2: "2", data3: "3" },
            ]);
        });

        it("should return specific with fields excluded when excluded", function() {
            const r = new ReadOnlyDao<TestRecord>("readonlydaotest", null);
            const tr = r.readMany({ data1: "1", data2: "2" }, "exclude", ["data2", "data3"]);
            expect(tr).to.deep.equal([
                { _id: "found1", data1: "1" },
                { _id: "found4", data1: "1" },
            ]);
        });
    });
});
