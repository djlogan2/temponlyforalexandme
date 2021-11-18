"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var ICCEventEmitter = /** @class */ (function (_super) {
    __extends(ICCEventEmitter, _super);
    function ICCEventEmitter() {
        var _this = this;
        _this.emitter = new events_1.EventEmitter();
        return _this;
    }
    ICCEventEmitter.prototype.on = function (eventName, listener) {
        var boundlistener = Meteor.bindEnvironment(function (args) { return listener(args); });
    };
    ;
    ICCEventEmitter.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    return ICCEventEmitter;
}(events_1.EventEmitter));
exports.default = ICCEventEmitter;
