import CommonReadOnlyLoggerConfigurationDao from "../../imports/client/dao/ReadOnlyLoggerConfigurationDao";
import SubscriptionService from "/imports/client/service/SubscriptionService";
import ClientLogger from "/lib/client/ClientLogger";

const sub = new SubscriptionService(null);

const readonlyconfigurationdao = new CommonReadOnlyLoggerConfigurationDao(null, sub);
ClientLogger.setLoggerConfigDao(readonlyconfigurationdao);
