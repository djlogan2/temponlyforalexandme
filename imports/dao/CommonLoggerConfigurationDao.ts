import WritableReactiveDao from "/lib/server/WritableReactiveDao";
import Stoppable from "/lib/Stoppable";
import { DEBUGLEVEL, LoggerConfigurationRecord, STRINGDEBUGLEVELS } from "/lib/records/LoggerConfigurationRecord";

export default class CommonLoggerConfigurationDao extends WritableReactiveDao<LoggerConfigurationRecord> {
    private debugLevels: {[key: string]: DEBUGLEVEL} = {};

    private moduleConversion: {[key: string]: string} = {};

    private constructor(parent: Stoppable) {
        super(parent, "logger_configuration");
        this.debugLevels.root = "debug";
    }

    protected onRecordAdded(id: string, record: Partial<LoggerConfigurationRecord>): void {
        if (record.module && record.debuglevel) {
            this.debugLevels[record.module] = record.debuglevel;
            this.moduleConversion[id] = record.module;
        }
    }

    protected onFieldsChanged(id: string, record: Partial<LoggerConfigurationRecord>): void {
        if (record.debuglevel) {
            const modulename = this.moduleConversion[id];
            if (modulename) this.debugLevels[modulename] = record.debuglevel;
        }
    }

    protected onRecordRemoved(id: string): void {
        const module = this.moduleConversion[id];
        if (module) delete this.debugLevels[module];
        delete this.moduleConversion[id];
    }

    // eslint-disable-next-line class-methods-use-this
    protected onStop(): void {
        // Nothing to do
    }

    private static level(loglevel: DEBUGLEVEL): number {
        return STRINGDEBUGLEVELS.indexOf(loglevel);
    }

    private moduleLevel(module: string): number {
        const lvl = this.moduleConversion[module] || this.moduleConversion.root || "debug";
        return CommonLoggerConfigurationDao.level(lvl);
    }

    public writable(module: string, loglevel: DEBUGLEVEL): boolean {
        return (CommonLoggerConfigurationDao.level(loglevel) <= this.moduleLevel(module));
    }
}

