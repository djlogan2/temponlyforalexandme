export interface Handle {
    stop(): void;
}

export class Timer implements Handle {
    private handle: number;
    constructor(fn: () => void, ms: number) {
        this.handle = Meteor.setInterval(fn, ms);
    }

    public stop(): void {
        Meteor.clearInterval(this.handle);
    }
}
