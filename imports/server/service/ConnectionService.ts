import { Meteor } from "meteor/meteor";
import TimestampService from "/imports/server/service/TimestampService";
import ConnectionRecord from "/lib/records/ConnectionRecord";
import InstanceService from "/imports/server/service/InstanceService";
import ConnectionDao from "/imports/server/dao/ConnectionDao";
import { Mongo } from "meteor/mongo";

export default class ConnectionService {
    private timestampservice: TimestampService;

    private connectiondao: ConnectionDao;

    constructor(instanceservice: InstanceService, timestampservice: TimestampService, connectiondao: ConnectionDao) {
        this.timestampservice = timestampservice;
        this.connectiondao = connectiondao;
        Meteor.onConnection((connection) => {
            const connrecord: Mongo.OptionalId<ConnectionRecord> = {
                connectionid: connection.id,
                instanceid: instanceservice.instanceid,
                startTime: new Date(),
            };
            connrecord._id = this.connectiondao.insert(connrecord);
            this.connectionEstablished(connrecord as ConnectionRecord);
            connection.onClose(() => {
                const connrec2 = connectiondao.get(connection.id);
                if (connrec2) this.connectionClosed(connrec2);
            });
        });
    }

    private startupDeleteDefunctConnectionRecords() {
        // TODO:
        //  Look for connection records that do not have matching instance records
        //  Delete them
    }

    private connectionEstablished(connection: ConnectionRecord): void {
        this.timestampservice.startTimestamp(connection);
    }

    private connectionClosed(connection: ConnectionRecord): void {
        this.timestampservice.stopTimestamp(connection);
    }
}
