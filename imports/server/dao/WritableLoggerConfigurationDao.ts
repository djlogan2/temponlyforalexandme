import ReadWriteDao from "/imports/server/dao/ReadWriteDao";
import { LoggerConfigurationRecord } from "/lib/records/LoggerConfigurationRecord";
import Stoppable from "/lib/Stoppable";

export default class WritableLoggerConfigurationDao extends ReadWriteDao<LoggerConfigurationRecord> {
    constructor(parent: Stoppable | null) {
        super("logger_configuration", parent);
    }
}
