import { ReadWriteDao } from "/lib/server/ReadWriteDao";
import { LogRecord } from "/lib/records/LogRecord";
import Stoppable from "/lib/Stoppable";

export default class LogRecordsDao extends ReadWriteDao<LogRecord> {
    constructor(parent: Stoppable | null) {
        super("logger_config", parent);
    }
}
