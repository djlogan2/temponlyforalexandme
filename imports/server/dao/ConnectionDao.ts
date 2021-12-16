import {ReadWriteDao} from "/lib/server/ReadWriteDao";
import ConnectionRecord from "/lib/records/ConnectionRecord";

export default class ConnectionDao extends ReadWriteDao<ConnectionRecord> {
    constructor(parent) {
        super("connectiondao", "connections", parent);
    }
}
