import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import { LogRecord } from "/lib/records/LogRecord";
import Stoppable from "/lib/Stoppable";

export default class LogRecordsDao extends ReadWriteDao<LogRecord> {
    constructor(parent: Stoppable | null) {
        super("log_records", parent);
    }
}
