import { Meteor } from "meteor/meteor";
import ConnectionRecord from "/lib/records/ConnectionRecord";
import InstanceService from "/imports/server/service/InstanceService";
import ConnectionDao from "/imports/server/dao/ConnectionDao";
import { Mongo } from "meteor/mongo";
import ServerConnection from "/lib/server/ServerConnection";
import Stoppable from "/lib/Stoppable";
import ServerLogger from "/lib/server/ServerLogger";

export default class ConnectionService extends Stoppable {
    private connectiondao: ConnectionDao;

    private instanceservice: InstanceService;

    private connections: { [key: string]: ServerConnection } = {};

    private logger = new ServerLogger("server/ConnectionService_ts");

    // @ts-ignore
    constructor(parent: Stoppable | null, instanceservice: InstanceService, connectiondao: ConnectionDao) {
        super(parent);
        this.connectiondao = connectiondao;
        this.instanceservice = instanceservice;

        Meteor.onConnection((connection) => this.onConnection(connection));

        const self = this;

        function processDirectStreamMessage(message: any, sessionId: string) {
            try {
                self.logger.debug(() => `processDirectMessage/1: ${message}`);
                const msg = JSON.parse(message);
                if (typeof msg !== "object" || !("iccdm" in msg)) return;
                self.logger.debug(() => `processDirectMessage: ${message}`);
                // @ts-ignore
                // eslint-disable-next-line no-invalid-this
                this.preventCallingMeteorHandler();
                self.onDirectMessage(sessionId, msg.iccdm, msg.iccmsg);
                // @ts-ignore
            } catch (e) {
                // If we cannot parse the string into an object, it's not for us.
            }
        }

        // @ts-ignore
        Meteor.directStream.onMessage(processDirectStreamMessage);
    }

    private onDirectMessage(session: string, messagetype: string, msgobject: any): void {
        const connection = this.connections[session];
        if (!connection) {
            // TODO: Handle this error
            return;
        }
        connection.handleDirectMessage(messagetype, msgobject);
    }

    private onClose(ourconnection: ServerConnection): void {
        ourconnection.closing();
        delete this.connections[ourconnection.connectionid];
        this.connectiondao.remove(ourconnection._id);
    }

    private onConnection(connection: Meteor.Connection): void {
        this.logger.debug(() => `onConnection connection=${connection.id}`);
        const connrecord: Mongo.OptionalId<ConnectionRecord> = {
            connectionid: connection.id,
            instanceid: this.instanceservice.instanceid,
            startTime: new Date(),
        };
        connrecord._id = this.connectiondao.insert(connrecord);
        const ourconnection = new ServerConnection(this, connrecord as ConnectionRecord);
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
