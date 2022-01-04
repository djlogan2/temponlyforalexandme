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

    private logger = new ServerLogger(this, "server/ConnectionService_ts");

    constructor(parent: Stoppable | null, instanceservice: InstanceService, connectiondao: ConnectionDao) {
        super(parent);
        this.connectiondao = connectiondao;
        this.instanceservice = instanceservice;

        Meteor.onConnection((connection) => this.onConnection(connection));

        const self = this;

        function processDirectStreamMessage(message: string, sessionId: string) {
            try {
                self.logger.trace(() => `processDirectMessage/1: ${message}`);
                const msg = JSON.parse(message);
                if (typeof msg !== "object" || !("iccdm" in msg)) return;
                self.logger.trace(() => `processDirectMessage: ${message}`);
                // @ts-ignore
                // eslint-disable-next-line no-invalid-this
                this.preventCallingMeteorHandler();
                self.onDirectMessage(sessionId, msg.iccdm, msg.iccmsg);
            } catch (e) {
                // If we cannot parse the string into an object, it's not for us.
            }
        }

        // @ts-ignore
        Meteor.directStream.onMessage(processDirectStreamMessage);
    }

    private onDirectMessage(session: string, messagetype: string, msgobject: any): void {
        this.logger.trace(() => `onDirectMessage session=${session} messagetype=${messagetype} message=${JSON.stringify(msgobject)}`);
        const connection = this.connections[session];
        this.logger.trace(() => `onDirectMessage connection=${connection}`);
        if (!connection) {
            // TODO: Handle this error
            return;
        }
        connection.handleDirectMessage(messagetype, msgobject);
    }

    private onClose(ourconnection: ServerConnection): void {
        this.logger.trace(() => `${ourconnection.connectionid} onClose`);
        ourconnection.stop();
        delete this.connections[ourconnection.connectionid];
        this.connectiondao.remove(ourconnection._id);
    }

    private onConnection(connection: Meteor.Connection): void {
        this.logger.trace(() => `onConnection connection=${connection.id}`);
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
