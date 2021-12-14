import { Meteor } from "meteor/meteor";
import CollectionManager from "/imports/dao/CollectionManager";

export const enum LoggerType {
    FATAL,
    ERROR,
    WARN,
    INF0,
    DEBUG
}

export interface LoggerConfigurationRecord {
    _id: string;
    module: string;
    debuglevel: LoggerType
}

export default class CommonLoggerConfigurationDao {
    private static observeHandle: Meteor.LiveQueryHandle;

    private static moduleLevels: {[module: string]: LoggerType} = {};

    private static ids: {[id: string]: string} = {};

    private static loggerconfiguration = CollectionManager.getCollection<LoggerConfigurationRecord>("loggerconfig");

    public static observeChanges() {
        if (CommonLoggerConfigurationDao.observeHandle) return;
        CommonLoggerConfigurationDao.observeHandle = this.loggerconfiguration.find().observeChanges({
            added(id, doc) {
                if (doc.module && doc.debuglevel) {
                    CommonLoggerConfigurationDao.ids[id] = doc.module;
                    CommonLoggerConfigurationDao.moduleLevels[doc.module] = doc.debuglevel;
                }
            },
            changed(id, fields) {
                if (fields.debuglevel) {
                    const module = CommonLoggerConfigurationDao.ids[id];
                    if (!module) return;
                    CommonLoggerConfigurationDao.moduleLevels[module] = fields.debuglevel;
                }
            },
            removed(id) {
                const module = CommonLoggerConfigurationDao.ids[id];
                if (!module) return;
                delete CommonLoggerConfigurationDao.moduleLevels[module];
                delete CommonLoggerConfigurationDao.ids[id];
            },
        });
    }

    public static getModuleLevel(module: string): LoggerType {
        if (CommonLoggerConfigurationDao.moduleLevels[module]) return CommonLoggerConfigurationDao.moduleLevels[module];
        if (CommonLoggerConfigurationDao.moduleLevels.root) return CommonLoggerConfigurationDao.moduleLevels.root;
        return LoggerType.DEBUG;
    }
}

CommonLoggerConfigurationDao.observeChanges();
