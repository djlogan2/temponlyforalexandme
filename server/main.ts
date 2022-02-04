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
import WritableUserDao from "/imports/server/dao/WritableUserDao";
import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
import ThemeService from "/imports/server/service/ThemeService";
import WritableThemeHeaderDao from "/imports/server/dao/WritableThemeHeaderDao";
import WritableThemeDataDao from "/imports/server/dao/WritableThemeDataDao";
import I18nService from "/imports/server/service/i18nService";
import Writablei18nDao from "/imports/server/dao/Writablei18nDao";
import UserService from "/imports/server/publications/UserPublication";

const parent = null;

// -------------- FIRST FIRST FIRST --------------
//
// Because this is the logger, it really has to be initialized first.
// Once we get through this, then we can intialize dao's and services however we want.
//
const readableloggerconfigdao = new ReadOnlyLoggerConfigurationDao(null);
const writableloggerconfigdao = new WritableLoggerConfigurationDao(null);
const logrecordsdao = new LogRecordsDao(null);

// -------------- FIRST FIRST FIRST --------------

const instancedao = new InstanceDao(parent);
const connectiondao = new ConnectionDao(parent);

const readonlyuserdao = new CommonReadOnlyUserDao(null);
const writableuserdao = new WritableUserDao(null);
const themeheaderdao = new WritableThemeHeaderDao(null);
const themedatadao = new WritableThemeDataDao(null);
const i18nwritabledao = new Writablei18nDao(null);

const instanceservice = new InstanceService(parent, instancedao);

const connectionservice = new ConnectionService(
  parent,
  instanceservice,
  connectiondao,
  readonlyuserdao,
  writableuserdao,
  i18nwritabledao,
  themeheaderdao,
  themedatadao,
  readableloggerconfigdao,
  writableloggerconfigdao,
  logrecordsdao,
);
