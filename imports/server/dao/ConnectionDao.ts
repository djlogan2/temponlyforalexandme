import {ReadWriteDao} from "/lib/server/ReadWriteDao";
import ConnectionRecord from "/lib/records/ConnectionRecord";
import Stoppable from "../../../lib/Stoppable";

export default class ConnectionDao extends ReadWriteDao<ConnectionRecord> {
    constructor(parent: Stoppable | null) {
        super("connections", parent);
    }
}
