import InstanceService from "/imports/server/service/InstanceService";
import InstanceDao from "/imports/server/dao/InstanceDao";
import ConnectionService from "/imports/server/service/ConnectionService";
import ConnectionDao from "/imports/server/dao/ConnectionDao";
import LoggerService from "/imports/server/service/LoggerService";
import LogRecordsDao from "/imports/server/dao/LogRecordsDao";
import ReadOnlyLoggerConfigurationDao from "/imports/dao/ReadOnlyLoggerConfigurationDao";
import WritableLoggerConfigurationDao from "/imports/server/dao/WritableLoggerConfigurationDao";

const parent = null;

if (!global.ICCServer) global.ICCServer = { collections: {} };
const readableloggerconfigdao = new ReadOnlyLoggerConfigurationDao(null);
const writableloggerconfigdao = new WritableLoggerConfigurationDao(null);
const logrecordsdao = new LogRecordsDao(null);
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loggerservice = new LoggerService(readableloggerconfigdao, writableloggerconfigdao, logrecordsdao);

const instancedao = new InstanceDao(parent);
const connectiondao = new ConnectionDao(parent);

const instanceservice = new InstanceService(parent, instancedao);
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const connectionservice = new ConnectionService(parent, instanceservice, connectiondao);
