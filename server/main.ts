// noinspection JSUnusedLocalSymbols

import "../lib/server/ICCGlobal";
import LoggerService from "/imports/server/service/LoggerService";
import InstanceService from "/imports/server/service/InstanceService";
import InstanceDao from "/imports/server/dao/InstanceDao";
import ConnectionService from "/imports/server/service/ConnectionService";
import ConnectionDao from "/imports/server/dao/ConnectionDao";
import LogRecordsDao from "/imports/server/dao/LogRecordsDao";
import WritableLoggerConfigurationDao from "/imports/server/dao/WritableLoggerConfigurationDao";
import ReadOnlyLoggerConfigurationDao from "/imports/server/dao/ReadOnlyLoggerConfigurationDao";
import UserService from "/imports/server/service/UserService";
import WritableUserDao from "/imports/server/dao/WritableUserDao";
import WritableThemeDao from "/imports/server/dao/WritableThemeDao";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import ThemeService from "/imports/server/service/ThemeService";
import I18nService from "/imports/server/service/i18nService";
import Writablei18nDao from "/imports/server/dao/Writablei18nDao";

const parent = null;

// -------------- FIRST FIRST FIRST --------------
//
// Because this is the logger, it really has to be initialized first.
// Once we get through this, then we can intialize dao's and services however we want.
//
const readableloggerconfigdao = new ReadOnlyLoggerConfigurationDao(null);
const writableloggerconfigdao = new WritableLoggerConfigurationDao(null);
const logrecordsdao = new LogRecordsDao(null);

// @ts-ignore
const loggerservice = new LoggerService(
  readableloggerconfigdao,
  writableloggerconfigdao,
  logrecordsdao,
);
// -------------- FIRST FIRST FIRST --------------

const instancedao = new InstanceDao(parent);
const connectiondao = new ConnectionDao(parent);

const readonlyuserdao = new CommonReadOnlyUserDao(null);
const writableuserdao = new WritableUserDao(null);
const i18nwritabledao = new Writablei18nDao(null);
const themedao = new WritableThemeDao(null);

const instanceservice = new InstanceService(parent, instancedao);
const themeservice = new ThemeService(themedao);
const userservice = new UserService(null, writableuserdao, themeservice);
const i18nservice = new I18nService(i18nwritabledao);

const connectionservice = new ConnectionService(
  parent,
  instanceservice,
  connectiondao,
  userservice,
  readonlyuserdao,
  writableuserdao,
);
