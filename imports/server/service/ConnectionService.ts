import { Meteor } from "meteor/meteor";
import ConnectionRecord from "/lib/records/ConnectionRecord";
import InstanceService from "/imports/server/service/InstanceService";
import ConnectionDao from "/imports/server/dao/ConnectionDao";
import { Mongo } from "meteor/mongo";
import ServerConnection from "/lib/server/ServerConnection";
import Stoppable from "/lib/Stoppable";
import ServerLogger from "/lib/server/ServerLogger";
import {IdleMessage} from "/lib/records/IdleMessage";
import { check } from "meteor/check";
import UserService from "/imports/server/service/UserService";

export default class ConnectionService extends Stoppable {
    private connectiondao: ConnectionDao;

    private instanceservice: InstanceService;
    private userservice: UserService;

    private connections: { [key: string]: ServerConnection } = {};

    private logger = new ServerLogger(this, "server/ConnectionService_ts");

    constructor(parent: Stoppable | null, instanceservice: InstanceService, connectiondao: ConnectionDao, userservice: UserService) {
        super(parent);
        this.connectiondao = connectiondao;
        this.instanceservice = instanceservice;
        this.userservice = userservice;

        Meteor.onConnection((connection) => this.onConnection(connection));

        const self = this;

        Meteor.directStream.onMessage(function processDirectStreamMessage(message: string, sessionId: string) {
          try {
              self.logger.trace(() => `processDirectMessage/1: ${message}`);
              const msg = JSON.parse(message);
              if (typeof msg !== "object" || !("iccdm" in msg)) return;
              self.logger.debug(() => `processDirectMessage: ${message}`);
              
              this.preventCallingMeteorHandler();
              self.onDirectMessage(sessionId, msg.iccdm, msg.iccmsg);
          } catch (e) {
              // If we cannot parse the string into an object, it's not for us.
          }
      });

        Meteor.methods({
            idleFunction (msg) {
                check(msg, Object);
                if(this.connection?.id)
                self.idleMessage(this.connection.id, msg as IdleMessage)
            },
            logonHashToken (token) {
                check(token, String);
                if(this.connection?.id)
                self.logonHashToken(this.connection.id, token)
            }
        });
    }

    private idleMessage(connectionid: string, idle: IdleMessage): void {
        const connection = this.connections[connectionid];
        this.logger.debug(() => `idleMessage connection=${connection}`);
        if (!connection) {
            // TODO: Handle this error
            return;
        }
        connection.idleMessage(idle);
    }

    private logonHashToken(connectionid: string, hashToken: string): void {
        const connection = this.connections[connectionid];
        this.logger.debug(() => `logonHashToken hashToken=${hashToken}`);
        if (!connection) {
            // TODO: Handle this error
            return;
        }
        const user = this.userservice.getUserFromHashToken(hashToken);
        connection.logonUser(user);
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
        this.logger.debug(() => `${ourconnection.connectionid} onClose`);
        ourconnection.stop();
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

    private startupDeleteDefunctConnectionRecords() {
        // TODO:
        //  Look for connection records that do not have matching instance records
        //  Delete them
    }

    protected stopping(): void {
        // Nothing to stop at this time
    }
}
