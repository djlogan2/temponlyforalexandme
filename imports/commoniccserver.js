"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var CommonICCServer = /** @class */ (function () {
    function CommonICCServer() {
        this.eventEmitter = new events_1.EventEmitter();
        this.collections = {};
        // this.handles = {};
    }
    Object.defineProperty(CommonICCServer.prototype, "events", {
        get: function () { return this.eventEmitter; },
        enumerable: false,
        configurable: true
    });
    return CommonICCServer;
}());
exports.default = CommonICCServer;
