"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./iccserver");
require("../imports/server/serverinstance");
Meteor.startup(function () {
    console.log('Running');
    console.log("Instance id=".concat(ICCServer.instance_id));
});
