import { Meteor } from "meteor/meteor";
import AbstractCommonDirectMessage from "/lib/CommonDirectMessage";

export default class ClientConnecton extends AbstractCommonDirectMessage {
    private connectionid; string;

    constructor() {
        super();
        Meteor.startup(() => {
            // @ts-ignore
            this.connectionid = Meteor.connection._lastSessionId;
            ICCServer.connection = this;
        });
    }

    protected processDirectMessage(sessionid: string, messagetype: string, messageobject: any): void {
        throw new Error("Method not implemented.");
    }
}
