import ReadOnlyLoggerConfigurationDao from "/imports/dao/ReadOnlyLoggerConfigurationDao";
import ClientLogger from "/lib/client/ClientLogger";

if (!global.ICCServer) global.ICCServer = { collections: {}, singletons: {} };

const readonlyconfigurationdao = new ReadOnlyLoggerConfigurationDao(null);
ClientLogger.setLoggerConfigDao(readonlyconfigurationdao);
