"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./servericcserver");
require("../imports/server/serverlogger");
require("../imports/server/serverinstance");
require("../imports/server/serverconnection");
require("../imports/server/servertimestamp");
Meteor.startup(function () {
    console.log('Running');
    console.log("Instance id=".concat(ICCServer.instance_id));
});
