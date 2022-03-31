import fs from "fs";
import path from "path";
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

// @ts-ignore
Picker.route("/static/images/:folder/:file", function (params, req, res, next) {
  const staticResource = req.originalUrl.split("--")[0];

  const mime = {
    html: "text/html",
    txt: "text/plain",
    css: "text/css",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    svg: "image/svg+xml",
    js: "application/javascript",
  };
  const ext = staticResource.split(".")[1] as keyof typeof mime;

  fs.readFile(`${process.env.PWD}/public${staticResource}`, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end(`Error getting the file: ${err}.`);
    } else {
      res.setHeader("Content-Type", mime[ext]);
      res.end(data);
    }
  });
});
