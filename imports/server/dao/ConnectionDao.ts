import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import ConnectionRecord from "/lib/records/ConnectionRecord";
import Stoppable from "../../../lib/Stoppable";

export default class ConnectionDao extends ReadWriteDao<ConnectionRecord> {
    constructor(parent: Stoppable | null) {
        super("connections", parent);
    }
}
