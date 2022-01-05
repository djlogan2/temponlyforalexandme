import Stoppable from "/lib/Stoppable";
import { LoggerConfigurationRecord, LOGLEVEL } from "/lib/records/LoggerConfigurationRecord";
import ReactiveReadOnlyDao from "/imports/dao/ReactiveReadOnlyDao";

export default abstract class CommonReadOnlyLoggerConfigurationDao extends ReactiveReadOnlyDao<LoggerConfigurationRecord> {
    private debugLevels: {[key: string]: LOGLEVEL} = { root: "debug" };

    private idconversions: {[key: string]: string} = {};

    /**
     * Standard constructor with a stoppable parent
     * @param{Stoppable|null} parent
     */
    constructor(parent: Stoppable | null) {
        super(parent, "logger_configuration");
        this.start({}, undefined, undefined);
    }

    /**
     * You have to provide a way to emit events. On the server, it is usually just a standard {EventEmitter}.
     * However, on the client, due to subscriptions, it is usually an {ICCEventEmitter}
     * @param{string} module The module who's loglevel is changing
     * @param{LOGLEVEL} loglevel The new loglevel
     * @protected
     */
    protected abstract emit(module: string, loglevel: LOGLEVEL): void;

    // eslint-disable-next-line valid-jsdoc
    /**
     * This isn't for general use.
     */
    protected onRecordAdded(id: string, record: Partial<LoggerConfigurationRecord>): void {
        if (record?.module && record?.debuglevel) {
            if (!this.debugLevels[record.module] || this.debugLevels[record.module] !== record.debuglevel) {
                this.debugLevels[record.module] = record.debuglevel;
                this.idconversions[id] = record.module;
                this.emit(record.module, record.debuglevel);
            }
        }
    }

    // eslint-disable-next-line valid-jsdoc
    /**
     * This isn't for general use.
     */
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

    // eslint-disable-next-line valid-jsdoc
    /**
     * This isn't for general use.
     */
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
