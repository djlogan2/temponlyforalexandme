import { Meteor } from "meteor/meteor";

export default abstract class AbstractDirectMessageHandler<T> {
    private name: string;

    private connection_id: string;

    constructor(name: string, connectionId: string) {
        this.name = name;
        this.connection_id = connectionId;
    }

    protected send(msg: T): void {
        // @ts-ignore
        Meteor.directStream.send(JSON.stringify({ iccdm: this.name, iccmsg: msg }), this.connection_id);
    }

    public abstract onReceived(msg: T): void;
}
