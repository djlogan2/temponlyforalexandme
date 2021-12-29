import Stoppable from "/lib/Stoppable";
import { LoggerConfigurationRecord, LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";
import ReactiveReadOnlyDao from "/lib/ReactiveReadOnlyDao";

export default abstract class CommonReadOnlyLoggerConfigurationDao extends ReactiveReadOnlyDao<LoggerConfigurationRecord> {
    private debugLevels: {[key: string]: LOGLEVEL} = { root: "debug" };

    private idconversions: {[key: string]: string} = {};

    constructor(parent: Stoppable | null) {
        super(parent, "logger_configuration");
        this.start({}, undefined, undefined);
    }

    protected abstract emit(module: string, loglevel: LOGLEVEL): void;

    protected onRecordAdded(id: string, record: Partial<LoggerConfigurationRecord>): void {
        if (record?.module && record?.debuglevel) {
            if (!this.debugLevels[record.module] || this.debugLevels[record.module] !== record.debuglevel) {
                this.debugLevels[record.module] = record.debuglevel;
                this.idconversions[id] = record.module;
                this.emit(record.module, record.debuglevel);
            }
        }
    }

    protected onFieldsChanged(id: string, record: Partial<LoggerConfigurationRecord>): void {
        if (record?.debuglevel) {
            const module = record.module || this.idconversions[id];
            if (!this.debugLevels[module] || this.debugLevels[module] !== record.debuglevel) {
                this.debugLevels[module] = record.debuglevel;
                if (record.module) this.idconversions[id] = record.module;
                this.emit(module, record.debuglevel);
            }
        }
    }

    protected onRecordRemoved(id: string): void {
        const module = this.idconversions[id];
        delete this.idconversions[id];
        if (module) {
            delete this.debugLevels[module];
        }
        this.emit(module, this.debugLevels.root);
    }

    // eslint-disable-next-line class-methods-use-this
    protected onStop(): void {
        // Nothing to do
    }
}
