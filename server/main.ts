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
const themedao = new WritableThemeDao(null);
const i18nwritabledao = new Writablei18nDao(null);

const instanceservice = new InstanceService(parent, instancedao);

const writablegamedao = new WritableGameDao(null);
const readonlygamedao = new ServerReadOnlyGameDao(null, writablegamedao);

const connectionservice = new ConnectionService(
  parent,
  instanceservice,
  connectiondao,
  readonlyuserdao,
  writableuserdao,
  i18nwritabledao,
  themedao,
  readableloggerconfigdao,
  writableloggerconfigdao,
  logrecordsdao,
  writablegamedao,
  readonlygamedao,
);
