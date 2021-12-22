import Stoppable from "/lib/Stoppable";
import { LoggerConfigurationRecord, LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";
import EventEmitter from "eventemitter3";
import ReactiveReadOnlyDao from "/lib/ReactiveReadOnlyDao";

export default class ReadOnlyLoggerConfigurationDao extends ReactiveReadOnlyDao<LoggerConfigurationRecord> {
    private emitter = new EventEmitter();

    private debugLevels: {[key: string]: LOGLEVEL} = { root: "debug" };

    private idconversions: {[key: string]: string} = {};

    public get events() {return this.emitter;}

    constructor(parent: Stoppable | null) {
        super(parent, "logger_configuration");
    }

    protected onRecordAdded(id: string, record: Partial<LoggerConfigurationRecord>): void {
        if (record?.module && record?.debuglevel) {
            if (!this.debugLevels[record.module] || this.debugLevels[record.module] !== record.debuglevel) {
                this.debugLevels[record.module] = record.debuglevel;
                this.idconversions[id] = record.module;
                this.emitter.emit(record.module, record.debuglevel);
            }
        }
    }

    protected onFieldsChanged(id: string, record: Partial<LoggerConfigurationRecord>): void {
        if (record?.module && record?.debuglevel) {
            if (!this.debugLevels[record.module] || this.debugLevels[record.module] !== record.debuglevel) {
                this.debugLevels[record.module] = record.debuglevel;
                this.idconversions[id] = record.module;
                this.emitter.emit(record.module, record.debuglevel);
            }
        }
    }

    protected onRecordRemoved(id: string): void {
        const module = this.idconversions[id];
        delete this.idconversions[id];
        if (module) {
            delete this.debugLevels[module];
        }
        this.emitter.emit(module, this.debugLevels.root);
    }

    // eslint-disable-next-line class-methods-use-this
    protected onStop(): void {
        // Nothing to do
    }
}
