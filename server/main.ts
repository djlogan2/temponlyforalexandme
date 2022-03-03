// noinspection JSUnusedLocalSymbols

import "../lib/server/ICCGlobal";
import InstanceService from "/imports/server/service/InstanceService";
import InstanceDao from "/imports/server/dao/InstanceDao";
import ConnectionService from "/imports/server/service/ConnectionService";
import ConnectionDao from "/imports/server/dao/ConnectionDao";
import LogRecordsDao from "/imports/server/dao/LogRecordsDao";
import WritableLoggerConfigurationDao from "/imports/server/dao/WritableLoggerConfigurationDao";
import ReadOnlyLoggerConfigurationDao from "/imports/server/dao/ReadOnlyLoggerConfigurationDao";
import WritableUserDao from "/imports/server/dao/WritableUserDao";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import WritableThemeDao from "/imports/server/dao/WritableThemeDao";
import Writablei18nDao from "/imports/server/dao/Writablei18nDao";
import WritableGameDao from "/imports/server/dao/WritableGameDao";
import ServerReadOnlyGameDao from "/imports/server/dao/ServerReadOnlyGameDao";

const parent = null;

// -------------- FIRST FIRST FIRST --------------

const connectionservice = new ConnectionService();
