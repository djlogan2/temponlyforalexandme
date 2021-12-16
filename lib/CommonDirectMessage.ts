import { Meteor } from "meteor/meteor";
import Stoppable from "/lib/server/Stoppable";

export default abstract class CommonDirectMessage<S, R> extends Stoppable {
    private receivedHandler?: (msg: R) => void;

    protected name: string;

    // eslint-disable-next-line no-unused-vars
    constructor(identifier: string, parent: Stoppable, name: string, handler?: (msg: R) => void) {
        super(identifier, parent);
        this.name = name;
        if (handler) this.receivedHandler = Meteor.bindEnvironment((msg2) => handler(msg2));
    }

    public received(msg: R) {
        if (this.receivedHandler) this.receivedHandler(msg);
        else throw new Meteor.Error("UNHANDLED_MESSAGE");
    }

    public abstract send(msg: S): void;
}
