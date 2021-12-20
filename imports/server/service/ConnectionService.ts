import { Meteor } from "meteor/meteor";
import ConnectionRecord from "/lib/records/ConnectionRecord";
import InstanceService from "/imports/server/service/InstanceService";
import ConnectionDao from "/imports/server/dao/ConnectionDao";
import { Mongo } from "meteor/mongo";
import ICCConnection from "/lib/server/ICCConnection";
import Stoppable from "/lib/server/Stoppable";
import DirectMessageService from "/imports/server/service/DirectMessageService";
import { AbstractDirectMessageProcessor } from "/lib/AbstractDirectMessageProcessor";

export default class ConnectionService extends Stoppable implements AbstractDirectMessageProcessor {
    private connectiondao: ConnectionDao;

    private instanceservice: InstanceService;

    private directmessageservice: DirectMessageService;

    private connections: { [key: string]: ICCConnection } = {};

    // @ts-ignore
    constructor(parent: Stoppable | null, instanceservice: InstanceService, directmessageservice: DirectMessageService, connectiondao: ConnectionDao) {
        super("connectionservice", parent);
        this.connectiondao = connectiondao;
        this.instanceservice = instanceservice;
        this.directmessageservice = directmessageservice;

        this.directmessageservice.onDirectMessage(this);

        Meteor.onConnection((connection) => this.onConnection(connection));
    }

    public onDirectMessage(session: string, messagetype: string, msgobject: any): void {
        const connection = this.connections[session];
        if (!connection) {
            // TODO: Handle this error
            return;
        }
        connection.handleDirectMessage(messagetype, msgobject);
    }

    private onClose(ourconnection: ICCConnection): void {
        ourconnection.closing();
        delete this.connections[ourconnection.connectionid];
        this.connectiondao.remove(ourconnection._id);
    }

    private onConnection(connection: Meteor.Connection): void {
        const connrecord: Mongo.OptionalId<ConnectionRecord> = {
            connectionid: connection.id,
            instanceid: this.instanceservice.instanceid,
            startTime: new Date(),
        };
        connrecord._id = this.connectiondao.insert(connrecord);
        const ourconnection = new ICCConnection(this, connrecord as ConnectionRecord);
        this.connections[connection.id] = ourconnection;
        connection.onClose(() => this.onClose(ourconnection));
    }

    // @ts-ignore
    // eslint-disable-next-line class-methods-use-this
    private startupDeleteDefunctConnectionRecords() {
        // TODO:
        //  Look for connection records that do not have matching instance records
        //  Delete them
    }

    // @ts-ignore
    // eslint-disable-next-line class-methods-use-this
    protected stopping(): void {
        // Nothing to stop at this time
    }
}
