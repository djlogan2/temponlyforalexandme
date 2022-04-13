import fs from "fs";
import path from "path";
// noinspection JSUnusedLocalSymbols

import "../lib/server/ICCGlobal";
// import InstanceService from "/imports/server/service/InstanceService";
// import InstanceDao from "/imports/server/dao/InstanceDao";
import ConnectionService from "/imports/server/service/ConnectionService";
import StaticsWritableDao from "/imports/server/dao/StaticsWritableDao";
import UniqueStaticsWritableDao from "/imports/server/dao/UniqueStaticsWritableDao";
import ServerLogger from "/lib/server/ServerLogger";
// import ConnectionDao from "/imports/server/dao/ConnectionDao";
// import LogRecordsDao from "/imports/server/dao/LogRecordsDao";
// import WritableLoggerConfigurationDao from "/imports/server/dao/WritableLoggerConfigurationDao";
// import ReadOnlyLoggerConfigurationDao from "/imports/server/dao/ReadOnlyLoggerConfigurationDao";
// import WritableUserDao from "/imports/server/dao/WritableUserDao";
// import CommonReadOnlyUserDao from "/imports/dao/CommonReadOnlyUserDao";
// import WritableThemeDao from "/imports/server/dao/WritableThemeDao";
// import Writablei18nDao from "/imports/server/dao/Writablei18nDao";
// import WritableGameDao from "/imports/server/dao/WritableGameDao";
// import ServerReadOnlyGameDao from "/imports/server/dao/ServerReadOnlyGameDao";

const parent = null;

// -------------- FIRST FIRST FIRST --------------

const connectionservice = new ConnectionService();

// @ts-ignore
Picker.route("/statics/:file", function(params, req, res, next) {
  const { file, query } = params;
  const { userid, theme, isolation_group } = query;

  const logger = new ServerLogger(connectionservice, "StaticsEndpoint.js");
  const staticsdao = new StaticsWritableDao(null);
  const uniqnuestaticsdao = new UniqueStaticsWritableDao(null);

  let data = staticsdao.readOne({ key: file, theme: undefined, isolation_group: undefined, user_id: undefined });

  if (isolation_group) {
    data = staticsdao.readOne({
      key: file,
      isolation_group: isolation_group,
      theme: undefined,
      user_id: undefined
    }) || data;
  }

  if (theme) {
    data = staticsdao.readOne({ key: file, theme: theme, isolation_group: undefined, user_id: undefined }) || data;
  }

  if (isolation_group && theme) {
    data = staticsdao.readOne({
      key: file,
      theme: theme,
      isolation_group: isolation_group,
      user_id: undefined
    }) || data;
  }

  if (userid) {
    data = staticsdao.readOne({ key: file, theme: undefined, isolation_group: undefined, user_id: userid }) || data;
  }

  if (!data) {
    logger.error(() => `CANNOT FIND STATICS WITH PARAMS. key: ${file}, userid: ${userid} isolation_group: ${isolation_group} theme:${theme}`);
    return;
  }

  const unqie = uniqnuestaticsdao.readOne({ key: data.key });

  if (!unqie) {
    logger.error(() => `CANNOT FIND UNIQUE STATICS WITH PARAMS. key: ${file}`);
    return;
  }

  return unqie.source;
});
