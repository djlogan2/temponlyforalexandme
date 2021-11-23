"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./iccserver");
require("../imports/client/clientlogger");
require("../imports/client/clientdirectmessage");
require("../imports/client/clienttimetamp");
var react_dom_1 = require("react-dom");
var React = require("react");
var app_1 = require("../imports/ui/app");
// window.onerror = function myErrorHandler(
//     message: Event | string,
//     source: string | undefined,
//     lineno: number | undefined,
//     colno: number | undefined,
//     error: Error | undefined
// ): boolean {
//     console.log("DO ME");
//     return false;
// };
Meteor.startup(function () {
    (0, react_dom_1.render)(<app_1.default />, document.getElementById('target'));
});
