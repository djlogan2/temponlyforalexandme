import CommonReadOnlyLoggerConfigurationDao from "/imports/dao/ReadOnlyLoggerConfigurationDao";
import ClientLogger from "/lib/client/ClientLogger";

if (!global.ICCServer) global.ICCServer = { collections: {}, subscriptions: {} };

const readonlyconfigurationdao = new CommonReadOnlyLoggerConfigurationDao(null);
ClientLogger.setLoggerConfigDao(readonlyconfigurationdao);