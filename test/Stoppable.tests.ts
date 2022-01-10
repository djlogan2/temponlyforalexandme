import Stoppable from "/lib/Stoppable";

class TestStoppable extends Stoppable {
    private depth: number;

    private callback: (depth: number) => void;

    // // prepare-to-remove-ts-ignore
    // private child: TestStoppable | null;
    //
    constructor(parent: Stoppable | null, depth: number, callback: (d: number) => void) {
        super(parent);
        this.depth = depth;
        this.callback = callback;
        // if (this.depth < 5) this.child = new TestStoppable(this, depth + 1, this.callback);
        // else {this.child = null;}
    }

    protected stopping(): void {
        this.callback(this.depth);
    }
}

describe("Stoppable", function() {
    it("should call all it's internal 'stopping' and all of its childrens 'stopping' methods when stop() is called", function (done) {
        let active = [0, 1, 2, 3, 4, 5];
        const testme = new TestStoppable(null, 0, (depth) => {
            active = active.filter((n) => n !== depth);
            if (!active.length) done();
        });
        testme.stop();
    });
});
