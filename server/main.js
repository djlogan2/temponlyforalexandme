"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./iccserver");
require("../imports/server/serverinstance");
require("../imports/server/serverconnection");
Meteor.startup(function () {
    console.log('Running');
    console.log("Instance id=".concat(ICCServer.instance_id));
});
