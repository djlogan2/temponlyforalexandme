import ReadWriteDao from "/lib/server/ReadWriteDao";
import { LoggerConfigurationRecord } from "/lib/records/LoggerConfigurationRecord";
import Stoppable from "/lib/Stoppable";

export default class WritableLoggerConfigurationDao extends ReadWriteDao<LoggerConfigurationRecord> {
    constructor(parent: Stoppable | null) {
        super("logger_config", parent);
    }
}
