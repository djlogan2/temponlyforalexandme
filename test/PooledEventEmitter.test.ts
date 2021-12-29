import PooledEventEmitter from "/lib/PooledEventEmitter";
import ICCEventEmitter from "/lib/ICCEventEmitter";
import { expect } from "chai";

class TestPooledEventEmitter extends PooledEventEmitter {
    public onFrstEventCalled: number = 0;

    public onLastEventCalled: number = 0;

    constructor() {
        super("testpooledeventemitter");
    }

    protected onFirstEvent(): void {
        this.onFrstEventCalled += 1;
    }

    protected onLastEvent(): void {
        this.onLastEventCalled += 1;
    }
}

function emtterfn() {console.log("Emitter function called");}
function emtterfn1() {console.log("Emitter function called");}
function emtterfn2() {console.log("Emitter function called");}
function emtterfn3() {console.log("Emitter function called");}

describe("PooledEventEmitter", function() {
    describe("newEmitter", function() {
        it("should return a new event emitter, obviously", function() {
            const pool = new TestPooledEventEmitter();
            const emitter = pool.newEmitter();
            expect(emitter).to.be.an.instanceof(ICCEventEmitter);
        });
    });

    describe("addActiveEmitter", function() {
        it("should call onFirstEvent when the first event is listened to", function() {
            const pool = new TestPooledEventEmitter();
            const emitter = pool.newEmitter();
            expect(emitter).to.be.an.instanceof(ICCEventEmitter);
            expect(pool.onFrstEventCalled).to.equal(0);
            emitter.on("testevent", emtterfn);
            expect(pool.onFrstEventCalled).to.equal(1);
            emitter.removeAllListeners();
        });

        it("should not call onFirstEvent when the second event is listened to", function() {
            const pool = new TestPooledEventEmitter();
            const emitter = pool.newEmitter();
            expect(emitter).to.be.an.instanceof(ICCEventEmitter);
            expect(pool.onFrstEventCalled).to.equal(0);
            emitter.on("testevent", emtterfn);
            expect(pool.onFrstEventCalled).to.equal(1);
            emitter.on("testeventtwo", emtterfn);
            expect(pool.onFrstEventCalled).to.equal(1);
            emitter.removeAllListeners();
        });

        it("should not call onFirstEvent when the the first event from a second emitter is listened to", function() {
            const pool = new TestPooledEventEmitter();
            const emitter = pool.newEmitter();
            expect(emitter).to.be.an.instanceof(ICCEventEmitter);
            expect(pool.onFrstEventCalled).to.equal(0);
            emitter.on("testevent", emtterfn);
            expect(pool.onFrstEventCalled).to.equal(1);
            const emitter2 = pool.newEmitter();
            emitter2.on("testeventtwo", emtterfn);
            expect(pool.onFrstEventCalled).to.equal(1);
            emitter.removeAllListeners();
            emitter2.removeAllListeners();
        });
    });

    describe("removeActiveEmitter", function() {
        it("should work with 'off(x)'", function() {
            const pool = new TestPooledEventEmitter();
            const emitter = pool.newEmitter();
            expect(emitter).to.be.an.instanceof(ICCEventEmitter);
            expect(pool.onFrstEventCalled).to.equal(0);
            emitter.on("testevent", emtterfn);
            expect(pool.onFrstEventCalled).to.equal(1);
            emitter.on("testevent", emtterfn2);
            emitter.on("testevent", emtterfn3);
            emitter.on("testevent2", emtterfn);
            emitter.on("testevent2", emtterfn1);
            emitter.on("testevent2", emtterfn2);
            expect(pool.onFrstEventCalled).to.equal(1);
            emitter.off("testevent");
            expect(pool.onLastEventCalled).to.equal(0);
            emitter.off("testevent2");
            expect(pool.onLastEventCalled).to.equal(1);
        });

        it("should work with 'removeAllListeners()'", function() {
            const pool = new TestPooledEventEmitter();
            const emitter = pool.newEmitter();
            expect(emitter).to.be.an.instanceof(ICCEventEmitter);
            expect(pool.onFrstEventCalled).to.equal(0);
            emitter.on("testevent", emtterfn);
            expect(pool.onFrstEventCalled).to.equal(1);
            emitter.on("testevent", emtterfn2);
            emitter.on("testevent", emtterfn3);
            emitter.on("testevent2", emtterfn);
            emitter.on("testevent2", emtterfn1);
            emitter.on("testevent2", emtterfn2);
            expect(pool.onFrstEventCalled).to.equal(1);
            emitter.removeAllListeners();
            expect(pool.onLastEventCalled).to.equal(1);
        });
    });

    describe("ICCEventEmitter", function() {
        it("should properly emit varargs", function(done) {
            const pool = new TestPooledEventEmitter();
            const emitter = pool.newEmitter();
            expect(emitter).to.be.an.instanceof(ICCEventEmitter);
            expect(pool.onFrstEventCalled).to.equal(0);
            emitter.on("testevent", (a1: number, a2: {do: string}, a3: string[]) => {
                expect(a1).to.equal(1);
                expect(a2).to.deep.equal({ do: "me" });
                expect(a3).to.deep.equal(["a", "favor"]);
                emitter.removeAllListeners(); done();
            });
            emitter.emit("testevent", 1, { do: "me" }, ["a", "favor"]);
        });

        it("should work correctly when an event is emitted", function(done) {
            const pool = new TestPooledEventEmitter();
            const emitter = pool.newEmitter();
            expect(emitter).to.be.an.instanceof(ICCEventEmitter);
            expect(pool.onFrstEventCalled).to.equal(0);
            emitter.on("testevent", () => {emitter.removeAllListeners(); done();});
            emitter.emit("testevent");
        });
    });
});
