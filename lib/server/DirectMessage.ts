import { Meteor } from "meteor/meteor";
import CommonDirectMessage from "/lib/CommonDirectMessage";
import Stoppable from "/lib/server/Stoppable";

export default class ServerDirectMessage<S, R> extends CommonDirectMessage<S, R> {
    private connection_id: string;

    stop(): void {
        ServerDirectMessage.stopConnection(this.connection_id, this.name);
    }

    private static registered: { [key: string]: { [key: string]: any } } = {};

    constructor(identifier: string, parent: Stoppable, name: string, connectionId: string, handler?: (msg: R) => void) {
        super(identifier, parent, name, handler);
        this.connection_id = connectionId;
        if (!ServerDirectMessage.registered[connectionId]) ServerDirectMessage.registered[connectionId] = {};
        if (ServerDirectMessage.registered[connectionId][name]) throw new Meteor.Error("ALREADY_REGISTERED");
        ServerDirectMessage.registered[connectionId][name] = this;
    }

    public static globalreceive(connectionid: string, name: string, msg: any) {
        const c = ServerDirectMessage.registered[connectionid];
        if (!c) throw new Meteor.Error("CONNECTION_NOT_FOUND");
        const clazz = c[name];
        if (!clazz) throw new Meteor.Error("MESSAGE_TYPE_NOT_FOUND");
        clazz.received(msg);
    }

    public static stopConnection(connectionid: string, name?: string): void {
        if (!ServerDirectMessage.registered[connectionid]) return;
        if (!!name && !ServerDirectMessage.registered[connectionid][name]) return;
        if (name) delete ServerDirectMessage.registered[connectionid][name];
        if (!name || !Object.keys(ServerDirectMessage.registered[connectionid]).length) delete ServerDirectMessage.registered[connectionid];
    }

    public send(msg: S): void {
        // @ts-ignore
        Meteor.directStream.send(JSON.stringify({ iccdm: this.name, iccmsg: msg }), this.connection_id);
    }

    protected stopping(): void {
        this.stopConnection(connectionid);
    }
}

// Meteor.startup(() => {
//     ICCServer.events.on("connectionclosed", Meteor.bindEnvironment((connectionid: string) => {
//         ServerDirectMessage.stopConnection(connectionid);
//     }));
//
//     ICCServer.events.on("defunctconnection", Meteor.bindEnvironment((connectionid: string) => {
//         ServerDirectMessage.stopConnection(connectionid);
//     }));
//
//     Meteor.startup(() => {
//         function processDirectStreamMessage(message, sessionId) {
//             try {
//                 const msg = JSON.parse(message);
//                 if (typeof msg !== "object" || !("iccdm" in msg)) return;
//                 this.preventCallingMeteorHandler();
//                 ServerDirectMessage.globalreceive(sessionId, msg.iccdm, msg.iccmsg);
//                 // @ts-ignore
//             } catch (e) {
//                 // If we cannot parse the string into an object, it's not for us.
//             }
//         }
//         // @ts-ignore
//         Meteor.directStream.onMessage(processDirectStreamMessage);
//     });
// });
